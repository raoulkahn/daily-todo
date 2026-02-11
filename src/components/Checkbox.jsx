import styles from './Checkbox.module.css';

function Checkbox({ checked, onChange, ariaLabel }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
      onClick={onChange}
      type="button"
    >
      {checked && (
        <svg viewBox="0 0 16 16" className={styles.icon} aria-hidden="true">
          <path
            d="M4 8l3 3 5-5"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default Checkbox;
