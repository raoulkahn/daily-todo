import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider } from './context/TodoContext';
import { getTodayString, getDayName } from './utils/dateHelpers';
import DateNavigator from './components/DateNavigator';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import ThemePicker from './components/ThemePicker';
import styles from './App.module.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <ThemeProvider>
    <TodoProvider>
      <div className={styles.viewport}>
        <div className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.title}>
              <svg className={styles.logo} width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <rect width="28" height="28" rx="6" fill="var(--theme-accent)" />
                <path d="M8 14.5l4 4 8-8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Daily To Do
            </h1>
          </header>
          <DateNavigator
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <main className={styles.main}>
            <h2 className={styles.dayName}>{getDayName(selectedDate)}</h2>
            <TaskList
              selectedDate={selectedDate}
              onTaskClick={openEditModal}
            />
            <button className={styles.addBtn} onClick={openCreateModal}>
              + New Task
            </button>
          </main>
          <TaskModal
            isOpen={modalOpen}
            onClose={closeModal}
            task={editingTask}
            selectedDate={selectedDate}
          />
        </div>
        <ThemePicker />
      </div>
    </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
