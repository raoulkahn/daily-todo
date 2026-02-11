import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { THEMES } from '../themes';
import styles from './ThemePicker.module.css';

function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { themeId, setTheme } = useTheme();

  return (
    <>
      {isOpen && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Choose a Theme</h3>
          <div className={styles.themeList}>
            {THEMES.map((theme) => {
              const isSelected = theme.id === themeId;
              return (
                <button
                  key={theme.id}
                  className={`${styles.themeRow} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setTheme(theme.id)}
                >
                  <div className={styles.swatches}>
                    <span
                      className={styles.swatch}
                      style={{ background: theme.swatches[0] }}
                    />
                    <span
                      className={styles.swatch}
                      style={{ background: theme.swatches[1] }}
                    />
                  </div>
                  <span className={styles.themeName}>{theme.name}</span>
                  {isSelected && (
                    <svg className={styles.checkmark} viewBox="0 0 20 20" aria-hidden="true">
                      <circle cx="10" cy="10" r="10" fill="var(--theme-accent)" />
                      <path
                        d="M6 10l3 3 5-5"
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
            })}
          </div>
          <p className={styles.hint}>Click a theme to preview instantly</p>
        </div>
      )}

      <button
        className={styles.fab}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close theme picker' : 'Open theme picker'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M2 12C2 6.48 6.48 2 12 2c4.42 0 8 3.58 8 8 0 2.76-2.24 5-5 5h-1.77c-1.38 0-2.5 1.12-2.5 2.5 0 .61.23 1.17.6 1.6.37.43.6.99.6 1.6 0 1.38-1.12 2.3-2.5 2.3C6.48 23 2 17.52 2 12z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="12" r="1.5" fill="white" />
            <circle cx="12" cy="8.5" r="1.5" fill="white" />
            <circle cx="15" cy="11" r="1.5" fill="white" />
          </svg>
        )}
      </button>
    </>
  );
}

export default ThemePicker;
