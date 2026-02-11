import { useMemo } from 'react';
import {
  getWeekDays,
  formatMonthYear,
  getPrevWeek,
  getNextWeek,
  isDateToday,
  getTodayString,
} from '../utils/dateHelpers';
import styles from './DateNavigator.module.css';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function DateNavigator({ selectedDate, onDateChange }) {
  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);
  const isSelectedToday = isDateToday(selectedDate);

  return (
    <div className={styles.navigator}>
      <div className={styles.monthRow}>
        <button
          className={styles.arrowBtn}
          onClick={() => onDateChange(getPrevWeek(selectedDate))}
          aria-label="Previous week"
        >
          &lsaquo;
        </button>
        <button
          className={styles.monthLabel}
          onClick={() => !isSelectedToday && onDateChange(getTodayString())}
          aria-label={isSelectedToday ? 'Current month' : 'Go to today'}
        >
          {formatMonthYear(selectedDate)}
        </button>
        <button
          className={styles.arrowBtn}
          onClick={() => onDateChange(getNextWeek(selectedDate))}
          aria-label="Next week"
        >
          &rsaquo;
        </button>
      </div>

      <div className={styles.weekGrid}>
        {weekDays.map((dateStr, i) => {
          const dayNum = parseInt(dateStr.split('-')[2], 10);
          const isTodayDate = isDateToday(dateStr);
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={dateStr}
              className={styles.dayCol}
              onClick={() => onDateChange(dateStr)}
              aria-label={`Select ${dateStr}`}
              aria-pressed={isSelected}
            >
              <span className={styles.dayLabel}>{DAY_LABELS[i]}</span>
              <span
                className={`${styles.dayNum} ${isTodayDate ? styles.today : ''} ${isSelected && !isTodayDate ? styles.selected : ''}`}
              >
                {dayNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DateNavigator;
