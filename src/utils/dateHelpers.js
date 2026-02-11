import { format, addDays, subDays, isToday, isBefore, startOfDay, startOfWeek } from 'date-fns';

/**
 * Format a Date object to "YYYY-MM-DD" string for storage.
 */
export function toDateString(date) {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Get today's date as "YYYY-MM-DD".
 */
export function getTodayString() {
  return toDateString(new Date());
}

/**
 * Format a date string for the navigator — e.g., "February 10, 2026"
 */
export function formatDisplayDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return format(date, 'MMMM d, yyyy');
}

/**
 * Get the day of the week name — e.g., "Wednesday"
 */
export function getDayName(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return format(date, 'EEEE');
}

/**
 * Get the next day's date string.
 */
export function getNextDay(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return toDateString(addDays(date, 1));
}

/**
 * Get the previous day's date string.
 */
export function getPrevDay(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return toDateString(subDays(date, 1));
}

/**
 * Check if a date string is today.
 */
export function isDateToday(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return isToday(date);
}

/**
 * Check if a date string is in the past (before today).
 */
export function isDatePast(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return isBefore(startOfDay(date), startOfDay(new Date()));
}

/**
 * Format "HH:mm" to "h:mm AM/PM" for display.
 * Returns a safe fallback for malformed input.
 */
export function formatTime(timeString) {
  if (!timeString || typeof timeString !== 'string') return '--:-- --';
  const parts = timeString.trim().split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1] != null ? parseInt(parts[1], 10) : NaN;
  if (Number.isNaN(hours) || Number.isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return '--:-- --';
  }
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Get default start and end times for a new task.
 * Start = next full hour from now (capped at 23:00).
 * End = start + 1 hour (capped at 23:30 if start is 23:00).
 * Returns { startTime: "HH:mm", endTime: "HH:mm" }
 */
export function getDefaultTimes() {
  const now = new Date();
  let startHour = now.getHours() + 1;

  // Cap at 23:00
  if (startHour >= 23) {
    return { startTime: '23:00', endTime: '23:30' };
  }

  const startTime = `${startHour.toString().padStart(2, '0')}:00`;
  const endHour = startHour + 1;
  const endTime = `${endHour.toString().padStart(2, '0')}:00`;

  return { startTime, endTime };
}

/**
 * Parse "HH:mm" to { hour, minute, period } for the TimePicker.
 * Returns empty fields for invalid or missing input.
 */
export function parseTimeTo12h(timeString) {
  if (!timeString || typeof timeString !== 'string') return { hour: '', minute: '', period: 'AM' };
  const parts = timeString.trim().split(':');
  const h = parseInt(parts[0], 10);
  const m = parts[1] != null ? parseInt(parts[1], 10) : NaN;
  if (Number.isNaN(h) || Number.isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
    return { hour: '', minute: '', period: 'AM' };
  }
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = (h % 12 || 12).toString();
  const minute = m.toString().padStart(2, '0');
  return { hour, minute, period };
}

/**
 * Convert { hour, minute, period } from TimePicker back to "HH:mm".
 * Returns '' if hour or minute is missing/invalid.
 */
export function to24hTime(hour, minute, period) {
  if (!hour || minute === '' || minute == null || (period !== 'AM' && period !== 'PM')) return '';
  const m = String(minute).padStart(2, '0');
  let h = parseInt(hour, 10);
  if (Number.isNaN(h) || h < 1 || h > 12) return '';
  if (period === 'AM' && h === 12) h = 0;
  if (period === 'PM' && h !== 12) h += 12;
  return `${h.toString().padStart(2, '0')}:${m}`;
}

/**
 * Add 30 minutes to a "HH:mm" time string.
 * Caps at "23:30" — won't roll past midnight.
 * Returns "00:30" for invalid input as a safe fallback.
 */
export function addThirtyMinutes(timeString) {
  if (!timeString || typeof timeString !== 'string') return '00:30';
  const parts = timeString.trim().split(':');
  const h = parseInt(parts[0], 10);
  const m = parts[1] != null ? parseInt(parts[1], 10) : 0;
  if (Number.isNaN(h) || Number.isNaN(m)) return '00:30';
  let newM = m + 30;
  let newH = h;
  if (newM >= 60) {
    newM -= 60;
    newH += 1;
  }
  if (newH > 23) return '23:30';
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}

/**
 * Get the 7 days (Sun–Sat) of the week containing the given date string.
 * Returns an array of "YYYY-MM-DD" strings.
 */
export function getWeekDays(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
  return Array.from({ length: 7 }, (_, i) => toDateString(addDays(weekStart, i)));
}

/**
 * Format a date string to "MMM yyyy" — e.g., "Feb 2026"
 */
export function formatMonthYear(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return format(date, 'MMM yyyy');
}

/**
 * Get the date string for the same weekday in the previous week.
 */
export function getPrevWeek(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return toDateString(subDays(date, 7));
}

/**
 * Get the date string for the same weekday in the next week.
 */
export function getNextWeek(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return toDateString(addDays(date, 7));
}
