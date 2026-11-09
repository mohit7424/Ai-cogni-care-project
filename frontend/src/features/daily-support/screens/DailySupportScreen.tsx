'use client';

import React from 'react';
import { useDailySupport } from '../hooks/useDailySupport';
import {
  SupportOverviewView,
  ActivityLibraryView,
  MemoryMatchingGameView,
  LogicPuzzleGameView,
  WordRecallGameView,
  PatternRecognitionGameView,
  NumberSeriesGameView,
  FocusExerciseGameView,
  ActivityCompletedView,
} from '../components/views';

export default function DailySupportScreen() {
  const {
    overviewData,
    completedResult,
    currentView,
    setCurrentView,
    activeActivityId,
    setActiveActivityId,
    selectedCategory,
    setSelectedCategory,
    filteredActivities,
    handleLaunchActivity,
    handleFinishExercise,
  } = useDailySupport();

  const activityTabs = [
    { id: 'act-1', label: '1. Memory Match', icon: '🍎' },
    { id: 'act-2', label: '2. Logic Puzzle', icon: '🧩' },
    { id: 'act-3', label: '3. Word Recall', icon: '🔤' },
    { id: 'act-4', label: '4. Pattern Recog', icon: '🔷' },
    { id: 'act-5', label: '5. Number Series', icon: '🔢' },
    { id: 'act-6', label: '6. Focus Exercise', icon: '🧠' },
  ];

  if (!overviewData) return null;

  return (
    <div className="space-y-6">
      {/* Top Interactive Mode & Activity Switcher Strip */}
      <div className="bg-white rounded-2xl border border-teal-100/90 p-2.5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Main Navigation Views */}
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              type="button"
              onClick={() => setCurrentView('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                currentView === 'overview'
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Overview & Goals
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('library')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                currentView === 'library'
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Activity Library (6 Activities)
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                currentView === 'completed'
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Summary Results
            </button>
          </div>

          <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
            Active: <strong className="text-teal-800">dailySupport.data.ts</strong>
          </span>
        </div>

        {/* 6 Sub-Activities Switcher Row */}
        <div className="overflow-x-auto pt-1.5 border-t border-gray-100 flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 shrink-0">
            Play Activity:
          </span>
          {activityTabs.map(tab => {
            const isPlayingThis =
              currentView === 'game-exercise' && activeActivityId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveActivityId(tab.id);
                  setCurrentView('game-exercise');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  isPlayingThis
                    ? 'bg-[#0d9488] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-teal-50 hover:text-teal-900 border border-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: Daily Support Overview & Goals */}
      {currentView === 'overview' && (
        <SupportOverviewView
          data={overviewData}
          onStartActivity={() => {
            setActiveActivityId('act-1');
            setCurrentView('game-exercise');
          }}
          onViewLibrary={() => setCurrentView('library')}
        />
      )}

      {/* VIEW 2: Cognitive Activity Library */}
      {currentView === 'library' && (
        <ActivityLibraryView
          activities={filteredActivities}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onLaunchActivity={handleLaunchActivity}
          onBackToOverview={() => setCurrentView('overview')}
        />
      )}

      {/* VIEW 3: Active Interactive Activity / Game Page */}
      {currentView === 'game-exercise' && (
        <div>
          {/* Sub-Activity 1: Memory Matching */}
          {activeActivityId === 'act-1' && (
            <MemoryMatchingGameView
              onBackToActivities={() => setCurrentView('library')}
              onFinishExercise={() => handleFinishExercise('act-1')}
            />
          )}

          {/* Sub-Activity 2: Logic Puzzle */}
          {activeActivityId === 'act-2' && (
            <LogicPuzzleGameView
              onBackToActivities={() => setCurrentView('library')}
              onFinishExercise={() => handleFinishExercise('act-2')}
            />
          )}

          {/* Sub-Activity 3: Word Recall */}
          {activeActivityId === 'act-3' && (
            <WordRecallGameView
              onBackToActivities={() => setCurrentView('library')}
              onFinishExercise={() => handleFinishExercise('act-3')}
            />
          )}

          {/* Sub-Activity 4: Pattern Recognition */}
          {activeActivityId === 'act-4' && (
            <PatternRecognitionGameView
              onBackToActivities={() => setCurrentView('library')}
              onFinishExercise={() => handleFinishExercise('act-4')}
            />
          )}

          {/* Sub-Activity 5: Number Series */}
          {activeActivityId === 'act-5' && (
            <NumberSeriesGameView
              onBackToActivities={() => setCurrentView('library')}
              onFinishExercise={() => handleFinishExercise('act-5')}
            />
          )}

          {/* Sub-Activity 6: Focus Exercise */}
          {activeActivityId === 'act-6' && (
            <FocusExerciseGameView
              onBackToActivities={() => setCurrentView('library')}
              onFinishExercise={() => handleFinishExercise('act-6')}
            />
          )}
        </div>
      )}

      {/* VIEW 4: Activity Completed Summary & Next Recommendation */}
      {currentView === 'completed' && completedResult && (
        <ActivityCompletedView
          result={completedResult}
          onContinue={() => setCurrentView('library')}
        />
      )}
    </div>
  );
}
