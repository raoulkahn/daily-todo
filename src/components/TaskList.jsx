import { useTodo } from '../context/TodoContext';
import { isDatePast } from '../utils/dateHelpers';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

function TaskList({ selectedDate, onTaskClick }) {
  const { getTasksForDate, toggleComplete } = useTodo();

  let tasks = getTasksForDate(selectedDate);
  const isPast = isDatePast(selectedDate);

  // Past dates show only completed tasks (incomplete ones have rolled over)
  if (isPast) {
    tasks = tasks.filter(t => t.completed);
  }

  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>
          {isPast
            ? 'No completed tasks on this day'
            : 'No tasks yet — add one to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleComplete}
          onClick={onTaskClick}
        />
      ))}
    </div>
  );
}

export default TaskList;
