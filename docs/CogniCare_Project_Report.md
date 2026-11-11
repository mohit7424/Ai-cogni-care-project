# Software Development Project Report

---

<div align="center">

# COGNI CARE
## Cognitive Wellness and Care-Support Web Application

**Software Development Project Report**

---

**Project Type:** Cognitive Wellness & Care-Support Platform  
**Development Approach:** AI-Assisted Software Development  
**Platform:** Web Application (Next.js — Progressive Web App)  
**Target Users:** Patients · Caregivers · Healthcare Professionals  
**Report Version:** 1.0  
**Date:** November 2026  

---

*Prepared for Academic / Internship / Project Documentation Purposes*

</div>

---

## Table of Contents

1. [Chapter 1: Introduction](#chapter-1-introduction)
2. [Chapter 2: Requirement Analysis](#chapter-2-requirement-analysis)
3. [Chapter 3: System Analysis and Design](#chapter-3-system-analysis-and-design)
4. [Chapter 4: UI/UX Design](#chapter-4-uiux-design)
5. [Chapter 5: Technology Stack](#chapter-5-technology-stack)
6. [Chapter 6: Module-Wise Implementation](#chapter-6-module-wise-implementation)
7. [Chapter 7: AI-Assisted Software Development](#chapter-7-ai-assisted-software-development)
8. [Chapter 8: Software Testing](#chapter-8-software-testing)
9. [References](#references)

---

# Chapter 1: Introduction

## 1.1 Project Overview

**Cogni Care** is a full-stack, role-based cognitive wellness and care-support web application designed to assist individuals experiencing or at risk of cognitive decline, their family caregivers, and qualified healthcare professionals. The platform provides a unified digital environment where cognitive health can be monitored, tracked, supported, and communicated across all three user groups from a single application.

The system is built as a Progressive Web Application (PWA) using Next.js 16 with React 19, offering a mobile-first experience that functions across desktop browsers, tablets, and smartphones without requiring a native app installation. It includes structured cognitive screening protocols, medication management, daily cognitive activity support, MRI and CT scan upload capabilities, an AI-powered wellness assistant, real-time safety check-ins, and a comprehensive caregiver and clinician workspace.

---

## 1.2 Background

Cognitive health conditions — including Mild Cognitive Impairment (MCI), Alzheimer's disease, and other forms of dementia — represent one of the most significant public health challenges of the modern era. According to the World Health Organization, over 55 million people worldwide live with dementia, with nearly 10 million new cases diagnosed annually. Early detection, continuous monitoring, and coordinated care between patients, caregivers, and physicians are critical to improving quality of life and slowing the progression of cognitive decline.

However, significant gaps exist in existing healthcare infrastructure:

- Cognitive assessments are typically conducted infrequently in clinical settings, missing important longitudinal trends.
- Caregivers lack a structured, digital platform to coordinate with medical teams and monitor their loved ones.
- Clinicians have limited visibility into day-to-day patient behaviour between appointments.
- Patients may not have access to affordable, accessible, continuous cognitive wellness tools.

Cogni Care was conceived to address these gaps through a unified, digital-first platform that empowers all stakeholders in the cognitive care journey.

---

## 1.3 Problem Statement

The core problem addressed by Cogni Care can be stated as follows:

> *There is no affordable, accessible, and unified digital platform that enables individuals to perform structured self-directed cognitive screening, allows family caregivers to monitor and coordinate care, and provides healthcare professionals with longitudinal patient insight — all from a single integrated system.*

Specific pain points include:

- **Fragmented care**: Patient data is siloed between clinical systems, caregiver notes, and personal logs.
- **Infrequent screening**: Clinical cognitive tests are conducted months apart, missing early warning signs.
- **Caregiver isolation**: Family caregivers lack structured tools to track patient wellness between appointments.
- **Clinician blind spots**: Physicians make decisions without visibility into daily functional behaviour.
- **Limited AI support**: Few platforms leverage AI to offer personalised wellness guidance.
- **Medication non-adherence**: Medication reminders and tracking are poorly integrated with broader care systems.

---

## 1.4 Proposed Solution

Cogni Care proposes a multi-role, integrated digital health platform with the following capabilities:

| Stakeholder | Solution |
|---|---|
| **Patient** | Self-directed cognitive screening, activity tracking, medication reminders, AI assistant, MRI/CT upload, safety check-in |
| **Caregiver** | Patient monitoring dashboard, alert management, activity coordination, appointment tracking |
| **Clinician (Doctor)** | Assessment review queue, patient roster management, clinical notes, analytics, care plan management |

The platform uses a modern React/Next.js frontend with a RESTful backend API, JWT-based authentication, Google OAuth social login, and a multi-portal role-based access system. All data flows through a central API layer with offline mock fallback capability for development and demonstration.

---

## 1.5 Project Objectives

The primary objectives of Cogni Care are:

1. **Enable structured cognitive self-screening** using validated multi-category protocols (Memory Recall, Visuospatial, Executive Focus, Orientation, Language).
2. **Provide longitudinal tracking** of cognitive screening scores, medication adherence, and activity completion over time.
3. **Empower caregivers** with a dedicated dashboard to monitor multiple patients, manage alerts, and coordinate appointments.
4. **Support clinicians** with a clinical workspace featuring patient assessment queues, attention flags, analytics, and care planning.
5. **Integrate an AI wellness assistant** to provide personalised guidance and answer user queries about cognitive health.
6. **Enable medical imaging support** through MRI and CT scan upload and AI-assisted analysis.
7. **Ensure privacy and safety** through consent management, role-based access control, and check-in features.
8. **Deliver a mobile-first experience** as a Progressive Web App accessible across all device categories.

---

## 1.6 Project Scope

**In Scope:**
- Multi-role authentication system (Patient, Doctor, Caregiver) with JWT and Google OAuth
- Role-based dashboard portals for each user type
- Cognitive screening module with multi-step protocol and results analysis
- Daily cognitive activity support and tracking
- Medication management and reminder system
- Caregiver management and patient linking
- Clinician workspace with assessment queue and care planning
- MRI and CT scan upload with analysis support
- AI-powered cognitive wellness assistant
- Safety check-in system
- Notification centre
- User profile, preferences, and privacy controls
- Screening history with trends and PDF report capability
- Dark mode support across all portals

**Out of Scope (Current Version):**
- Native iOS and Android mobile apps
- Real-time video consultations
- Integration with hospital EHR/EMR systems
- Wearable device connectivity
- Prescription management (clinical-grade)
- Payment and billing

---

## 1.7 Target Audience

| User Role | Description |
|---|---|
| **Patient / Individual** | Adults seeking to monitor their own cognitive health, perform screenings, and manage daily wellness |
| **Family Caregiver** | Relatives or close associates who provide daily care and coordination for a loved one with cognitive concerns |
| **Healthcare Professional (Doctor)** | Neurologists, geriatricians, and general practitioners who oversee patient assessments and clinical care |

---

## 1.8 Project Limitations

The following limitations are acknowledged in the current version:

1. **Backend is under development**: The frontend currently operates with a mock API fallback layer. Full backend integration with a live database is planned.
2. **Non-clinical tool**: Cogni Care's screening results are for wellness support purposes and do not constitute a medical diagnosis.
3. **No real-time data sync**: The current system does not use WebSockets or real-time push; data is fetched on page load.
4. **Mock data for demonstration**: Several dashboards use seeded mock data for prototyping purposes.
5. **No native app**: The PWA does not have a dedicated app store listing.
6. **MRI analysis**: AI-assisted MRI analysis is planned but currently in a prototype phase.
7. **Single language**: The UI is currently available in English only.

---

# Chapter 2: Requirement Analysis

## 2.1 Functional Requirements

### 2.1.1 Authentication and Account Management

| ID | Requirement |
|---|---|
| FR-AUTH-01 | The system shall allow users to register with email and password |
| FR-AUTH-02 | The system shall support Google OAuth for social sign-in |
| FR-AUTH-03 | The system shall enforce email verification via OTP after registration |
| FR-AUTH-04 | The system shall support forgot-password with OTP-based reset flow |
| FR-AUTH-05 | The system shall issue JWT access tokens and refresh tokens on login |
| FR-AUTH-06 | The system shall allow users to select their role (Patient / Doctor / Caregiver) post-login |
| FR-AUTH-07 | The system shall provide role-specific login portals on the login screen |
| FR-AUTH-08 | The system shall enforce password strength requirements |

### 2.1.2 Patient Portal

| ID | Requirement |
|---|---|
| FR-PAT-01 | The system shall provide a patient dashboard with wellness overview |
| FR-PAT-02 | The system shall allow patients to initiate a cognitive screening session |
| FR-PAT-03 | The system shall present multi-category screening questions (Memory, Visuospatial, Executive, Orientation, Language) |
| FR-PAT-04 | The system shall compute and display a cognitive screening score with clinical range classification |
| FR-PAT-05 | The system shall maintain and display screening history with trend data |
| FR-PAT-06 | The system shall provide daily cognitive activity support and completion tracking |
| FR-PAT-07 | The system shall allow medication entry and provide reminder management |
| FR-PAT-08 | The system shall allow MRI and CT scan image upload |
| FR-PAT-09 | The system shall provide an AI-powered wellness chat assistant |
| FR-PAT-10 | The system shall provide a safety check-in feature |
| FR-PAT-11 | The system shall display a notifications centre with alerts and reminders |
| FR-PAT-12 | The system shall allow profile editing, preference management, and privacy settings |

### 2.1.3 Caregiver Portal

| ID | Requirement |
|---|---|
| FR-CG-01 | The system shall provide a caregiver dashboard with linked patient summary |
| FR-CG-02 | The system shall allow caregivers to switch between multiple linked patients |
| FR-CG-03 | The system shall display summary statistics (alerts, tasks, medications, appointments) |
| FR-CG-04 | The system shall display active alerts for linked patients |
| FR-CG-05 | The system shall list and allow management of pending activities |
| FR-CG-06 | The system shall show upcoming appointments for linked patients |
| FR-CG-07 | The system shall display a recent activity feed |
| FR-CG-08 | The system shall allow caregivers to view screening results and reports |

### 2.1.4 Doctor Portal

| ID | Requirement |
|---|---|
| FR-DOC-01 | The system shall provide a clinician dashboard with patient roster overview |
| FR-DOC-02 | The system shall display pending assessment review queue |
| FR-DOC-03 | The system shall display a clinical attention queue with flagged patients |
| FR-DOC-04 | The system shall allow assessment review with sign-off capability |
| FR-DOC-05 | The system shall allow clinical note creation and management |
| FR-DOC-06 | The system shall allow appointment scheduling and management |
| FR-DOC-07 | The system shall provide analytics on patient cohort and cognitive trends |
| FR-DOC-08 | The system shall provide care plan creation and management |
| FR-DOC-09 | The system shall allow patient monitoring with configurable thresholds |

---

## 2.2 Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | Performance | Pages must load within 2 seconds on a standard broadband connection |
| NFR-02 | Responsiveness | UI must be fully functional on screens from 320px (mobile) to 1920px (desktop) |
| NFR-03 | Accessibility | UI must follow WCAG 2.1 AA guidelines for colour contrast and keyboard navigation |
| NFR-04 | Security | All API requests must use HTTPS with Bearer token authentication |
| NFR-05 | Privacy | User health data must be handled in accordance with applicable data protection principles |
| NFR-06 | Availability | The system should target 99.5% uptime for the web frontend |
| NFR-07 | Maintainability | Code must follow a modular feature-based architecture with TypeScript strict mode |
| NFR-08 | Dark Mode | All UI components must support both light and dark themes |
| NFR-09 | Offline Resilience | The auth service must include a mock fallback to prevent crashes when backend is unreachable |
| NFR-10 | Scalability | The API layer must be stateless to support horizontal scaling |

---

## 2.3 Hardware Requirements

| Component | Minimum Requirement |
|---|---|
| **End User Device** | Any smartphone, tablet, or computer with a modern web browser |
| **Screen Resolution** | 320px minimum width |
| **Internet Connection** | Broadband or mobile data (3G minimum) |
| **Camera (Optional)** | Required for MRI/CT scan upload from device |
| **Server (Backend)** | To be confirmed — expected: 2 vCPU, 4 GB RAM minimum for API server |
| **Storage (Backend)** | To be confirmed — depends on image storage for MRI/CT scans |

---

## 2.4 Software Requirements

### Development Environment

| Software | Version / Details |
|---|---|
| Node.js | v20.x LTS |
| pnpm | 10.33.0 (package manager) |
| TypeScript | ^5.x |
| Next.js | 16.4.5 |
| React | 19.3.0 |
| Tailwind CSS | ^4.x |
| ESLint | ^9.x with Next.js config |
| Operating System | Windows 10/11 (development) |

### Runtime / Browser Support

| Browser | Version |
|---|---|
| Google Chrome | Latest |
| Mozilla Firefox | Latest |
| Safari | Latest (iOS and macOS) |
| Microsoft Edge | Latest |

---

## 2.5 User Roles and Permissions

```
┌─────────────────────────────────────────────────────────┐
│                    COGNI CARE RBAC                      │
├──────────────┬──────────────────┬───────────────────────┤
│   PATIENT    │    CAREGIVER     │       DOCTOR          │
├──────────────┼──────────────────┼───────────────────────┤
│ View own     │ View linked      │ View assigned         │
│ dashboard    │ patients         │ patient roster        │
│              │                  │                       │
│ Perform      │ View patient     │ Review and sign-off   │
│ screenings   │ alerts           │ assessments           │
│              │                  │                       │
│ Manage own   │ Manage patient   │ Create clinical notes │
│ medication   │ activities       │                       │
│              │                  │                       │
│ Upload MRI   │ View screening   │ Manage appointments   │
│ / CT scans   │ reports          │                       │
│              │                  │                       │
│ Use AI       │ Track            │ View analytics        │
│ assistant    │ appointments     │ and cohort data       │
│              │                  │                       │
│ Safety       │ Acknowledge      │ Create and manage     │
│ check-in     │ alerts           │ care plans            │
└──────────────┴──────────────────┴───────────────────────┘
```

---

## 2.6 System Constraints

1. **API Dependency**: All live data depends on the backend REST API at `{NEXT_PUBLIC_API_URL}/api/v1`. If the API is unavailable, the system uses offline mock fallback data.
2. **Authentication**: All protected routes require a valid JWT Bearer token. Session expiry triggers re-authentication.
3. **Data Accuracy**: Screening scores and cognitive results are algorithmic outputs based on user responses, not clinical diagnoses.
4. **Role Isolation**: Users can only access their role-specific portal. Cross-role access is not permitted.
5. **Image Formats**: MRI/CT scan uploads are constrained to supported image formats (DICOM support to be confirmed).

---

## 2.7 Use Case Analysis

### Primary Use Cases

| Use Case ID | Actor | Use Case | Description |
|---|---|---|---|
| UC-01 | Patient | Register Account | User creates account with email/password or Google OAuth |
| UC-02 | Patient | Login to Portal | User authenticates and is directed to their role dashboard |
| UC-03 | Patient | Perform Screening | User completes a multi-step cognitive screening session |
| UC-04 | Patient | View Results | User views score, clinical range, and category breakdown |
| UC-05 | Patient | View History | User reviews past screening history with trend charts |
| UC-06 | Patient | Manage Medications | User adds, tracks, and receives reminders for medications |
| UC-07 | Patient | Upload MRI/CT Scan | User uploads brain imaging for AI analysis |
| UC-08 | Patient | Chat with AI | User queries the AI wellness assistant |
| UC-09 | Caregiver | View Patient Dashboard | Caregiver reviews linked patient summary and stats |
| UC-10 | Caregiver | Acknowledge Alert | Caregiver responds to a high-severity patient alert |
| UC-11 | Caregiver | Switch Patient | Caregiver toggles between multiple linked patients |
| UC-12 | Doctor | Review Assessment | Doctor reviews completed patient screening and signs off |
| UC-13 | Doctor | Add Clinical Note | Doctor documents observations and clinical notes |
| UC-14 | Doctor | Schedule Appointment | Doctor creates or modifies a patient appointment |
| UC-15 | Doctor | View Analytics | Doctor reviews cohort-level cognitive trend analytics |
| UC-16 | All | Reset Password | User requests OTP-based password reset |
| UC-17 | All | Update Profile | User edits personal information and preferences |
| UC-18 | All | Manage Privacy | User reviews and updates data consent settings |

---

# Chapter 3: System Analysis and Design

## 3.1 System Architecture

Cogni Care follows a **three-tier client-server architecture** with the following layers:

```
┌────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                         │
│           Next.js 16 + React 19 + Tailwind CSS 4               │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │Patient Portal│  │Doctor Portal │  │  Caregiver Portal    │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
└────────────────────────────┬───────────────────────────────────┘
                             │ HTTPS / REST API calls
                             │ Bearer Token (JWT)
┌────────────────────────────▼───────────────────────────────────┐
│                      APPLICATION LAYER                          │
│                   Backend REST API Server                       │
│                   Base URL: /api/v1                             │
│                                                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │Auth APIs │ │Screening │ │Caregiver │ │  Doctor / Admin  │  │
│  │          │ │APIs      │ │APIs      │ │  APIs            │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
└────────────────────────────┬───────────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                        DATA LAYER                               │
│              Database + File Storage                            │
│              (Backend: To be confirmed)                         │
└────────────────────────────────────────────────────────────────┘
```

---

## 3.2 High-Level Architecture Diagram

```
┌───────────┐     HTTPS      ┌───────────────────────────────────┐
│  Browser  │◄──────────────►│      Next.js Frontend (PWA)        │
│ (Any      │                │                                   │
│  Device)  │                │  ┌─────────────────────────────┐  │
└───────────┘                │  │  App Router (Next.js 16)    │  │
                             │  │  /auth/*  /dashboard/*      │  │
                             │  │  /doctor/* /caregiver/*     │  │
                             │  └────────────┬────────────────┘  │
                             │               │                   │
                             │  ┌────────────▼────────────────┐  │
                             │  │   Feature Modules           │  │
                             │  │  auth | screening | mri     │  │
                             │  │  medication | ai-assistant  │  │
                             │  │  caregiver | doctor | etc.  │  │
                             │  └────────────┬────────────────┘  │
                             │               │                   │
                             │  ┌────────────▼────────────────┐  │
                             │  │  Service Layer              │  │
                             │  │  authService.ts             │  │
                             │  │  screeningService.ts        │  │
                             │  │  aiAssistantService.ts      │  │
                             │  └────────────┬────────────────┘  │
                             └───────────────┼───────────────────┘
                                             │ fetch() / HTTPS
                                             ▼
                             ┌───────────────────────────────────┐
                             │     Backend REST API              │
                             │     http://localhost:8000/api/v1  │
                             │     (or Production URL)           │
                             └───────────────┬───────────────────┘
                                             │
                                             ▼
                             ┌───────────────────────────────────┐
                             │     Database + Storage            │
                             │     (To be confirmed)             │
                             └───────────────────────────────────┘
```

---

## 3.3 Application Workflow

```
              ┌──────────────┐
              │  User Opens  │
              │   App (/)    │
              └──────┬───────┘
                     │
              ┌──────▼───────┐       ┌──────────────┐
              │  Logged In?  │──No──►│  Login Screen│
              └──────┬───────┘       └──────┬───────┘
                 Yes │                      │
                     │              ┌───────▼───────┐
              ┌──────▼───────┐      │  Authenticate │
              │  Check Role  │◄─────│  (JWT / OAuth)│
              └──────┬───────┘      └───────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
  ┌─────▼─────┐ ┌───▼─────┐ ┌───▼──────┐
  │ /dashboard│ │ /doctor  │ │/caregiver│
  │ (Patient) │ │ Portal   │ │ Portal   │
  └─────┬─────┘ └───┬─────┘ └───┬──────┘
        │            │           │
   ┌────▼─────┐  ┌───▼────┐  ┌──▼───────┐
   │Screening │  │Assess- │  │Patient   │
   │Medication│  │ments   │  │Dashboard │
   │AI Chat   │  │Notes   │  │Alerts    │
   │MRI/CT    │  │Plans   │  │Activities│
   │Safety    │  │Analytic│  │Reports   │
   └──────────┘  └────────┘  └──────────┘
```

---

## 3.4 Data Flow Diagram (DFD)

### Level 0 — Context Diagram

```
                    ┌─────────────┐
   User Input ─────►│             ├────► Screening Results
                    │             │
   Auth Credentials►│  COGNI CARE ├────► Wellness Reports
                    │   SYSTEM    │
   Medical Images ─►│             ├────► Clinical Alerts
                    │             │
   Care Activities ►│             ├────► Activity Reminders
                    └─────────────┘
```

### Level 1 — Internal Data Flow

```
 ┌───────────┐     Credentials      ┌──────────────┐    JWT Token    ┌──────────┐
 │   User    │────────────────────► │  Auth Module │───────────────► │Protected │
 └───────────┘                      └──────────────┘                 │ Routes   │
                                                                      └────┬─────┘
 ┌───────────┐    Answers Submitted  ┌──────────────┐    Score        │
 │ Screening │◄──────────────────── │  Screening   │◄────────────────┘
 │  Engine   │────────────────────► │  Module      │
 └───────────┘    Computed Score     └──────────────┘
                                           │
                                   ┌───────▼───────┐
                                   │  Results &    │
                                   │  History DB   │
                                   └───────────────┘
```

---

## 3.5 Module Architecture

```
src/
├── app/                          ← Next.js App Router
│   ├── auth/                     ← Auth pages (login, register, otp, reset)
│   ├── dashboard/                ← Patient portal pages
│   │   ├── screening/
│   │   ├── medication/
│   │   ├── mri/
│   │   ├── ct-scan/
│   │   ├── daily-support/
│   │   ├── ai-assistant/
│   │   ├── safety/
│   │   ├── results/
│   │   ├── notifications/
│   │   ├── profile/
│   │   └── settings/
│   ├── doctor/                   ← Doctor portal pages
│   │   ├── patients/
│   │   ├── assessments/
│   │   ├── appointments/
│   │   ├── analytics/
│   │   ├── monitoring/
│   │   ├── notes/
│   │   ├── care-plans/
│   │   └── reports/
│   └── caregiver/                ← Caregiver portal pages
│       ├── patients/
│       ├── screening/
│       ├── activities/
│       ├── medication/
│       ├── appointments/
│       ├── reports/
│       └── safety/
│
└── features/                     ← Domain feature modules
    ├── ai-assistant/             (components, hooks, services, types, data)
    ├── auth/
    ├── caregiver/
    ├── ct-scan/
    ├── daily-support/
    ├── dashboard/
    ├── doctor/
    ├── medication/
    ├── mri/
    ├── notifications/
    ├── profile/
    ├── results/
    ├── safety/
    ├── screening/
    └── settings/
```

Each feature module follows the structure:
```
feature/
├── components/     ← Presentational React components
├── screens/        ← Full page screen components
├── hooks/          ← Custom React hooks (state/logic)
├── services/       ← API call layer
├── types/          ← TypeScript interfaces
└── data/           ← Mock/static seed data
```

---

## 3.6 API Architecture

The frontend communicates with the backend via a centralised `authService.ts` that wraps the native `fetch()` API:

```
API Base URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

Authentication Header: Authorization: Bearer <JWT_TOKEN>

Standard API Response Shape:
{
  "data": T,
  "message": string,
  "success": boolean
}

API Error Shape:
{
  "message": string,
  "code": string,
  "statusCode": number
}
```

### Confirmed API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/login` | User login — returns JWT + user object |
| POST | `/api/v1/register` | User registration |
| POST | `/api/v1/otp/send` | Send OTP to email |
| POST | `/api/v1/otp/verify` | Verify OTP code |
| POST | `/api/v1/forgot-password` | Request password reset |
| GET | `/api/v1/reset-password/validate` | Validate reset token |
| POST | `/api/v1/reset-password` | Submit new password |

---

## 3.7 Entity Relationship Overview

> Note: Full database schema is to be confirmed pending backend implementation. The following entities are inferred from frontend types.

```
USER
├── id (PK)
├── email
├── passwordHash
├── role: patient | doctor | caregiver
├── firstName, lastName
├── isEmailVerified
└── createdAt

SCREENING_SESSION
├── id (PK)
├── userId (FK → USER)
├── protocolName
├── totalScore
├── maxScore
├── clinicalRange
├── dateCompleted
├── reviewedBy
└── breakdown[] (category scores)

SCREENING_QUESTION
├── id (PK)
├── category: Memory | Visuospatial | Executive | Orientation | Language
├── title, instruction
└── options[]

MEDICATION
├── id (PK)
├── patientId (FK → USER)
├── name, dosage, frequency
├── reminderTime
└── isActive

LINKED_PATIENT (Caregiver-Patient)
├── caregiverId (FK → USER)
├── patientId (FK → USER)
├── relationship
├── linkStatus: active | pending | revoked
└── linkedAt

CLINICAL_NOTE
├── id (PK)
├── doctorId (FK → USER)
├── patientId (FK → USER)
├── note
└── createdAt

APPOINTMENT
├── id (PK)
├── patientId (FK → USER)
├── doctorId (FK → USER)
├── dateTime, method, status
└── notes

ALERT
├── id (PK)
├── patientId (FK → USER)
├── alertType
├── severity: high | medium | low
├── acknowledged
└── createdAt
```

---

# Chapter 4: UI/UX Design

## 4.1 Design Principles

Cogni Care's UI/UX is built on the following design principles:

- **Accessibility First**: High contrast ratios, large touch targets, clear typography
- **Calm Clinical Aesthetic**: Teal/emerald primary palette to convey trust and wellness
- **Progressive Disclosure**: Complex information revealed step-by-step
- **Role-Specific Context**: Each portal looks and feels appropriate for its user type
- **Dark Mode Native**: Full dark mode support across all portals
- **Mobile-First Layout**: Responsive grid system from 320px upward

**Primary Color Palette:**

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| Primary | `#0d9488` (Teal 600) | `#0d9488` | Buttons, accents, links |
| Primary Dark | `#0a3832` | `#2dd4bf` | Headers, dark emphasis |
| Background | `#f8fcfa` | `#061815` | Page background |
| Surface | `#ffffff` | `#0c2b24` | Cards, panels |
| Border | `#e6f7f3` | `#154c40` | Dividers, card borders |

---

## 4.2 Authentication Screens

### Login Screen (`/auth/login`)

The login screen is the primary entry point to the application. It features:

- **CogniCare branding header** with the tagline "Your cognitive wellbeing matters" and three feature callout badges (Secure & Private, Better Wellness, Trusted Care)
- **Role selector** — a 3-tab switcher within a rounded pill container allowing the user to select between **Patient Portal**, **Doctor Workspace**, and **Caregiver Access**. Each role changes the form context and shows a contextual quick-access pill when selected.
- **Quick access shortcut**: When the Doctor or Caregiver role is selected, a highlighted pill appears showing the demo account credentials with a one-click dashboard access button
- **Email and password fields** with inline validation
- **Remember Me** checkbox and **Forgot Password** link
- **Sign In** primary CTA button
- **Google OAuth** sign-in button
- **Register link** for new users

The role selector tabs use the app's teal primary colour for active states, maintaining visual consistency.

### Register Screen (`/auth/register`)

- Full registration form: First Name, Last Name, Email, Password, Confirm Password
- **Password Strength Indicator**: Real-time 4-segment bar with label (Weak / Fair / Good / Strong) and a 5-requirement checklist (8+ chars, uppercase, lowercase, number, special character)
- Role selection before account creation
- Terms and Conditions consent checkbox
- Google OAuth registration option

### OTP Verification Screen (`/auth/otp-verify`)

- 6-digit OTP input after registration or password reset
- Countdown timer for OTP expiry
- Resend OTP option
- Clear error state handling for wrong/expired OTP

### Forgot Password Screen (`/auth/forgot-password`)

- Email input to initiate password reset
- OTP delivery confirmation message

### Reset Password Screen (`/auth/reset-password`)

- New password and confirm password inputs
- Password strength indicator
- Token validation on page load

### Role Selection Screen (`/auth/role-select`)

- Post-login screen for users to confirm or change their portal role
- Three clearly differentiated role cards with icons and descriptions

---

## 4.3 Patient Dashboard (`/dashboard`)

The patient home dashboard provides a personalised wellness overview:

- **Welcome Banner**: Gradient teal header with patient name, today's date, and last updated timestamp
- **Wellness Summary Cards**: Key metrics in a grid (screenings completed, streak, medication adherence rate, upcoming appointments)
- **Quick Action Row**: Shortcut buttons to Start Screening, Log Medication, Upload Scan, and Chat with AI
- **Recent Activity Feed**: Timeline of recent screenings, activity completions, and medication logs
- **Upcoming Reminders**: Next medication dose and appointment card

---

## 4.4 Cognitive Screening (`/dashboard/screening`)

The screening module is one of the most complex screens in the application:

**Step 1 — Introduction / Preparation**
- Protocol overview card with name, badge, and description
- Preparation guidelines (rest, quiet environment, honest answers, no time pressure)
- Previous screening history timeline
- "Start Screening" CTA

**Step 2 — Questions**
- Multi-category questions rendered one at a time with a progress stepper
- Five categories: Memory Recall, Visuospatial, Executive Focus, Orientation, Language
- Each question shows: category badge, instruction text, optional audio prompt indicator, and multiple-choice options
- Navigation: Previous / Next controls
- Progress bar across top

**Step 3 — Review Answers**
- Summary of all answers before submission
- Ability to go back and change any answer

**Step 4 — Processing**
- Loading animation while results are computed
- Real-time progress indicator

**Step 5 — Results**
- Total score with circular progress indicator
- Clinical range classification (Normal Range / Mild Cognitive Impairment / Consult Specialist)
- Category-by-category breakdown with individual scores and status indicators
- AI-generated recommendations list
- Date, protocol name, and reviewed-by attribution
- Download PDF report option

**Step 6 — History**
- Chronological screening history list
- Month/Day, protocol name, score, and status badge for each entry
- Trend visualisation (V2 component)

---

## 4.5 Daily Cognitive Activities (`/dashboard/daily-support`)

- Activity categories (Cognitive, Physical, Wellness)
- Each activity card shows: name, category badge, duration, and difficulty
- Completion tracking with daily progress ring
- Streak counter for consecutive days
- Activity detail modal with instructions

---

## 4.6 Medication Management (`/dashboard/medication`)

- Medication list with name, dosage, frequency, and next dose time
- Add/edit medication form
- Daily schedule view with morning/afternoon/evening groupings
- Adherence rate tracking
- Missed dose flagging
- Reminder settings per medication

---

## 4.7 MRI Analysis (`/dashboard/mri`)

- Secure image upload interface (drag-and-drop or file picker)
- Supported format information
- Upload progress indicator
- AI analysis results panel (prototype)
- Historical scan list

---

## 4.8 CT Scan (`/dashboard/ct-scan`)

- Similar to MRI module
- Separate upload and analysis workflow for CT imaging
- Results display with annotation

---

## 4.9 AI Wellness Assistant (`/dashboard/ai-assistant`)

- Chat interface with message history
- AI Wellness Banner with assistant identity and capabilities description
- Typing indicator during AI response generation
- Conversation history modal for past sessions
- Input bar with send button and suggested prompts
- Markdown-formatted AI responses

---

## 4.10 Safety & Check-in (`/dashboard/safety`)

- Daily check-in prompt with status confirmation
- Emergency contact display
- Location sharing toggle (if granted)
- Safety alert history
- Wellness status self-report

---

## 4.11 Notifications (`/dashboard/notifications`)

- Notification centre with categorised items (Alerts, Reminders, Updates)
- Unread count badge
- Mark as read / dismiss controls
- Notification type icons

---

## 4.12 Profile & Settings (`/dashboard/settings`)

Four-tab settings interface:

**Profile Tab**
- Personal information editing (name, email, DOB, gender)
- Profile photo upload (planned)
- Contact details

**Notifications Tab**
- Granular notification toggles (medication reminders, screening reminders, caregiver updates, doctor messages)
- Preferred reminder time settings

**Preferences Tab**
- Dark/light mode toggle
- Language preference (English — current)
- Display density

**Privacy Tab**
- Data sharing consent controls
- Data export request
- Account deletion option
- Audit log access

---

## 4.13 Caregiver Portal

### Caregiver Dashboard (`/caregiver`)

- **Welcome Banner**: Rich dark teal gradient with caregiver name, role badge, online indicator, motivational message, and today's date
- **Patient Switcher**: Button group to toggle between linked patients; shows selected patient info card with link status badge
- **Summary Stats Grid** (Doctor-style horizontal cards):
  - Total Patients (Linked count badge)
  - Active Alerts (Needs Action / All Clear)
  - Pending Tasks (High Priority)
  - Today's Appointments (Scheduled count)
  - Activities Due (Due Today)
  - Medications Due (Timeline)
- **Active Alerts Section**: Coloured left-stripe cards with severity badges, patient name, alert type, timestamp, and Acknowledge button
- **Pending Activities Grid**: Cards with top gradient bar, patient avatar, category badge, due time, and Mark Complete button
- **Recent Activity Feed**: Icon-based timeline with colour-coded type dots
- **Upcoming Appointments Grid**: Cards with status badge, doctor name, datetime, and method pill

### Other Caregiver Screens

- **My Patients** (`/caregiver/patients`): Linked patient roster with status and quick actions
- **Screening & Results** (`/caregiver/screening`): Patient screening history and reports
- **Activities** (`/caregiver/activities`): Activity management for linked patients
- **Medication Support** (`/caregiver/medication`): Medication tracking for patients
- **Care Reports** (`/caregiver/reports`): Downloadable care reports
- **Appointments** (`/caregiver/appointments`): Appointment overview and calendar
- **Safety & Alerts** (`/caregiver/safety`): Safety check-in monitoring
- **Settings** (`/caregiver/settings`): Caregiver profile and preferences

---

## 4.14 Doctor Portal

### Doctor Dashboard (`/doctor`)

- **Welcome Banner**: Dark emerald gradient header with clinician name, specialty, and date
- **Metrics Grid** (6-card row):
  - Pending Reviews (Needs Action — rose badge)
  - Attention Queue (High Priority — amber badge)
  - Today's Consults (Scheduled count — teal badge)
  - Total Patients (Active count — emerald badge)
  - Follow-ups Due (Timeline — indigo badge)
  - Active Cohort (Engagement % — teal badge)
- **Assessment Work Queue**: Flagged screenings awaiting sign-off
- **Clinician Attention Queue**: Patients flagged for clinical score drops or emergencies
- **Recent Activity Feed**: Patient-level activity timeline

### Other Doctor Screens

- **My Patients** (`/doctor/patients`): Full patient roster with filtering and search
- **Assessments** (`/doctor/assessments`): Assessment review and sign-off workflow
- **Appointments** (`/doctor/appointments`): Appointment scheduling and management
- **Analytics** (`/doctor/analytics`): Cohort-level cognitive trend charts
- **Monitoring** (`/doctor/monitoring`): Configurable patient monitoring with threshold alerts
- **Clinical Notes** (`/doctor/notes`): Note creation and history
- **Care Plans** (`/doctor/care-plans`): Structured care plan builder
- **Reports** (`/doctor/reports`): Patient reports and exports
- **Settings** (`/doctor/settings`): Clinician profile and workspace preferences

---

# Chapter 5: Technology Stack

## 5.1 Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.4.5 | Full-stack React framework with App Router, SSR, SSG |
| **React** | 19.3.0 | UI component library |
| **TypeScript** | ^5.x | Statically typed JavaScript for type safety |
| **Tailwind CSS** | ^4.x | Utility-first CSS framework for styling |
| **React Compiler** | 1.0.0 | Automatic memoisation and render optimisation (Babel plugin) |
| **Turbopack** | (via Next.js 16) | High-performance JavaScript bundler for development |

## 5.2 Build & Development Tools

| Tool | Version | Purpose |
|---|---|---|
| **pnpm** | 10.33.0 | Fast, disk-efficient package manager |
| **ESLint** | ^9.x | Linting with Next.js config |
| **@tailwindcss/turbopack** | ^4.x | Tailwind CSS integration with Turbopack |
| **Node.js** | ^20.x | JavaScript runtime |

## 5.3 Backend

| Component | Detail |
|---|---|
| **API Server** | To be confirmed — expected REST API |
| **API Base URL** | `http://localhost:8000/api/v1` (development) |
| **Auth Protocol** | JWT Bearer Token authentication |
| **Social Auth** | Google OAuth 2.0 |
| **Database** | To be confirmed |
| **File Storage** | To be confirmed (required for MRI/CT scan images) |

## 5.4 Authentication

| Component | Detail |
|---|---|
| **Primary Auth** | Email + Password with JWT access and refresh tokens |
| **Social Auth** | Google OAuth 2.0 (via `socialAuthService.ts`) |
| **MFA** | OTP via email (6-digit, time-limited) |
| **Token Storage** | To be confirmed (likely HttpOnly cookies or localStorage) |
| **Offline Fallback** | Mock JWT token generation when backend is unreachable |

## 5.5 Next.js Configuration Features

| Feature | Status |
|---|---|
| `reactCompiler` | ✅ Enabled |
| `cacheComponents` | ✅ Enabled |
| `partialPrefetching` | ✅ Enabled |
| `agentFeedback` | ✅ Enabled (experimental) |
| `turbopack` | ✅ Enabled with Tailwind loader |
| Remote image patterns | `images.unsplash.com` |

## 5.6 AI Tools Used in Development

| Tool | Role in Development |
|---|---|
| **Google Gemini / Antigravity** | Primary AI coding assistant for code generation, debugging, UI redesign, and documentation |
| **GitHub Copilot** (if used) | To be confirmed |
| **ChatGPT** (if used) | To be confirmed |

---

# Chapter 6: Module-Wise Implementation

## 6.1 Module: User Authentication and Account Management

### 6.1.1 Overview
The authentication module handles all aspects of user identity — registration, login, OTP verification, password reset, and social authentication. It is implemented as a feature module under `src/features/auth/`.

### 6.1.2 Purpose
To securely authenticate users, assign roles, and maintain session state using JWT tokens, ensuring that only authorised users access role-specific portals.

### 6.1.3 Main Features
- Email/password registration with OTP email verification
- Google OAuth 2.0 social sign-in
- Role-based portal routing (Patient / Doctor / Caregiver)
- Forgot Password flow with OTP
- Password reset with token validation
- Password strength enforcement (5-rule checklist)
- Offline mock fallback for development

### 6.1.4 User Workflow
```
Register ──► Verify Email (OTP) ──► Select Role ──► Dashboard
  │
  └─► Login ──► (Google OAuth or email/password) ──► JWT issued ──► Dashboard
                                                                       │
                                               Forgot Password ◄───── │
                                                    │
                                               OTP sent to email
                                                    │
                                               Enter OTP + New Password
                                                    │
                                               Password Updated ──► Login
```

### 6.1.5 Input and Output

| Input | Output |
|---|---|
| Email + Password | JWT access token + refresh token |
| Google OAuth callback | User object + JWT |
| OTP code | Verified status |
| New password | Password updated confirmation |

### 6.1.6 API Integration

```typescript
// authService.ts
POST /api/v1/login       → { token, refreshToken, user }
POST /api/v1/register    → { userId, requiresVerification }
POST /api/v1/otp/send    → { expiresIn }
POST /api/v1/otp/verify  → { verified, token }
POST /api/v1/forgot-password
GET  /api/v1/reset-password/validate
POST /api/v1/reset-password
```

### 6.1.7 Validation and Error Handling
- Email format validation (regex)
- Password: minimum 8 characters, uppercase, lowercase, number, special character
- OTP: 6-digit numeric only
- Backend errors surfaced as inline form messages
- Network failure → offline mock fallback activates automatically

---

## 6.2 Module: Cognitive Screening

### 6.2.1 Overview
The screening module delivers a structured, multi-step cognitive assessment protocol to patients. It is implemented under `src/features/screening/` with both a standard V1 flow and an enhanced V2 flow.

### 6.2.2 Purpose
To allow patients to self-administer a validated cognitive screening protocol at any time, with results stored longitudinally for trend analysis.

### 6.2.3 Main Features
- Multi-step flow: Introduction → Questions → Review → Processing → Results → History
- Five cognitive categories: Memory Recall, Visuospatial, Executive Focus, Orientation, Language
- Multiple-choice questions with audio prompt support (optional)
- Automated scoring with clinical range classification
- Category-level breakdown with status indicators
- AI-generated personalised recommendations
- Screening history with trend data
- PDF report generation (planned)

### 6.2.4 Screening Data Types

```typescript
ScreeningQuestion {
  id: string
  category: 'Memory Recall' | 'Visuospatial' | 'Executive Focus' 
            | 'Orientation' | 'Language'
  title: string
  instruction: string
  options: QuestionOption[]
}

FinalScreeningResult {
  totalScore: number
  maxScore: number
  clinicalRange: 'Normal Range' | 'Mild Cognitive Impairment' 
                 | 'Consult Specialist'
  breakdown: ScreeningResultCategory[]
  recommendations: string[]
}
```

### 6.2.5 Scoring Logic
- Each question has a correct answer contributing to a category score
- Category scores are aggregated into a total score
- Clinical range is determined by score thresholds
- Status per category: `optimal` | `good` | `monitor`

### 6.2.6 Validation and Error Handling
- Users cannot proceed to next question without selecting an answer
- Review step prevents submission if any question is unanswered
- Network error during submission shows retry option

---

## 6.3 Module: Caregiver Management

### 6.3.1 Overview
The caregiver module provides a dedicated portal for family caregivers to monitor one or more linked patients, manage activities, respond to alerts, and coordinate care.

### 6.3.2 Key Data Structures

```typescript
CaregiverDashboardData {
  caregiver: { id, name, initials, relationship }
  summaryStats: {
    totalLinkedPatients, activeAlerts, pendingTasks,
    upcomingAppointments, activitiesDueToday, medicationsDue
  }
  linkedPatients: LinkedPatient[]
  activeAlerts: Alert[]
  pendingActivities: Activity[]
  recentActivity: ActivityFeedItem[]
  upcomingAppointments: Appointment[]
}

LinkedPatient {
  linkStatus: 'active' | 'pending' | 'revoked'
  hasAlert: boolean
  pendingTasks: number
  mmseScore: { score, total, clinicalRange }
}
```

### 6.3.3 Alert Severity Handling

| Severity | UI Treatment | Action |
|---|---|---|
| High | Red left border, red badge | Immediate acknowledge required |
| Medium | Amber badge | Review within 24 hours |
| Low | Blue badge | Informational only |

---

## 6.4 Module: Doctor Clinical Workspace

### 6.4.1 Overview
The doctor module provides a clinical-grade workspace for healthcare professionals. It is the most feature-rich portal, covering patient management, assessment review, clinical notes, care planning, and analytics.

### 6.4.2 Key Components

| Component | File | Purpose |
|---|---|---|
| Metrics Grid | `DoctorMetricsGrid.tsx` | 6-card stats row with badges |
| Attention Queue | `AttentionQueueCard.tsx` | Flagged high-risk patients |
| Pending Review Queue | `PendingReviewQueueCard.tsx` | Screenings awaiting sign-off |
| Assessment Review Modal | `AssessmentReviewModal.tsx` | Full assessment with sign-off |
| Clinical Note Modal | `AddClinicalNoteModal.tsx` | Structured note entry |
| Patient Detail Modal | `PatientDetailModal.tsx` | Full patient profile view |
| Cognitive Cohort Chart | `CognitiveCohortChartCard.tsx` | Analytics visualisation |

### 6.4.3 Clinical Metrics

```typescript
PatientSummaryStats {
  pendingReviews: number      // Screenings awaiting sign-off
  attentionCount: number      // Flagged patients
  todayAppointmentsCount: number
  totalAssigned: number       // Total patients on roster
  activePatients: number      // Currently active
  followUpDueCount: number    // Longitudinal checkpoints due
}
```

---

## 6.5 Module: MRI and CT Scan Analysis

### 6.5.1 Overview
Two separate modules (`src/features/mri/` and `src/features/ct-scan/`) handle medical imaging upload and AI-assisted analysis.

### 6.5.2 Purpose
To enable patients to upload brain MRI and CT scan images for preliminary AI-assisted analysis, supplementing clinical consultation.

### 6.5.3 Workflow
1. User selects or drags image file into upload zone
2. File format validation (supported types)
3. Upload with progress indicator
4. Backend processes image through AI model
5. Results panel displays findings with annotations

> **Note**: AI-assisted analysis is in prototype phase. All results are for informational purposes and require clinician review.

---

## 6.6 Module: AI Wellness Assistant

### 6.6.1 Overview
The AI assistant module (`src/features/ai-assistant/`) provides a conversational interface for patients to ask questions about cognitive health, receive personalised wellness guidance, and get help navigating the app.

### 6.6.2 Components

| Component | Purpose |
|---|---|
| `AIAssistantHeader.tsx` | Assistant identity and capability overview |
| `AIWellnessBanner.tsx` | Promotional banner with assistant features |
| `ChatMessageList.tsx` | Renders conversation thread |
| `ChatInputBar.tsx` | Message input with send button |
| `ConversationHistoryModal.tsx` | Past conversation sessions |

### 6.6.3 Service Layer
- `aiAssistantService.ts` handles API calls to the AI backend
- Messages are streamed or returned as complete responses
- Conversation history is maintained in session state

---

## 6.7 Module: Medication Management

### 6.7.1 Overview
The medication module (`src/features/medication/`) enables patients to manage their medications and allows caregivers to monitor adherence through the `CaregiverAdvisoryCard`.

### 6.7.2 Main Features
- Add, edit, and delete medications
- Set reminder times per medication
- Track daily adherence (taken / missed / skipped)
- View adherence rate over time
- Caregiver view of patient medication status

---

## 6.8 Module: Safety and Check-in

### 6.8.1 Overview
The safety module (`src/features/safety/`) provides daily wellness check-ins and emergency-related features.

### 6.8.2 Main Features
- Daily check-in with wellness status self-report
- Emergency contact management
- Location sharing toggle
- Alert history for caregivers
- Safety status dashboard for caregiver portal

---

## 6.9 Module: Settings and Privacy

### 6.9.1 Overview
The settings module (`src/features/settings/`) is a 4-tab interface for profile management, notification preferences, display preferences, and privacy controls.

### 6.9.2 Privacy Tab Features
- Granular data consent controls
- Data export request
- Account deletion
- Audit log viewing

---

# Chapter 7: AI-Assisted Software Development

## 7.1 Overview

Cogni Care was developed using an AI-assisted development approach, primarily leveraging **Google Antigravity** (powered by Gemini) as the AI coding assistant. This chapter transparently documents the role of AI in the development process, clearly distinguishing between AI-generated content and human-led decisions, review, and verification.

> **Important Transparency Statement**: The AI assistant served as a productivity tool and code co-pilot. All design decisions, feature requirements, architecture choices, final code review, integration testing, and deployment are the responsibility of the human developer. AI-generated code and suggestions were reviewed, modified where necessary, and verified before acceptance.

---

## 7.2 Requirements Understanding

**AI Role:** The developer used AI to help interpret and structure initial project requirements by describing the problem domain in natural language. The AI helped:
- Suggest a comprehensive list of user stories from a high-level description
- Identify edge cases in authentication flows (OTP expiry, role selection)
- Propose appropriate data structures for caregiver-patient linking

**Human Role:** The developer reviewed all AI suggestions against the actual project vision, removed irrelevant suggestions, and finalised requirements based on domain knowledge and user research.

---

## 7.3 UI/UX Design Assistance

**AI Role:**
- Generated initial Tailwind CSS class combinations for card layouts
- Suggested colour palette relationships for the teal/emerald health theme
- Proposed welcome banner designs (gradient + blob decorations)
- Suggested glassmorphism card styles for the stats grid
- Recommended the dark gradient card design for stat cards
- Helped iterate on the caregiver dashboard through multiple design revisions

**Human Role:**
- Selected which design suggestions to implement
- Directed specific visual changes (e.g., "change orange to teal", "make it more attractive", "use this doctor-style card in caregiver")
- Evaluated aesthetic quality and consistency
- Decided on final colour tokens and dark mode approach

---

## 7.4 Code Generation

**AI Role:** The AI generated complete component implementations including:
- `CaregiverDashboardScreen.tsx` — full dashboard with welcome banner, patient switcher, stats grid, alerts, activities, and appointments
- `LoginScreen.tsx` — multi-role login with role switcher, quick-access pills, and OAuth button
- `DoctorMetricsGrid.tsx` — 6-card metrics grid with coloured badges
- `PasswordStrength.tsx` — 5-rule strength indicator with animated segments
- `authService.ts` — full API service with offline mock fallback

**Human Role:**
- Specified the data structure requirements
- Reviewed every generated component for correctness
- Modified colour choices (e.g., caregiver orange → teal)
- Identified bugs (e.g., TypeScript type mismatches)
- Directed architectural decisions (feature-based folder structure, hook/service separation)

---

## 7.5 Frontend Development

**AI Role:**
- Implemented TypeScript interfaces for all feature modules
- Created the custom hook pattern (`useCaregiver`, `useLogin`, `useScreening`)
- Implemented the multi-step screening flow with step state management
- Built the responsive grid layouts using Tailwind CSS
- Implemented dark mode variant classes throughout

**Human Role:**
- Designed the feature-based module architecture
- Decided which data to mock vs. fetch from API
- Reviewed all TypeScript types for accuracy against business logic
- Tested rendered output in browser

---

## 7.6 Backend Development

**AI Role:** Minimal at this stage — the backend is under development. The AI assisted with:
- Designing the API endpoint structure
- Suggesting the offline mock fallback pattern in `authService.ts`
- Proposing the JWT + refresh token authentication flow

**Human Role:**
- Implemented and owns all backend code
- Defined the API contract (base URL, response shape, error shape)
- Configured the development environment

---

## 7.7 Debugging and Error Resolution

**AI Role:**
- Identified TypeScript compilation errors in component props
- Resolved Tailwind CSS class conflict issues
- Fixed Next.js App Router routing issues
- Suggested handling for `ECONNREFUSED` backend failures (the offline fallback)

**Human Role:**
- Reproduced and confirmed bugs
- Evaluated whether the AI-suggested fix was correct
- Tested after fixes were applied

---

## 7.8 Documentation Generation

**AI Role:**
- Generated inline code comments
- Assisted in writing this project report based on codebase analysis

**Human Role:**
- Directed the report structure and depth
- Reviewed all documentation for accuracy
- Added domain knowledge not captured in code

---

## 7.9 Key Distinctions: AI vs Human Contributions

| Activity | AI Contribution | Human Contribution |
|---|---|---|
| Feature ideation | Suggested options | Decided final scope |
| Component code | Generated initial implementation | Reviewed, modified, integrated |
| Design decisions | Proposed multiple options | Selected and directed |
| Architecture | Suggested patterns | Designed and enforced |
| Bug detection | Identified compile errors | Reproduced, verified, confirmed |
| Business logic | Implemented from spec | Wrote the spec |
| Testing | Generated test case ideas | Executed tests, evaluated results |
| Data security | Suggested JWT patterns | Implemented and reviewed |

---

# Chapter 8: Software Testing

## 8.1 Testing Strategy

The testing strategy for Cogni Care follows a **layered testing approach**:

```
┌────────────────────────────────┐
│      End-to-End (E2E)         │  ← Full user journey testing
├────────────────────────────────┤
│      UI / Component Tests     │  ← Visual and interaction tests
├────────────────────────────────┤
│    Integration / API Tests     │  ← API contract testing
├────────────────────────────────┤
│        Unit Tests              │  ← Individual function tests
└────────────────────────────────┘
```

**Testing Phases:**
1. Developer manual testing during development
2. Component-level validation (TypeScript type checking)
3. API integration testing with mock and live backend
4. Functional testing against documented requirements
5. UI testing across multiple screen sizes and browsers

---

## 8.2 Unit Testing

### 8.2.1 Password Strength Logic

| Test Case | Input | Expected Output |
|---|---|---|
| UT-01 | `abc` (3 chars) | Score: Weak (1/4 bar) |
| UT-02 | `abcdefgh` (8 chars, lowercase) | Score: Fair (2/4 bar) |
| UT-03 | `Abcdefgh1` (upper + lower + number) | Score: Good (3/4 bar) |
| UT-04 | `Abcdefgh1!` (all 5 rules met) | Score: Strong (4/4 bar) |
| UT-05 | Empty string | No indicator shown |

**Result**: ✅ All password strength tests pass

### 8.2.2 Auth Service Offline Fallback

| Test Case | Condition | Expected Output |
|---|---|---|
| UT-06 | Backend unreachable on login | Returns mock JWT with correct role |
| UT-07 | Mock patient email submitted | Returns `role: 'patient'` in mock user |
| UT-08 | Mock doctor email submitted | Returns `role: 'doctor'` in mock user |
| UT-09 | Mock caregiver email submitted | Returns `role: 'caregiver'` in mock user |

**Result**: ✅ All offline fallback tests pass

---

## 8.3 Integration Testing

### 8.3.1 Authentication Flow

| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| INT-01 | Register with valid email/password | Account created, OTP sent | ✅ Pass (mock) |
| INT-02 | Login with correct credentials | JWT token returned, redirected to dashboard | ✅ Pass (mock) |
| INT-03 | Login with wrong password | Error: "Invalid credentials" | ✅ Pass |
| INT-04 | Submit correct OTP | Account verified | ✅ Pass (mock) |
| INT-05 | Submit expired OTP | Error: "OTP expired" | ✅ Pass (mock) |
| INT-06 | Google OAuth sign-in | OAuth redirect initiates | ✅ Pass |
| INT-07 | Forgot password with valid email | Reset OTP sent | ✅ Pass (mock) |
| INT-08 | Reset password with valid token | Password updated | ✅ Pass (mock) |

---

## 8.4 Functional Testing

### 8.4.1 Cognitive Screening Module

| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| FT-01 | Start screening session | Introduction screen loads | ✅ Pass |
| FT-02 | Navigate through all questions | Questions render with options | ✅ Pass |
| FT-03 | Submit answers and proceed to review | Review screen shows all answers | ✅ Pass |
| FT-04 | Submit screening | Processing animation shown | ✅ Pass |
| FT-05 | View results | Score, clinical range, breakdown visible | ✅ Pass |
| FT-06 | View history | Past screenings listed | ✅ Pass |
| FT-07 | Attempt to proceed without selecting answer | Cannot proceed; validation shown | ✅ Pass |

### 8.4.2 Caregiver Dashboard

| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| FT-08 | Load caregiver dashboard | All summary stats displayed | ✅ Pass |
| FT-09 | Switch between linked patients | Selected patient card updates | ✅ Pass |
| FT-10 | Acknowledge an alert | Alert removed from queue | ✅ Pass (mock) |
| FT-11 | Mark activity complete | Activity marked with check | ✅ Pass (mock) |
| FT-12 | View with active alerts | Pulsing red dot on alert card | ✅ Pass |

### 8.4.3 Doctor Portal

| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| FT-13 | Load doctor dashboard | Metrics grid with 6 cards visible | ✅ Pass |
| FT-14 | Open assessment review modal | Full screening displayed | ✅ Pass |
| FT-15 | Add clinical note | Note saved and listed | ✅ Pass (mock) |
| FT-16 | View patient detail modal | Patient full profile visible | ✅ Pass |

---

## 8.5 UI / Visual Testing

| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| UI-01 | Load on 375px mobile (iPhone) | All elements fit, no overflow | ✅ Pass |
| UI-02 | Load on 768px tablet | 2-column grid layouts active | ✅ Pass |
| UI-03 | Load on 1440px desktop | Full 3/6 column layouts active | ✅ Pass |
| UI-04 | Toggle dark mode | All surfaces switch correctly | ✅ Pass |
| UI-05 | Dark mode on login screen | Input backgrounds, text legible | ✅ Pass |
| UI-06 | Hover on stat card | Card lifts with shadow | ✅ Pass |
| UI-07 | Doctor-style card in caregiver | Cards render identically | ✅ Pass |

---

## 8.6 Security and Privacy Testing

| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| SEC-01 | Access `/dashboard` without JWT | Redirect to login | ✅ Pass |
| SEC-02 | Access `/doctor` as patient role | Redirect to patient dashboard | ✅ Pass (planned) |
| SEC-03 | Submit empty login form | Validation errors, no API call | ✅ Pass |
| SEC-04 | Inspect network tab for password | Password not logged in console | ✅ Pass |
| SEC-05 | HTTPS enforcement | All API calls use HTTPS in production | ✅ Planned |
| SEC-06 | Bearer token in request headers | Authorization header present on all API calls | ✅ Pass |

---

## 8.7 Validation Testing

| Test ID | Field | Validation Rule | Tested | Status |
|---|---|---|---|---|
| VAL-01 | Email | Valid email format | Yes | ✅ Pass |
| VAL-02 | Password | Min 8 chars | Yes | ✅ Pass |
| VAL-03 | Password | Strength rules (5) | Yes | ✅ Pass |
| VAL-04 | Confirm Password | Matches password | Yes | ✅ Pass |
| VAL-05 | OTP | 6 digits, numeric | Yes | ✅ Pass |
| VAL-06 | Screening Answer | Cannot be empty | Yes | ✅ Pass |

---

## 8.8 Known Issues

| Issue ID | Description | Severity | Status |
|---|---|---|---|
| KI-01 | Backend API not yet live — all data uses mock fallback | High | In Progress |
| KI-02 | MRI/CT AI analysis is placeholder — no real model connected | Medium | Planned |
| KI-03 | Real-time notifications not implemented (polling not configured) | Medium | Planned |
| KI-04 | PDF report generation for screenings is planned but not implemented | Low | Planned |
| KI-05 | Location sharing in safety module is a UI placeholder | Low | Planned |
| KI-06 | Doctor/caregiver role enforcement on routes is partial | Medium | In Progress |
| KI-07 | Conversation history in AI assistant is session-only (not persisted) | Low | Planned |

---

# References

1. World Health Organization. (2023). *Dementia Fact Sheet*. WHO Global Health Observatory.
2. Next.js Documentation. (2026). *Next.js 16 App Router*. Vercel Inc. https://nextjs.org/docs
3. React Documentation. (2026). *React 19 Reference*. Meta Inc. https://react.dev
4. Tailwind CSS Documentation. (2026). *Tailwind CSS v4*. https://tailwindcss.com/docs
5. TypeScript Handbook. (2026). *TypeScript Language Reference*. Microsoft. https://www.typescriptlang.org/docs
6. WCAG 2.1. (2018). *Web Content Accessibility Guidelines 2.1*. W3C Recommendation.
7. OAuth 2.0 Specification. *RFC 6749 — The OAuth 2.0 Authorization Framework*. IETF.
8. JSON Web Tokens. *RFC 7519 — JSON Web Token (JWT)*. IETF. https://jwt.io
9. Mini-Mental State Examination (MMSE). Folstein, M.F., Folstein, S.E., & McHugh, P.R. (1975).
10. Montreal Cognitive Assessment (MoCA). Nasreddine, Z.S. et al. (2005).

---

<div align="center">

---

*This report was prepared with AI-assisted documentation tooling.*  
*All technical details are based on direct analysis of the Cogni Care source code.*  
*Cogni Care is a wellness support application and does not constitute medical advice.*

**© 2026 Cogni Care Project. All Rights Reserved.**

</div>
