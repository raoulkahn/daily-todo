import { useState } from 'react';
import { TodoProvider } from './context/TodoContext';
import { getTodayString } from './utils/dateHelpers';
import DateNavigator from './components/DateNavigator';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
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
    <TodoProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.title}>Daily Todo</h1>
        </header>
        <DateNavigator
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <main className={styles.main}>
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
    </TodoProvider>
  );
}

export default App;
