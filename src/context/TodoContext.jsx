import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';
import { rolloverTasks } from '../utils/rollover';
import { hasOverlap } from '../utils/validation';

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const stored = loadTasks();
    // Run rollover on initial load
    return rolloverTasks(stored);
  });

  // Ref always holds latest tasks so overlap checks never use stale state
  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  // Sync to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  /**
   * Add a new task. Returns { success, error }.
   * Uses tasksRef so overlap check always sees latest state (avoids race conditions).
   */
  const addTask = useCallback((taskData) => {
    const { title, startTime, endTime, notes = '', date } = taskData;

    if (hasOverlap(tasksRef.current, date, startTime, endTime)) {
      return { success: false, error: 'This time overlaps with an existing task' };
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      startTime,
      endTime,
      notes,
      completed: false,
      date,
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => {
      // Double-check overlap against truly current state
      if (hasOverlap(prev, date, startTime, endTime)) return prev;
      return [...prev, newTask];
    });
    return { success: true };
  }, []);

  /**
   * Update an existing task by ID. Returns { success, error }.
   */
  const updateTask = useCallback((id, updates) => {
    const current = tasksRef.current;
    const existing = current.find(t => t.id === id);
    if (!existing) return { success: false, error: 'Task not found' };

    const merged = { ...existing, ...updates };
    if (updates.title !== undefined) merged.title = merged.title.trim();

    // Check overlap if time or date changed (use ref for latest tasks)
    if ('startTime' in updates || 'endTime' in updates || 'date' in updates) {
      if (hasOverlap(current, merged.date, merged.startTime, merged.endTime, id)) {
        return { success: false, error: 'This time overlaps with an existing task' };
      }
    }

    setTasks(prev => prev.map(t => t.id === id ? merged : t));
    return { success: true };
  }, []);

  /**
   * Delete a task by ID.
   */
  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  /**
   * Toggle the completed status of a task.
   */
  const toggleComplete = useCallback((id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }, []);

  /**
   * Get tasks for a specific date, sorted by start time.
   */
  const getTasksForDate = useCallback((date) => {
    return tasks
      .filter(t => t.date === date)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [tasks]);

  const value = useMemo(() => ({
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getTasksForDate,
  }), [tasks, addTask, updateTask, deleteTask, toggleComplete, getTasksForDate]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
