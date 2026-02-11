import { getTodayString } from './dateHelpers';

const STORAGE_KEY = 'daily-todo-tasks';

/**
 * Generate demo tasks for first-time users.
 */
function createDemoTasks() {
  const today = getTodayString();
  const now = new Date().toISOString();
  return [
    {
      id: crypto.randomUUID(),
      title: 'Feed the cats',
      startTime: '08:00',
      endTime: '09:00',
      notes: '',
      completed: false,
      date: today,
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: 'Water the plants',
      startTime: '10:00',
      endTime: '10:30',
      notes: '',
      completed: false,
      date: today,
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: 'Exercise',
      startTime: '12:00',
      endTime: '13:00',
      notes: '',
      completed: true,
      date: today,
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: 'Prepare Dinner',
      startTime: '18:00',
      endTime: '19:00',
      notes: '',
      completed: false,
      date: today,
      createdAt: now,
    },
  ];
}

/**
 * Read all tasks from localStorage.
 * On first visit (nothing stored), returns demo tasks.
 */
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return createDemoTasks();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Write the full tasks array to localStorage.
 * Catches quota/disabled storage errors so the app doesn't crash.
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Could not save tasks to storage:', e?.message ?? e);
  }
}
