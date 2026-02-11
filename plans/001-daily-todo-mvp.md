# Plan: Daily Todo List — MVP
**Created**: 2026-02-10
**Status**: Complete

## TLDR
Build a daily todo list web app with a navigable day view. Each task has a title, start/end time, optional notes, and a done status. Tasks are sorted by start time, cannot overlap, and incomplete tasks automatically roll over to the next day. Data is stored in localStorage. No backend, no auth. Clean, modern, minimal UI.

## Critical Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Framework | React (via Vite) | Best ecosystem for component-based UI. Vite gives us instant dev server, fast builds, zero config. Lightweight enough for a localStorage app. |
| Styling | CSS Modules | Clean, scoped styles without adding a CSS framework dependency. Keeps the bundle small and gives full control over the minimal aesthetic. |
| State Management | React useState + Context | App is simple enough that we don't need Redux or Zustand. A single TodoContext provides shared state across components. |
| Date Library | date-fns | Lightweight, tree-shakeable, no heavy Moment.js-style bundle. We need date math for navigation and rollover logic. |
| Time Picker | Custom dropdowns (TimePicker.jsx) | Native `<input type="time">` had inconsistent step behavior across browsers. Custom dropdowns enforce :00/:30 increments reliably. |
| Data Storage | localStorage with JSON | Simplest persistence layer. Tasks stored as a JSON array keyed by a unique ID. |
| ID Generation | crypto.randomUUID() | Built into all modern browsers. No dependency needed. |
| Build Tool | Vite | Fast, modern, zero-config for React. Production build is optimized out of the box. |

## Data Model

```javascript
{
  id: string,          // crypto.randomUUID()
  title: string,       // required
  startTime: string,   // "HH:mm" format (24hr)
  endTime: string,     // "HH:mm" format (24hr)
  notes: string,       // optional, defaults to ""
  completed: boolean,  // default false
  date: string,        // "YYYY-MM-DD" format
  createdAt: string    // ISO 8601 timestamp
}
```

localStorage key: `"daily-todo-tasks"` → JSON array of all tasks across all dates.

## Implementation Tasks

### Phase 1: Project Setup
- [x] Initialize Vite + React project with JavaScript
- [x] Install dependencies (date-fns)
- [x] Set up project folder structure (`components/`, `hooks/`, `utils/`, `styles/`)
- [x] Create base CSS with design tokens (colors, fonts, spacing) for the minimal aesthetic
- [x] Set up localStorage utility functions (read, write, initialize)

### Phase 2: Core Data Layer
- [x] Create TodoContext with provider — holds all tasks, exposes CRUD actions
- [x] Implement `addTask(task)` — validates no overlap, saves to localStorage
- [x] Implement `updateTask(id, updates)` — validates no overlap on time changes, saves
- [x] Implement `deleteTask(id)` — removes from state and localStorage
- [x] Implement `toggleComplete(id)` — flips completed boolean, saves
- [x] Implement `getTasksForDate(date)` — filters tasks by date, sorts by startTime
- [x] Implement overlap validation utility — given a date, startTime, endTime, and optional excludeId, returns true if overlap exists
- [x] Implement rollover logic — on app load, find all incomplete tasks with dates before today, update their date to today, save

### Phase 3: Navigation & Layout
- [x] Build `App` shell component — header with date navigation, main content area
- [x] Build `DateNavigator` component — left/right arrows, current date display, "Today" button
- [x] Wire date navigation to state — track selected date, pass to task list

### Phase 4: Task List & Display
- [x] Build `TaskList` component — renders tasks for selected date, sorted by startTime
- [x] Build `TaskItem` component — displays title, time range, done toggle on right side
- [x] Style completed tasks (visual differentiation — strikethrough or muted)
- [x] Handle empty state — message when no tasks exist for selected date
- [x] For past dates, display completed tasks only (filter out incomplete — they've rolled over)

### Phase 5: Task Modal (Create/Edit)
- [x] Build `TaskModal` component — form with title, start time, end time, notes fields
- [x] Add "New Task" button to main view that opens modal in create mode
- [x] Wire modal to edit mode — clicking a task opens the modal pre-filled with task data
- [x] Implement form validation — title required, times required, end > start, no overlap
- [x] Display validation errors inline in the modal
- [x] Add delete button inside the edit modal (with confirmation)

### Phase 6: Rollover Logic & Polish
- [x] Test rollover on app load — incomplete past tasks move to today
- [x] Handle multi-day gap rollover (e.g., app not opened for 3 days — all incomplete tasks land on today)
- [x] Add subtle animations/transitions (modal open/close, task completion toggle)
- [x] Responsive design — works on mobile and desktop
- [x] Final visual polish — spacing, typography, hover states, focus states

## Files to Create/Modify

```
daily-todo/
├── .github/workflows/deploy.yml        — GitHub Pages auto-deploy on push to main
├── index.html                          — Vite entry point
├── package.json                        — dependencies and scripts
├── vite.config.js                      — Vite configuration (base: /daily-todo/)
├── src/
│   ├── main.jsx                        — React root render
│   ├── App.jsx                         — App shell, layout, date + modal state
│   ├── App.module.css                  — App layout styles + New Task button
│   ├── index.css                       — Global styles, CSS variables, reset
│   ├── components/
│   │   ├── DateNavigator.jsx           — Date nav with arrows and today button
│   │   ├── DateNavigator.module.css
│   │   ├── TaskList.jsx                — Renders sorted task items for a date
│   │   ├── TaskList.module.css
│   │   ├── TaskItem.jsx                — Single task row with done toggle
│   │   ├── TaskItem.module.css
│   │   ├── TaskModal.jsx               — Create/edit form modal with time auto-adjust
│   │   ├── TaskModal.module.css
│   │   ├── TimePicker.jsx              — Custom dropdown time picker (:00/:30)
│   │   └── TimePicker.module.css
│   ├── context/
│   │   └── TodoContext.jsx             — React context, CRUD logic, localStorage sync
│   ├── utils/
│   │   ├── storage.js                  — localStorage helpers + demo task seeding
│   │   ├── validation.js               — Overlap detection, form validation
│   │   ├── rollover.js                 — Incomplete task rollover logic
│   │   └── dateHelpers.js              — Date/time formatting, defaults, conversion
│   └── styles/
│       └── tokens.css                  — Design tokens (imported by index.css)
```

## Testing Checklist

### Task CRUD
- [ ] Create a task with title, start time, end time — appears in list sorted correctly
- [ ] Create a task with notes — notes visible in edit modal
- [ ] Edit a task's title — change persists after page reload
- [ ] Edit a task's time — list re-sorts correctly
- [ ] Delete a task — removed from list and localStorage

### Completion Toggle
- [ ] Mark a task as done — "Done" indicator appears on right side
- [ ] Undo done status — indicator removed
- [ ] Completed tasks persist after page reload

### Time Validation
- [ ] Cannot create task where end time <= start time
- [ ] Cannot create task that overlaps with existing task
- [ ] Cannot edit task time to create an overlap
- [ ] Can create task immediately after another ends (e.g., 10:00-11:00 and 11:00-12:00)

### Date Navigation
- [ ] App opens to today's date
- [ ] Navigate to tomorrow — shows empty or future tasks
- [ ] Navigate to yesterday — shows only completed tasks
- [ ] "Today" button returns to current date
- [ ] Date display updates correctly when navigating

### Rollover
- [ ] Create a task for today, don't complete it, change system date to tomorrow, reload — task appears on new today
- [ ] Complete a task, change system date to tomorrow, reload — task stays on original date
- [ ] Multiple incomplete tasks from multiple past days — all land on today

### Persistence
- [ ] All data survives page reload
- [ ] All data survives browser close and reopen

### Form Validation
- [ ] Cannot submit with empty title
- [ ] Cannot submit with missing times
- [ ] Validation errors display clearly in modal
- [ ] Errors clear when user corrects the input

### Responsive
- [ ] Usable on mobile viewport (375px wide)
- [ ] Usable on desktop viewport (1440px wide)

## Risks & Mitigations

- **Risk**: localStorage has a ~5MB limit → **Mitigation**: For a todo app, this is effectively unlimited. A single task is ~200 bytes. That's ~25,000 tasks before any concern. Not a v1 problem.
- **Risk**: Rollover logic could create duplicates if it runs multiple times → **Mitigation**: Rollover updates the task's date in place (same ID) rather than creating copies. Idempotent by design.
- **Risk**: ~~Time input UX varies across browsers~~ → **Resolved**: Replaced native time inputs with custom TimePicker dropdowns. No cross-browser inconsistency.
- **Risk**: User clears localStorage accidentally → **Mitigation**: Accepted for v1. Could add export/import in v2.
- **Risk**: CSS Modules naming collisions in dev → **Mitigation**: Vite handles CSS Modules scoping automatically. Non-issue in practice.
