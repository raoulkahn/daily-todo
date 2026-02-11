import { useState, useEffect } from 'react';
import { parseTimeTo12h, to24hTime } from '../utils/dateHelpers';
import styles from './TimePicker.module.css';

const HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const MINUTES = ['00', '30'];
const PERIODS = ['AM', 'PM'];

function TimePicker({ value, onChange, hasError, id }) {
  // Local state so partial selection (e.g. hour only) is visible until we have a full time
  const [partial, setPartial] = useState(() => parseTimeTo12h(value));

  useEffect(() => {
    setPartial(parseTimeTo12h(value));
  }, [value]);

  const handleChange = (field, newValue) => {
    const updated = { ...partial, [field]: newValue };
    setPartial(updated);
    // Only emit when all fields are set
    if (updated.hour && updated.minute !== '' && updated.period) {
      onChange(to24hTime(updated.hour, updated.minute, updated.period));
    }
  };

  const errorClass = hasError ? styles.selectError : '';

  return (
    <div className={styles.picker} id={id}>
      <select
        className={`${styles.select} ${styles.hourSelect} ${errorClass}`}
        value={partial.hour}
        onChange={(e) => handleChange('hour', e.target.value)}
        aria-label="Hour"
      >
        <option value="" disabled>Hr</option>
        {HOURS.map(h => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>

      <span className={styles.colon}>:</span>

      <select
        className={`${styles.select} ${styles.minuteSelect} ${errorClass}`}
        value={partial.minute}
        onChange={(e) => handleChange('minute', e.target.value)}
        aria-label="Minute"
      >
        <option value="" disabled>Min</option>
        {MINUTES.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        className={`${styles.select} ${styles.periodSelect} ${errorClass}`}
        value={partial.period}
        onChange={(e) => handleChange('period', e.target.value)}
        aria-label="AM or PM"
      >
        {PERIODS.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  );
}

export default TimePicker;
