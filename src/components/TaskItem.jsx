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

      <button
        className={`${styles.statusBtn} ${task.completed ? styles.statusDone : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(task.id);
        }}
        aria-label={task.completed ? 'Mark as not done' : 'Mark as done'}
      >
        {task.completed ? 'Done' : 'To Do'}
      </button>
    </div>
  );
}

export default TaskItem;
