# Cogni Care — Complete Backend Architecture Design

> **Purpose:** Complete backend design guide — technology stack, database schema, API endpoints, aur har module ka data flow.

---

## 📋 Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [High-Level Backend Architecture](#2-high-level-backend-architecture)
3. [Complete Database Schema](#3-complete-database-schema)
4. [Data Flow — Module by Module](#4-data-flow--module-by-module)
5. [Complete API Endpoint Reference](#5-complete-api-endpoint-reference)
6. [Folder Structure](#6-folder-structure)
7. [Security Architecture](#7-security-architecture)
8. [Deployment Architecture](#8-deployment-architecture)

---

## 1. Technology Stack

| Layer | Technology | Reason |
|---|---|---|
| **Runtime** | Node.js 20 LTS | Fast, async I/O, same language as frontend |
| **Framework** | Express.js 5 | Lightweight, flexible REST API |
| **Language** | TypeScript 5 | Type safety, matches frontend |
| **Primary DB** | PostgreSQL 16 | Relational data, complex joins for health records |
| **Cache / Session** | Redis 7 | OTP storage, JWT blacklist, rate limiting |
| **File Storage** | AWS S3 (or MinIO local) | MRI/CT scan image storage |
| **AI Integration** | Google Gemini API | AI assistant + MRI analysis |
| **Email Service** | Nodemailer + SendGrid | OTP emails, notifications |
| **Auth** | JWT (access + refresh) + bcrypt | Secure token-based auth |
| **Social Auth** | Google OAuth 2.0 (Passport.js) | Google sign-in |
| **Validation** | Zod | Schema validation for all request bodies |
| **ORM** | Prisma | Type-safe DB queries, easy migrations |
| **API Docs** | Swagger / OpenAPI 3.0 | Auto-generated API documentation |
| **Testing** | Jest + Supertest | Unit and integration testing |
| **Process Manager** | PM2 | Production process management |

---

## 2. High-Level Backend Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                           │
│                   http://localhost:3000                              │
└──────────────────────────┬──────────────────────────────────────────┘
                           │  HTTPS + Bearer JWT
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                    NGINX (Reverse Proxy)                             │
│           Rate Limiting · SSL Termination · Load Balancing          │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                 EXPRESS.JS API SERVER (Port 8000)                    │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐               │
│  │  Middleware │  │   Routers   │  │  Controllers  │               │
│  │  - CORS     │  │  /auth      │  │  authCtrl     │               │
│  │  - Helmet   │  │  /screening │  │  screenCtrl   │               │
│  │  - Morgan   │  │  /medication│  │  medCtrl      │               │
│  │  - Auth     │  │  /safety    │  │  safetyCtrl   │               │
│  │  - Zod      │  │  /doctor    │  │  doctorCtrl   │               │
│  │  - RateLimit│  │  /caregiver │  │  caregiverCtrl│               │
│  └─────────────┘  │  /mri       │  │  mriCtrl      │               │
│                   │  /ai        │  │  aiCtrl       │               │
│                   └─────────────┘  └──────────────┘               │
└──────┬───────────────────────┬──────────────────────────────────────┘
       │                       │
┌──────▼──────┐        ┌───────▼─────────────────────────────────────┐
│   REDIS 7   │        │              POSTGRESQL 16                   │
│             │        │                                             │
│ OTP Codes   │        │  users · screening_sessions · questions     │
│ JWT Tokens  │        │  medications · appointments · alerts        │
│ Rate Limit  │        │  clinical_notes · care_plans · mri_scans   │
│ Cache       │        │  linked_patients · activities · audit_logs  │
└─────────────┘        └──────────────────┬──────────────────────────┘
                                          │
                       ┌──────────────────▼──────────────────────────┐
                       │            AWS S3 / MinIO                    │
                       │   MRI Scans · CT Scans · Profile Photos     │
                       │   PDF Reports · Export Files                 │
                       └─────────────────────────────────────────────┘
                                          │
                       ┌──────────────────▼──────────────────────────┐
                       │          External Services                   │
                       │  Google OAuth · SendGrid · Gemini API       │
                       └─────────────────────────────────────────────┘
```

---

## 3. Complete Database Schema

### 3.1 ERD Overview

```
users ──────────────────┬── screening_sessions ── screening_answers
  │                     │
  ├── user_profiles      ├── medications ── medication_logs
  │                     │
  ├── refresh_tokens     ├── appointments
  │                     │
  ├── audit_logs         ├── safety_contacts
  │                     │
  ├── notifications      ├── safety_checkins
  │                     │
  ├── [as doctor]────── ├── clinical_notes
  │   doctor_patients    │
  │                      ├── mri_scans
  └── [as caregiver]─── │
      linked_patients ──►└── activities · alerts
```

---

### 3.2 Table: `users`

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   VARCHAR(255),              -- NULL if only social auth
  role            VARCHAR(20) NOT NULL        -- 'patient' | 'doctor' | 'caregiver' | 'admin'
                  CHECK (role IN ('patient','doctor','caregiver','admin')),
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  avatar_url      TEXT,
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  google_id       VARCHAR(255) UNIQUE,        -- for Google OAuth
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

---

### 3.3 Table: `user_profiles`

```sql
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth   DATE,
  gender          VARCHAR(20),
  phone           VARCHAR(20),
  address         TEXT,
  emergency_contact_name  VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  language_preference     VARCHAR(10) DEFAULT 'en',
  dark_mode       BOOLEAN DEFAULT FALSE,
  -- Privacy & Consent
  data_sharing_consent    BOOLEAN DEFAULT FALSE,
  research_consent        BOOLEAN DEFAULT FALSE,
  caregiver_access_consent BOOLEAN DEFAULT FALSE,
  consent_updated_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.4 Table: `refresh_tokens`

```sql
CREATE TABLE refresh_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  VARCHAR(255) NOT NULL,  -- hashed refresh token
  device_info TEXT,
  expires_at  TIMESTAMPTZ NOT NULL,
  revoked     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
```

---

### 3.5 Table: `screening_sessions`

```sql
CREATE TABLE screening_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id),
  protocol_name   VARCHAR(100) NOT NULL,          -- 'MoCA', 'MMSE', etc.
  protocol_version VARCHAR(10) DEFAULT 'v1',
  total_score     INTEGER NOT NULL,
  max_score       INTEGER NOT NULL,
  clinical_range  VARCHAR(50) NOT NULL,            -- 'Normal Range' | 'MCI' | 'Consult Specialist'
  reviewed_by     VARCHAR(100),                    -- doctor name or 'AI-Assisted'
  reviewed_at     TIMESTAMPTZ,
  doctor_id       UUID REFERENCES users(id),       -- if reviewed by a doctor
  recommendations TEXT[],
  date_completed  TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON screening_sessions(user_id);
CREATE INDEX idx_sessions_date ON screening_sessions(date_completed DESC);
```

---

### 3.6 Table: `screening_answers`

```sql
CREATE TABLE screening_answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL REFERENCES screening_sessions(id) ON DELETE CASCADE,
  question_id     VARCHAR(50) NOT NULL,
  category        VARCHAR(50) NOT NULL,   -- 'Memory Recall' | 'Visuospatial' | etc.
  selected_option VARCHAR(50) NOT NULL,
  is_correct      BOOLEAN NOT NULL,
  score_awarded   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.7 Table: `screening_category_scores`

```sql
CREATE TABLE screening_category_scores (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID NOT NULL REFERENCES screening_sessions(id) ON DELETE CASCADE,
  category    VARCHAR(50) NOT NULL,
  score       INTEGER NOT NULL,
  max_score   INTEGER NOT NULL,
  status      VARCHAR(20) NOT NULL   -- 'optimal' | 'good' | 'monitor'
);
```

---

### 3.8 Table: `screening_questions` (master data)

```sql
CREATE TABLE screening_questions (
  id          VARCHAR(50) PRIMARY KEY,
  protocol    VARCHAR(50) NOT NULL,   -- 'MoCA' | 'custom'
  version     VARCHAR(10) DEFAULT 'v1',
  category    VARCHAR(50) NOT NULL,
  title       TEXT NOT NULL,
  instruction TEXT NOT NULL,
  audio_prompt_url TEXT,
  display_order INTEGER NOT NULL,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE question_options (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id VARCHAR(50) REFERENCES screening_questions(id),
  option_key  VARCHAR(10) NOT NULL,   -- 'a', 'b', 'c', 'd'
  label       TEXT NOT NULL,
  is_correct  BOOLEAN NOT NULL
);
```

---

### 3.9 Table: `medications`
CREATE TABLE medications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES users(id),
  name            VARCHAR(200) NOT NULL,
  dosage          VARCHAR(100) NOT NULL,         -- '10mg'
  form            VARCHAR(50),                   -- 'Tablet', 'Capsule', 'Liquid'
  frequency       VARCHAR(50) NOT NULL,          -- 'Once daily', 'Twice daily'
  times_of_day    TEXT[],                        -- ['08:00', '20:00']
  instructions    TEXT,                          -- 'Take with food'
  prescribed_by   VARCHAR(100),
  start_date      DATE,
  end_date        DATE,
  is_active       BOOLEAN DEFAULT TRUE,
  reminder_enabled BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_medications_patient ON medications(patient_id);

### 3.10 Table: `medication_logs`

CREATE TABLE medication_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id   UUID NOT NULL REFERENCES medications(id),
  patient_id      UUID NOT NULL REFERENCES users(id),
  scheduled_time  TIMESTAMPTZ NOT NULL,
  taken_at        TIMESTAMPTZ,
  status          VARCHAR(20) NOT NULL   -- 'taken' | 'missed' | 'skipped'
                  CHECK (status IN ('taken','missed','skipped')),
  note            TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_med_logs_patient_date ON medication_logs(patient_id, scheduled_time DESC);

### 3.11 Table: `appointments`
CREATE TABLE appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES users(id),
  doctor_id       UUID NOT NULL REFERENCES users(id),
  scheduled_at    TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  type            VARCHAR(50),           -- 'In-Person' | 'Video Call' | 'Phone'
  method          VARCHAR(50),
  status          VARCHAR(30) NOT NULL   -- 'Scheduled' | 'Confirmed' | 'Cancelled' | 'Completed'
                  CHECK (status IN ('Scheduled','Confirmed','Cancelled','Completed')),
  reason          TEXT,
  notes           TEXT,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(scheduled_at);
### 3.12 Table: `linked_patients` (Caregiver ↔ Patient)

CREATE TABLE linked_patients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id    UUID NOT NULL REFERENCES users(id),
  patient_id      UUID NOT NULL REFERENCES users(id),
  relationship    VARCHAR(100),          -- 'Son', 'Daughter', 'Spouse'
  link_status     VARCHAR(20) NOT NULL   -- 'active' | 'pending' | 'revoked'
                  CHECK (link_status IN ('active','pending','revoked')),
  linked_at       TIMESTAMPTZ DEFAULT NOW(),
  revoked_at      TIMESTAMPTZ,
  UNIQUE(caregiver_id, patient_id)
);
### 3.13 Table: `doctor_patients`


CREATE TABLE doctor_patients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id   UUID NOT NULL REFERENCES users(id),
  patient_id  UUID NOT NULL REFERENCES users(id),
  status      VARCHAR(20) DEFAULT 'Active',
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(doctor_id, patient_id)
);

### 3.14 Table: `clinical_notes`
CREATE TABLE clinical_notes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id       UUID NOT NULL REFERENCES users(id),
  patient_id      UUID NOT NULL REFERENCES users(id),
  session_id      UUID REFERENCES screening_sessions(id),
  category        VARCHAR(50),    -- 'Consultation' | 'Screening Review' | 'Follow-up'
  title           VARCHAR(255) NOT NULL,
  content         TEXT NOT NULL,
  recommendations TEXT[],
  is_draft        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
### 3.15 Table: `alerts`

CREATE TABLE alerts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES users(id),
  triggered_by    UUID REFERENCES users(id),   -- system or doctor
  alert_type      VARCHAR(100) NOT NULL,
  description     TEXT,
  severity        VARCHAR(10) NOT NULL
                  CHECK (severity IN ('high','medium','low')),
  acknowledged    BOOLEAN DEFAULT FALSE,
  acknowledged_by UUID REFERENCES users(id),
  acknowledged_at TIMESTAMPTZ,
  auto_trigger    BOOLEAN DEFAULT FALSE,        -- system-generated
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_alerts_patient ON alerts(patient_id, acknowledged, created_at DESC);

### 3.16 Table: `mri_scans`
CREATE TABLE mri_scans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES users(id),
  scan_type       VARCHAR(100),   -- 'High-Resolution 3D T1 MRI'
  file_name       VARCHAR(255) NOT NULL,
  file_size_bytes BIGINT,
  s3_key          TEXT NOT NULL,
  s3_bucket       VARCHAR(100),
  status          VARCHAR(30) DEFAULT 'Processing'
                  CHECK (status IN ('Processing','Analysed','Error','Pending Review')),
  ai_analysis     JSONB,          -- AI model output
  reviewed_by     UUID REFERENCES users(id),
  reviewed_at     TIMESTAMPTZ,
  uploaded_at     TIMESTAMPTZ DEFAULT NOW()
);


### 3.17 Table: `ct_scans`

CREATE TABLE ct_scans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES users(id),
  file_name       VARCHAR(255) NOT NULL,
  file_size_bytes BIGINT,
  s3_key          TEXT NOT NULL,
  status          VARCHAR(30) DEFAULT 'Processing',
  ai_analysis     JSONB,
  uploaded_at     TIMESTAMPTZ DEFAULT NOW()
);
### 3.18 Table: `activities`
CREATE TABLE activities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id  UUID NOT NULL REFERENCES users(id),
  name        VARCHAR(200) NOT NULL,
  category    VARCHAR(50),         -- 'Cognitive' | 'Physical' | 'Wellness'
  due_time    TIMESTAMPTZ,
  completed   BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  assigned_by UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
### 3.19 Table: `safety_contacts`
CREATE TABLE safety_contacts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id),
  name            VARCHAR(100) NOT NULL,
  relationship    VARCHAR(50),
  phone           VARCHAR(20) NOT NULL,
  email           VARCHAR(255),
  is_primary      BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
### 3.20 Table: `safety_checkins`
CREATE TABLE safety_checkins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id),
  status      VARCHAR(30),         -- 'Good', 'Needs Help', 'Emergency'
  mood        VARCHAR(30),
  note        TEXT,
  location    JSONB,               -- { lat, lng } if shared
  checked_in_at TIMESTAMPTZ DEFAULT NOW()
);
### 3.21 Table: `notifications`
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id),
  type        VARCHAR(50),         -- 'medication' | 'screening' | 'alert' | 'appointment'
  title       VARCHAR(255) NOT NULL,
  body        TEXT,
  is_read     BOOLEAN DEFAULT FALSE,
  action_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notif_user_unread ON notifications(user_id, is_read, created_at DESC);
### 3.22 Table: `audit_logs`

CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,    -- 'LOGIN' | 'SCREENING_SUBMIT' | 'MRI_UPLOAD'
  entity_type VARCHAR(50),              -- 'screening_session' | 'medication'
  entity_id   UUID,
  ip_address  INET,
  user_agent  TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);
## 4. Data Flow — Module by Module

### 4.1 🔐 Authentication Flow

CLIENT                        EXPRESS SERVER                  DATABASE/REDIS
  │                                │                               │
  │──── POST /auth/register ───────►│                               │
  │     { email, password,          │                               │
  │       firstName, lastName,      │── Zod Validate ──────────────►│
  │       role }                    │                               │
  │                                 │── Hash password (bcrypt 12) ──►│
  │                                 │                               │
  │                                 │── INSERT users ───────────────►│
  │                                 │── INSERT user_profiles ────────►│
  │                                 │                               │
  │                                 │── Generate 6-digit OTP ───────►│
  │                                 │── REDIS: SET otp:{email}       │
  │                                 │          value=OTP TTL=600s ───►│
  │                                 │                               │
  │                                 │── SendGrid: Send OTP Email ────►│(Email)
  │◄── 201 { userId, message } ─────│                               │
  │                                 │                               │
  │──── POST /auth/otp/verify ──────►│                               │
  │     { email, otp }              │── REDIS: GET otp:{email} ──────►│
  │                                 │── Compare OTP ─────────────────│
  │                                 │── UPDATE users                  │
  │                                 │   is_email_verified=true ───────►│
  │◄── 200 { verified: true } ──────│                               │
  │                                 │                               │
  │──── POST /auth/login ───────────►│                               │
  │     { email, password }         │── SELECT user by email ────────►│
  │                                 │── bcrypt.compare() ─────────────│
  │                                 │                               │
  │                                 │── Generate Access JWT (15min) ──│
  │                                 │── Generate Refresh JWT (7days)──│
  │                                 │── INSERT refresh_tokens ────────►│
  │                                 │── INSERT audit_logs ────────────►│
  │◄── 200 {                        │                               │
  │      token,                     │                               │
  │      refreshToken,              │                               │
  │      user: {id,email,role,...}  │                               │
  │    }                            │                               │
  │                                 │                               │
  │  [Future requests]              │                               │
  │──── GET /any ───────────────────►│                               │
  │  Authorization: Bearer {token}  │── verifyJWT middleware ─────────│
  │                                 │── Decode: { userId, role } ─────│
  │                                 │── Attach to req.user ───────────│
  │                                 │── Route to Controller ──────────│

### 4.2 🔑 Google OAuth Flow

```
CLIENT              EXPRESS               GOOGLE               DATABASE
  │                     │                    │                     │
  │── GET /auth/google─►│                   │                     │
  │                     │── Passport.js ──────►│                     │
  │                      │   redirect to       │                      │
  │                      │   Google OAuth      │                      │
  │◄── Redirect  ────────│                   │                      │
  │                      │                    │                      │
  │   [User logs in on Google]              │                      │
  │                      │◄── Callback ────────│                     │
  │                      │   { googleId,       │                      │
  │                      │     email,          │                      │
  │                      │     name, avatar }  │                      │
  │                      │                    │                      │
  │                      │── Find or Create user ───────────────────►│
  │                       │   by google_id/email                      │
  │                    │                    │                      │
  │                    │── Generate JWT ──────────────────────────►│
  │◄── Redirect to     │                   │                      │
  │   /dashboard?token │                   │                      │
```

---

### 4.3 🧠 Cognitive Screening Flow

```
CLIENT                      SERVER                     DATABASE
  │                           │                           │
  │─ POST /screening/session/start ─►│                   │
  │  Authorization: Bearer JWT       │── Verify JWT ──────►│
  │                                  │── INSERT screening_sessions │
  │                                  │   status='in_progress' ────►│
  │◄─ 201 { sessionId } ────────────│                   │
  │                                  │                   │
  │─ GET /screening/questions ───────►│                  │
  │  ?protocol=moca&version=v1       │── SELECT questions │
  │                                  │   ORDER BY display_order ──►│
  │◄─ 200 { questions: [...] } ──────│                  │
  │                                  │                   │
  │  [User answers all questions]    │                   │
  │                                  │                   │
  │─ POST /screening/submit ─────────►│                  │
  │  { sessionId,                    │                   │
  │    answers: {                    │── Zod validate ───►│
  │     "q1": "a",                   │                   │
  │     "q2": "c", ... } }           │                   │
  │                                  │                   │
  │                            ┌─────▼─────────────────┐ │
  │                            │   SCORING ENGINE       │ │
  │                            │                       │ │
  │                            │ 1. Fetch correct       │ │
  │                            │    answers from DB     │►│
  │                            │                       │ │
  │                            │ 2. Compare answers     │ │
  │                            │    per question        │ │
  │                            │                       │ │
  │                            │ 3. Calculate category  │ │
  │                            │    scores              │ │
  │                            │   Memory: 5/5          │ │
  │                            │   Visuospatial: 3/5    │ │
  │                            │   Executive: 4/5       │ │
  │                            │   Orientation: 5/5     │ │
  │                            │   Language: 4/5        │ │
  │                            │                       │ │
  │                            │ 4. Total: 21/30        │ │
  │                            │                       │ │
  │                            │ 5. Classify:           │ │
  │                            │   ≥26 = Normal Range   │ │
  │                            │   18-25 = MCI          │ │
  │                            │   <18 = Consult Spec.  │ │
  │                            └─────┬─────────────────┘ │
  │                                  │                   │
  │                                  │── UPDATE screening_sessions │
  │                                  │   total_score, clinical_range ►│
  │                                  │── INSERT screening_answers ────►│
  │                                  │── INSERT screening_category_scores►│
  │                                  │── INSERT audit_logs ───────────►│
  │                                  │                   │
  │                                  │── Check thresholds │
  │                                  │   if score drops >5 from last:  │
  │                                  │── INSERT alerts ───────────────►│
  │                                  │── INSERT notifications ─────────►│
  │                                  │                   │
  │◄─ 200 {                          │                   │
  │    totalScore: 21,               │                   │
  │    maxScore: 30,                 │                   │
  │    clinicalRange: 'MCI',         │                   │
  │    breakdown: [...],             │                   │
  │    recommendations: [...]        │                   │
  │  }                               │                   │
```

---

### 4.4 💊 Medication Management Flow

```
CLIENT                        SERVER                      DATABASE
  │                             │                            │
  │─ GET /medication ───────────►│                           │
  │  Bearer JWT                  │── req.user.id ─────────────►│
  │                              │── SELECT medications       │
  │                              │   WHERE patient_id=userId  │
  │                              │   AND is_active=true ──────►│
  │                              │── SELECT medication_logs   │
  │                              │   WHERE date=today ────────►│
  │◄─ 200 { schedule, stats } ──│                           │
  │                              │                            │
  │─ POST /medication ───────────►│                           │
  │  { name, dosage,             │── Zod validate ────────────►│
  │    frequency,                │── INSERT medications ───────►│
  │    timesOfDay,               │── Schedule reminders ───────►│(Cron Job)
  │    reminderEnabled }         │── INSERT notifications ──────►│
  │◄─ 201 { medication } ───────│                           │
  │                              │                            │
  │─ POST /medication/:id/taken ─►│                          │
  │  { }                         │── UPDATE medication_logs   │
  │                              │   status='taken',          │
  │                              │   taken_at=NOW() ──────────►│
  │                              │── Recalculate adherence ────►│
  │◄─ 200 { success, doseId } ──│                           │
  │                              │                            │
  │  [CRON JOB — Every hour]    │                            │
  │                              │── Check upcoming doses ────►│
  │                              │── INSERT notifications      │
  │                              │   for doses due in 30min ──►│
```

---

### 4.5 🏥 MRI Upload & Analysis Flow

```
CLIENT                  SERVER              S3            AI MODEL        DATABASE
  │                       │                 │                │               │
  │─ POST /mri/upload ────►│                │                │               │
  │  multipart/form-data   │                │                │               │
  │  { file: MRI.dcm }     │                │                │               │
  │                        │── Validate     │                │               │
  │                        │  file type,    │                │               │
  │                        │  size (<100MB) │                │               │
  │                        │                │                │               │
  │                        │── Upload to S3─►│               │               │
  │                        │   key=mri/     │                │               │
  │                        │   {userId}/    │                │               │
  │                        │   {uuid}.dcm   │                │               │
  │                        │◄── S3 URL ─────│               │               │
  │                        │                │                │               │
  │                        │── INSERT mri_scans ───────────────────────────►│
  │                        │   status='Processing'                           │
  │◄─ 202 { scanId,        │                │                │               │
  │          status:        │                │                │               │
  │          'Processing' } │                │                │               │
  │                        │                │                │               │
  │   [Background Job]     │                │                │               │
  │                        │── Send to ─────────────────────►│               │
  │                        │   Gemini Vision API              │               │
  │                        │   (s3_url, analysis_type)        │               │
  │                        │◄── AI Analysis Result ──────────│               │
  │                        │   { findings, regions, risk }    │               │
  │                        │                │                │               │
  │                        │── UPDATE mri_scans ───────────────────────────►│
  │                        │   status='Analysed'              │               │
  │                        │   ai_analysis={...}              │               │
  │                        │── INSERT notifications ─────────────────────────►│
  │                        │   "Your MRI analysis is ready"                  │
  │                        │                │                │               │
  │─ GET /mri/:scanId ─────►│               │                │               │
  │◄─ 200 { scan,          │               │                │               │
  │          analysis } ───│               │                │               │
```

---

### 4.6 🤖 AI Assistant Flow

```
CLIENT                      SERVER                    GEMINI API          DATABASE
  │                           │                           │                  │
  │─ POST /ai/chat ───────────►│                          │                  │
  │  { message: "I feel        │── Verify JWT ─────────────►│                │
  │    stressed about          │                           │                  │
  │    my memory" }            │── Fetch user context ──────────────────────►│
  │                            │   recent screenings,       │                  │
  │                            │   medications              │                  │
  │                            │                           │                  │
  │                            │── Build prompt:            │                  │
  │                            │  "You are a cognitive      │                  │
  │                            │   wellness assistant.      │                  │
  │                            │   User: [name], last       │                  │
  │                            │   screening: [score].      │                  │
  │                            │   User says: [message]"    │                  │
  │                            │                           │                  │
  │                            │── POST Gemini API ────────►│                 │
  │                            │   model: gemini-pro        │                  │
  │                            │◄── AI Response ────────────│                 │
  │                            │                           │                  │
  │                            │── INSERT chat history ──────────────────────►│
  │◄─ 200 {                   │                           │                  │
  │    reply: "...",           │                           │                  │
  │    messageId,              │                           │                  │
  │    timestamp }             │                           │                  │
```

---

### 4.7 👩‍👦 Caregiver Dashboard Flow

```
CLIENT                        SERVER                      DATABASE
  │                             │                            │
  │─ GET /caregiver/dashboard ──►│                           │
  │  Bearer JWT (caregiver)      │── Verify JWT + role ───────►│
  │                              │── userId = caregiver_id    │
  │                              │                            │
  │                              │── Query 1: Linked Patients  │
  │                              │   SELECT lp.*, u.*, up.*   │
  │                              │   FROM linked_patients lp   │
  │                              │   JOIN users u ON           │
  │                              │   u.id=lp.patient_id        │
  │                              │   WHERE lp.caregiver_id=me  │
  │                              │   AND lp.link_status='active'►│
  │                              │                            │
  │                              │── Query 2: Active Alerts    │
  │                              │   SELECT * FROM alerts      │
  │                              │   WHERE patient_id IN       │
  │                              │   (my patients)             │
  │                              │   AND acknowledged=false ───►│
  │                              │                            │
  │                              │── Query 3: Summary Stats    │
  │                              │   COUNT alerts, medications,│
  │                              │   appointments, activities ─►│
  │                              │                            │
  │                              │── Query 4: Pending Activities│
  │                              │   SELECT * FROM activities  │
  │                              │   WHERE patient_id IN (...)  │
  │                              │   AND completed=false       │
  │                              │   AND due_time <= NOW()+24h ►│
  │                              │                            │
  │                              │── Query 5: Appointments     │
  │                              │   SELECT * FROM appointments│
  │                              │   WHERE patient_id IN (...)  │
  │                              │   AND scheduled_at > NOW() ─►│
  │                              │                            │
  │◄─ 200 {                      │                           │
  │    caregiver,                │                           │
  │    linkedPatients,           │                           │
  │    summaryStats,             │                           │
  │    activeAlerts,             │                           │
  │    pendingActivities,        │                           │
  │    upcomingAppointments,     │                           │
  │    recentActivity }          │                           │
  │                              │                            │
  │─ POST /caregiver/alerts/:id/ │                            │
  │        acknowledge ──────────►│                           │
  │                              │── UPDATE alerts             │
  │                              │   acknowledged=true         │
  │                              │   acknowledged_by=caregiver │
  │                              │   acknowledged_at=NOW() ───►│
  │◄─ 200 { success } ──────────│                           │
```

---

### 4.8 👨‍⚕️ Doctor Dashboard Flow

```
CLIENT                        SERVER                      DATABASE
  │                             │                            │
  │─ GET /doctor/dashboard ─────►│                           │
  │  Bearer JWT (doctor)         │── Verify role='doctor' ────►│
  │                              │                            │
  │                              │── Parallel Queries:        │
  │                              │                            │
  │                              │── Q1: Pending Assessments  │
  │                              │   SELECT ss.*, u.name      │
  │                              │   FROM screening_sessions ss│
  │                              │   JOIN doctor_patients dp   │
  │                              │   ON dp.patient_id=ss.user_id│
  │                              │   WHERE dp.doctor_id=me     │
  │                              │   AND ss.doctor_id IS NULL  │
  │                              │   ORDER BY date_completed ──►│
  │                              │                            │
  │                              │── Q2: Attention Queue      │
  │                              │   SELECT a.*, u.name       │
  │                              │   FROM alerts a            │
  │                              │   JOIN doctor_patients dp   │
  │                              │   WHERE dp.doctor_id=me     │
  │                              │   AND a.severity='high'     │
  │                              │   AND acknowledged=false ───►│
  │                              │                            │
  │                              │── Q3: Patient Stats        │
  │                              │   COUNT(dp.*) total,        │
  │                              │   COUNT active patients,    │
  │                              │   COUNT today appointments ─►│
  │                              │                            │
  │                              │── Q4: Today's Appointments  │
  │                              │   WHERE doctor_id=me        │
  │                              │   AND DATE(scheduled_at)    │
  │                              │   = TODAY ─────────────────►│
  │                              │                            │
  │◄─ 200 { complete dashboard } │                           │
  │                              │                            │
  │─ POST /doctor/assessments/   │                            │
  │        :id/review ───────────►│                           │
  │  { doctorObservation,        │── UPDATE screening_sessions│
  │    reviewerName }             │   reviewed_by,             │
  │                              │   doctor_id,               │
  │                              │   reviewed_at ─────────────►│
  │                              │── INSERT clinical_notes ────►│
  │◄─ 200 { updatedAssessment } ─│                           │
```

---

### 4.9 🚨 Safety SOS Flow

```
CLIENT              SERVER              DATABASE        SMS/EMAIL
  │                   │                   │               │
  │─ POST /safety/    │                   │               │
  │  emergency/       │                   │               │
  │  dispatch ────────►│                  │               │
  │  Bearer JWT        │                  │               │
  │                    │── SELECT safety_contacts         │
  │                    │   WHERE user_id=me ─────────────►│
  │                    │                   │               │
  │                    │── SELECT doctor_patients ─────────►│
  │                    │   to get assigned doctor           │
  │                    │                   │               │
  │                    │── INSERT alerts                   │
  │                    │   severity='high'                  │
  │                    │   alert_type='SOS' ───────────────►│
  │                    │                   │               │
  │                    │── INSERT safety_checkins          │
  │                    │   status='Emergency' ─────────────►│
  │                    │                   │               │
  │                    │── Send SMS/Email to contacts ─────────────────►│
  │                    │   "⚠️ [Patient] needs help"                     │
  │                    │── Send alert to doctor ────────────────────────►│
  │                    │── INSERT notifications ───────────►│            │
  │                    │                   │               │            │
  │◄─ 200 {            │                   │               │            │
  │    success: true,  │                   │               │            │
  │    message: "...", │                   │               │            │
  │    dispatchedAt }  │                   │               │            │
```

---

## 5. Complete API Endpoint Reference

### 5.1 Auth Routes (`/api/v1/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login with email/password |
| POST | `/auth/logout` | ✅ | Invalidate refresh token |
| POST | `/auth/token/refresh` | ❌ | Get new access token |
| POST | `/auth/otp/send` | ❌ | Send OTP to email |
| POST | `/auth/otp/verify` | ❌ | Verify OTP |
| POST | `/auth/forgot-password` | ❌ | Request password reset |
| GET | `/auth/reset-password/validate` | ❌ | Validate reset token |
| POST | `/auth/reset-password` | ❌ | Submit new password |
| GET | `/auth/google` | ❌ | Google OAuth initiate |
| GET | `/auth/google/callback` | ❌ | Google OAuth callback |
| GET | `/auth/me` | ✅ | Get current user |

---

### 5.2 Screening Routes (`/api/v1/screening`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/screening/overview` | ✅ Patient | Get screening intro data |
| GET | `/screening/questions` | ✅ Patient | Get question set |
| GET | `/screening/questions/:id` | ✅ Patient | Get single question |
| POST | `/screening/session/start` | ✅ Patient | Start new session |
| POST | `/screening/submit` | ✅ Patient | Submit answers, get results |
| GET | `/screening/history` | ✅ Patient | Get all past sessions |
| GET | `/screening/history/:id` | ✅ Patient | Get specific session |
| GET | `/screening/v2/data` | ✅ Patient | Get V2 screening data |
| POST | `/screening/v2/submit` | ✅ Patient | Submit V2 answers |

---

### 5.3 Medication Routes (`/api/v1/medication`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/medication` | ✅ Patient | Get medication schedule |
| POST | `/medication` | ✅ Patient | Add new medication |
| PUT | `/medication/:id` | ✅ Patient | Update medication |
| DELETE | `/medication/:id` | ✅ Patient | Delete medication |
| POST | `/medication/:id/taken` | ✅ Patient | Log dose as taken |
| POST | `/medication/:id/missed` | ✅ Patient | Log dose as missed |
| GET | `/medication/adherence` | ✅ Patient | Get adherence stats |

---

### 5.4 Safety Routes (`/api/v1/safety`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/safety` | ✅ Patient | Get safety page data |
| POST | `/safety/checkin` | ✅ Patient | Submit daily check-in |
| GET | `/safety/contacts` | ✅ Patient | Get trusted contacts |
| POST | `/safety/contacts` | ✅ Patient | Add trusted contact |
| DELETE | `/safety/contacts/:id` | ✅ Patient | Remove contact |
| POST | `/safety/emergency/dispatch` | ✅ Patient | Trigger SOS |

---

### 5.5 MRI / CT Routes (`/api/v1`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/mri` | ✅ Patient | Get MRI scan list |
| POST | `/mri/upload` | ✅ Patient | Upload MRI file |
| GET | `/mri/:id` | ✅ Patient | Get MRI + analysis |
| DELETE | `/mri/:id` | ✅ Patient | Delete MRI scan |
| GET | `/ct-scan` | ✅ Patient | Get CT scan list |
| POST | `/ct-scan/upload` | ✅ Patient | Upload CT file |
| GET | `/ct-scan/:id` | ✅ Patient | Get CT + analysis |

---

### 5.6 AI Assistant Routes (`/api/v1/ai`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/ai/chat` | ✅ Patient | Send message, get AI reply |
| GET | `/ai/history` | ✅ Patient | Get conversation history |
| DELETE | `/ai/history` | ✅ Patient | Clear history |

---

### 5.7 Caregiver Routes (`/api/v1/caregiver`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/caregiver/dashboard` | ✅ Caregiver | Get full dashboard data |
| GET | `/caregiver/patients` | ✅ Caregiver | Get linked patients |
| GET | `/caregiver/patients/:id` | ✅ Caregiver | Get patient details |
| POST | `/caregiver/alerts/:id/acknowledge` | ✅ Caregiver | Acknowledge alert |
| POST | `/caregiver/activities/:id/complete` | ✅ Caregiver | Mark activity done |
| GET | `/caregiver/screening` | ✅ Caregiver | View patient screenings |
| GET | `/caregiver/reports` | ✅ Caregiver | View reports |

---

### 5.8 Doctor Routes (`/api/v1/doctor`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/doctor/dashboard` | ✅ Doctor | Get full dashboard data |
| GET | `/doctor/patients` | ✅ Doctor | Get patient roster |
| POST | `/doctor/patients` | ✅ Doctor | Register new patient |
| GET | `/doctor/patients/:id` | ✅ Doctor | Get patient detail |
| GET | `/doctor/assessments` | ✅ Doctor | Get pending assessments |
| POST | `/doctor/assessments/:id/review` | ✅ Doctor | Review & sign off |
| GET | `/doctor/appointments` | ✅ Doctor | Get appointments |
| POST | `/doctor/appointments` | ✅ Doctor | Schedule appointment |
| PUT | `/doctor/appointments/:id` | ✅ Doctor | Update appointment |
| GET | `/doctor/notes` | ✅ Doctor | Get clinical notes |
| POST | `/doctor/notes` | ✅ Doctor | Create clinical note |
| GET | `/doctor/analytics` | ✅ Doctor | Get cohort analytics |
| GET | `/doctor/care-plans` | ✅ Doctor | Get care plans |
| POST | `/doctor/care-plans` | ✅ Doctor | Create care plan |

---

### 5.9 Shared Routes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/profile` | ✅ All | Get user profile |
| PUT | `/profile` | ✅ All | Update profile |
| GET | `/notifications` | ✅ All | Get notifications |
| PATCH | `/notifications/:id/read` | ✅ All | Mark as read |
| PATCH | `/notifications/read-all` | ✅ All | Mark all as read |
| GET | `/settings` | ✅ All | Get settings |
| PUT | `/settings` | ✅ All | Update settings |
| GET | `/audit-logs` | ✅ All | Get own audit logs |
| POST | `/data/export` | ✅ All | Request data export |
| DELETE | `/account` | ✅ All | Delete account |
| GET | `/dashboard` | ✅ Patient | Get patient dashboard |
| GET | `/results` | ✅ Patient | Get results history |

---

## 6. Folder Structure

```
cogni-care-backend/
│
├── src/
│   ├── app.ts                    ← Express app setup
│   ├── server.ts                 ← HTTP server entry
│   │
│   ├── config/
│   │   ├── env.ts                ← Environment variables (Zod)
│   │   ├── database.ts           ← Prisma client setup
│   │   ├── redis.ts              ← Redis connection
│   │   ├── s3.ts                 ← AWS S3 config
│   │   └── gemini.ts             ← Google Gemini API config
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts    ← JWT verify + req.user
│   │   ├── role.middleware.ts    ← RBAC role check
│   │   ├── validate.middleware.ts← Zod request validation
│   │   ├── rateLimit.middleware.ts← Rate limiting
│   │   ├── upload.middleware.ts  ← Multer file upload
│   │   ├── audit.middleware.ts   ← Auto audit logging
│   │   └── errorHandler.ts      ← Global error handler
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.router.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.schema.ts    ← Zod schemas
│   │   │   └── auth.types.ts
│   │   │
│   │   ├── screening/
│   │   │   ├── screening.router.ts
│   │   │   ├── screening.controller.ts
│   │   │   ├── screening.service.ts
│   │   │   ├── scoring.engine.ts ← Core scoring logic
│   │   │   └── screening.schema.ts
│   │   │
│   │   ├── medication/
│   │   │   ├── medication.router.ts
│   │   │   ├── medication.controller.ts
│   │   │   ├── medication.service.ts
│   │   │   └── medication.cron.ts← Reminder scheduler
│   │   │
│   │   ├── safety/
│   │   │   ├── safety.router.ts
│   │   │   ├── safety.controller.ts
│   │   │   └── safety.service.ts
│   │   │
│   │   ├── mri/
│   │   │   ├── mri.router.ts
│   │   │   ├── mri.controller.ts
│   │   │   ├── mri.service.ts
│   │   │   └── mri.analysis.ts   ← Gemini Vision integration
│   │   │
│   │   ├── ai-assistant/
│   │   │   ├── ai.router.ts
│   │   │   ├── ai.controller.ts
│   │   │   └── ai.service.ts     ← Gemini API calls
│   │   │
│   │   ├── caregiver/
│   │   │   ├── caregiver.router.ts
│   │   │   ├── caregiver.controller.ts
│   │   │   └── caregiver.service.ts
│   │   │
│   │   ├── doctor/
│   │   │   ├── doctor.router.ts
│   │   │   ├── doctor.controller.ts
│   │   │   └── doctor.service.ts
│   │   │
│   │   ├── notifications/
│   │   │   ├── notifications.router.ts
│   │   │   ├── notifications.controller.ts
│   │   │   └── notifications.service.ts
│   │   │
│   │   ├── profile/
│   │   │   ├── profile.router.ts
│   │   │   ├── profile.controller.ts
│   │   │   └── profile.service.ts
│   │   │
│   │   └── settings/
│   │       ├── settings.router.ts
│   │       └── settings.service.ts
│   │
│   ├── shared/
│   │   ├── utils/
│   │   │   ├── jwt.utils.ts      ← Sign/verify JWT
│   │   │   ├── otp.utils.ts      ← OTP generation
│   │   │   ├── hash.utils.ts     ← bcrypt helpers
│   │   │   ├── email.utils.ts    ← SendGrid/Nodemailer
│   │   │   └── response.utils.ts ← Standardized API response
│   │   │
│   │   └── types/
│   │       └── express.d.ts      ← Augment req.user type
│   │
│   └── jobs/
│       ├── medication.cron.ts    ← Daily medication reminders
│       └── alert.cron.ts         ← Threshold alert checks
│
├── prisma/
│   ├── schema.prisma             ← All table definitions
│   └── migrations/               ← DB migration files
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env                          ← Environment variables
├── .env.example
├── package.json
├── tsconfig.json
└── Dockerfile
```

---

## 7. Security Architecture

### 7.1 JWT Token Strategy

```
Access Token:
  - Payload: { userId, email, role, iat, exp }
  - Expiry: 15 minutes
  - Secret: JWT_ACCESS_SECRET (env)
  - Used: Every API request header

Refresh Token:
  - Payload: { userId, tokenFamily }
  - Expiry: 7 days
  - Secret: JWT_REFRESH_SECRET (env)
  - Stored: Hashed in refresh_tokens table
  - Used: POST /auth/token/refresh

Token Rotation:
  - On refresh: Old token invalidated, new token issued
  - Family tracking: Reuse of old refresh token = all tokens revoked (stolen token detection)
```

### 7.2 Password Security

```
Registration:
  - Min 8 chars, uppercase, lowercase, number, special char
  - Hashed with bcrypt (cost factor: 12)
  - Never stored in plaintext
  - Never returned in API responses

Reset Flow:
  - 6-digit OTP → Redis → TTL 10 minutes
  - OTP deleted after first successful use
  - Rate limit: Max 3 OTP requests per hour per email
```

### 7.3 RBAC Middleware

```typescript
// Role enforcement example
router.get('/doctor/dashboard', 
  authMiddleware,              // Verify JWT
  roleMiddleware('doctor'),    // Check role === 'doctor'
  dashboardController.get
);

// Resource ownership check
// Patients can only access their OWN data
// Caregivers can only access LINKED patients
// Doctors can only access ASSIGNED patients
```

### 7.4 Rate Limiting

```
Global: 100 requests / 15 min / IP
Auth endpoints: 5 requests / 15 min / IP
OTP send: 3 requests / 60 min / email
File upload: 10 uploads / hour / user
AI chat: 30 messages / hour / user
```

### 7.5 File Upload Security

```
Allowed types: image/jpeg, image/png, application/dicom
Max file size: 100 MB
Validation: Magic bytes check (not just extension)
Storage: S3 with private ACL (no public URLs)
Access: Pre-signed URLs with 1-hour expiry
Scan: Virus scan on upload (ClamAV)
```

---

## 8. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                               │
│                                                                 │
│  ┌────────────┐   ┌────────────────────────────────────────┐   │
│  │  Vercel    │   │          AWS / Railway                  │   │
│  │  (Frontend)│   │                                        │   │
│  │            │   │  ┌──────────┐  ┌──────────────────┐   │   │
│  │  Next.js   │   │  │  NGINX   │  │   Node.js API    │   │   │
│  │  PWA       │   │  │  Reverse │  │   (PM2 Cluster)  │   │   │
│  │            │   │  │  Proxy   ├──►  Port 8000        │   │   │
│  └─────┬──────┘   │  └──────────┘  └────────┬─────────┘   │   │
│        │          │                          │             │   │
│        │  HTTPS   │  ┌───────────┐   ┌───────▼──────────┐ │   │
│        └──────────┼──► PostgreSQL│   │     Redis        │ │   │
│                   │  │ (RDS /    │   │  (Upstash /      │ │   │
│                   │  │  Supabase)│   │   Redis Cloud)   │ │   │
│                   │  └───────────┘   └──────────────────┘ │   │
│                   │                                        │   │
│                   │  ┌────────────────────────────────┐   │   │
│                   │  │      AWS S3                     │   │   │
│                   │  │  MRI · CT · Exports · Avatars  │   │   │
│                   │  └────────────────────────────────┘   │   │
│                   └────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

Environment Variables (.env):
  DATABASE_URL=postgresql://...
  REDIS_URL=redis://...
  JWT_ACCESS_SECRET=...
  JWT_REFRESH_SECRET=...
  GOOGLE_CLIENT_ID=...
  GOOGLE_CLIENT_SECRET=...
  SENDGRID_API_KEY=...
  GEMINI_API_KEY=...
  AWS_ACCESS_KEY_ID=...
  AWS_SECRET_ACCESS_KEY=...
  AWS_S3_BUCKET=cognicare-uploads
  CORS_ORIGIN=https://cognicare.app
```

---

## 🚀 Getting Started (Backend Setup)

```bash
# 1. Clone and install
git clone ...
cd cogni-care-backend
npm install

# 2. Setup environment
cp .env.example .env
# Fill in all env variables

# 3. Setup database
npx prisma migrate dev --name init
npx prisma db seed          # Seed screening questions

# 4. Start development
npm run dev                 # ts-node-dev with hot reload

# 5. Build for production  
npm run build
npm start                   # PM2 cluster mode
```

---

> **Summary:** Backend banane ke liye start karo **Auth module** se, phir **Screening**, phir **Medication**, phir **Caregiver/Doctor** dashboards. Database schema ek baar poora create karo Prisma se, phir ek-ek module add karo.

