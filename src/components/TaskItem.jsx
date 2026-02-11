import { formatTime } from '../utils/dateHelpers';
import Checkbox from './Checkbox';
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
        {task.notes && <span className={styles.notes}>{task.notes}</span>}
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          ariaLabel={task.completed ? 'Mark as not done' : 'Mark as done'}
        />
      </div>
    </div>
  );
}

export default TaskItem;
