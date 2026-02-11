/**
 * Check if two time ranges overlap.
 * Times are in "HH:mm" format. Ranges are [start, end).
 * Adjacent ranges (one ends at the same time another starts) do NOT overlap.
 */
function timesOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

/**
 * Check if a proposed task would overlap with any existing task on the same date.
 *
 * @param {Array} tasks - All tasks
 * @param {string} date - The date to check ("YYYY-MM-DD")
 * @param {string} startTime - Proposed start time ("HH:mm")
 * @param {string} endTime - Proposed end time ("HH:mm")
 * @param {string|null} excludeId - Task ID to exclude (for edits)
 * @returns {boolean} True if there IS an overlap (invalid)
 */
export function hasOverlap(tasks, date, startTime, endTime, excludeId = null) {
  return tasks.some(task => {
    if (task.date !== date) return false;
    if (excludeId && task.id === excludeId) return false;
    return timesOverlap(startTime, endTime, task.startTime, task.endTime);
  });
}

/**
 * Validate a task form submission.
 * Returns an object of field -> error message. Empty object = valid.
 */
export function validateTask(title, startTime, endTime) {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = 'Title is required';
  }

  if (!startTime) {
    errors.startTime = 'Start time is required';
  }

  if (!endTime) {
    errors.endTime = 'End time is required';
  }

  if (startTime && endTime && endTime <= startTime) {
    errors.endTime = 'End time must be after start time';
  }

  return errors;
}
