import { formatDisplayDate, getNextDay, getPrevDay, isDateToday, getTodayString } from '../utils/dateHelpers';
import styles from './DateNavigator.module.css';

function DateNavigator({ selectedDate, onDateChange }) {
  return (
    <div className={styles.navigator}>
      <button
        className={styles.arrowBtn}
        onClick={() => onDateChange(getPrevDay(selectedDate))}
        aria-label="Previous day"
      >
        &larr;
      </button>

      <div className={styles.dateDisplay}>
        <span className={styles.dateText}>
          {formatDisplayDate(selectedDate)}
        </span>
        {!isDateToday(selectedDate) && (
          <button
            className={styles.todayBtn}
            onClick={() => onDateChange(getTodayString())}
          >
            Today
          </button>
        )}
      </div>

      <button
        className={styles.arrowBtn}
        onClick={() => onDateChange(getNextDay(selectedDate))}
        aria-label="Next day"
      >
        &rarr;
      </button>
    </div>
  );
}

export default DateNavigator;
