import { formatTime } from '../utils/dateHelpers';
import styles from './TaskItem.module.css';

function TaskItem({ task, onToggle, onClick }) {
  return (
    <div
      className={`${styles.item} ${task.completed ? styles.completed : ''}`}
      onClick={() => onClick(task)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(task);
        }
      }}
    >
      <div className={styles.timeRange}>
        <span className={styles.time}>{formatTime(task.startTime)}</span>
        <span className={styles.timeSep}>&ndash;</span>
        <span className={styles.time}>{formatTime(task.endTime)}</span>
      </div>

      <div className={styles.content}>
        <span className={styles.title}>{task.title}</span>
      </div>

      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        onClick={(e) => e.stopPropagation()}
        aria-label={task.completed ? 'Mark as not done' : 'Mark as done'}
      />
    </div>
  );
}

export default TaskItem;
