import { getTodayString } from './dateHelpers';

/**
 * Roll over incomplete tasks from past dates to today.
 * Updates each task's date in place (same ID) — idempotent.
 *
 * @param {Array} tasks - All tasks
 * @returns {Array} Updated tasks array (new reference if changes were made)
 */
export function rolloverTasks(tasks) {
  const today = getTodayString();
  let changed = false;

  const updated = tasks.map(task => {
    if (!task.completed && task.date < today) {
      changed = true;
      return { ...task, date: today };
    }
    return task;
  });

  return changed ? updated : tasks;
}
