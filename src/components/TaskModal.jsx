import { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { validateTask } from '../utils/validation';
import { getDefaultTimes, addThirtyMinutes } from '../utils/dateHelpers';
import TimePicker from './TimePicker';
import styles from './TaskModal.module.css';

function TaskModal({ isOpen, onClose, task, selectedDate }) {
  const { addTask, updateTask, deleteTask } = useTodo();
  const isEditing = Boolean(task);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Populate form when editing or set defaults when creating
  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title);
        setStartTime(task.startTime);
        setEndTime(task.endTime);
        setNotes(task.notes || '');
      } else {
        const defaults = getDefaultTimes();
        setTitle('');
        setStartTime(defaults.startTime);
        setEndTime(defaults.endTime);
        setNotes('');
      }
      setErrors({});
      setShowDeleteConfirm(false);
    }
  }, [isOpen, task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const fieldErrors = validateTask(title, startTime, endTime);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    let result;
    if (isEditing) {
      result = updateTask(task.id, { title, startTime, endTime, notes });
    } else {
      result = addTask({ title, startTime, endTime, notes, date: selectedDate });
    }

    if (!result.success) {
      setErrors({ overlap: result.error });
      return;
    }

    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  // Close on Escape key + prevent background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            {isEditing ? 'Edit Task' : 'New Task'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.overlap && (
            <div className={styles.overlapError}>{errors.overlap}</div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
              }}
              placeholder="What needs to be done?"
              autoFocus
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles.timeRow}>
            <div className={styles.field}>
              <label className={styles.label}>Start Time</label>
              <TimePicker
                value={startTime}
                onChange={(val) => {
                  setStartTime(val);
                  // Auto-adjust end time if new start >= current end
                  if (val && endTime && val >= endTime) {
                    setEndTime(addThirtyMinutes(val));
                  }
                  if (errors.startTime || errors.endTime) {
                    setErrors(prev => ({ ...prev, startTime: undefined, endTime: undefined }));
                  }
                }}
                hasError={Boolean(errors.startTime)}
                id="task-start"
              />
              {errors.startTime && <span className={styles.error}>{errors.startTime}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>End Time</label>
              <TimePicker
                value={endTime}
                onChange={(val) => {
                  // Auto-adjust if end is before/equal to start (keep UX state valid)
                  const nextEnd = val && startTime && val <= startTime
                    ? addThirtyMinutes(startTime)
                    : val;
                  setEndTime(nextEnd);
                  if (errors.endTime) setErrors(prev => ({ ...prev, endTime: undefined }));
                }}
                hasError={Boolean(errors.endTime)}
                id="task-end"
              />
              {errors.endTime && <span className={styles.error}>{errors.endTime}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-notes">Notes (optional)</label>
            <textarea
              id="task-notes"
              className={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional context..."
              rows={3}
            />
          </div>

          <div className={styles.actions}>
            {isEditing && (
              <div className={styles.deleteArea}>
                {showDeleteConfirm ? (
                  <div className={styles.deleteConfirm}>
                    <span className={styles.deleteText}>Delete this task?</span>
                    <button
                      type="button"
                      className={styles.deleteConfirmBtn}
                      onClick={handleDelete}
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      className={styles.deleteCancelBtn}
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}

            <div className={styles.submitArea}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                {isEditing ? 'Save Changes' : 'Add Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
