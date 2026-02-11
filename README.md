# Daily Todo App

A simple daily todo list built using the Zevi workflow — a structured PM-to-CTO development process powered by Claude Code inside Cursor.

## Setup Instructions

### 1. Open this folder in Cursor
```
cd daily-todo
cursor .
```

### 2. Open Claude Code inside Cursor
- Open the terminal in Cursor (`` Ctrl+` `` or `` Cmd+` ``)
- Type `claude` to start Claude Code
- Claude will automatically read the `CLAUDE.md` file and understand the project

### 3. Your Workflow
Follow these steps in order when building a feature:

| Step | Command | What Happens |
|------|---------|--------------|
| 1 | `/create-issue` | Quick capture a bug or feature idea |
| 2 | `/exploration-phase` | Claude reads the codebase, asks clarifying questions |
| 3 | `/create-plan` | Generates a markdown plan in `/plans/` |
| 4 | `/execute-plan` | Builds the feature following the plan |
| 5 | `/review` | Claude reviews its own code |
| 6 | `/peer-review` | Feed in reviews from other models for Claude to evaluate |
| 7 | `/test-feature` | Get a manual QA checklist |
| 8 | `/deploy-check` | Pre-deployment verification |
| 9 | `/update-docs` | Update docs so future sessions have context |

**Anytime**: `/learning-opportunity` — ask Claude to explain a technical concept at PM level

### 4. The Peer Review Process (Multi-Model)
This is the power move. After Claude reviews its own code:
1. Open Cursor's Composer (Cmd+I) and ask it to review the code
2. Optionally open ChatGPT Codex or another model and have it review too
3. Copy their review outputs
4. Run `/peer-review` in Claude Code and paste the reviews as arguments
5. Claude (as dev lead) will accept, defer, or reject each finding

### 5. The Postmortem Habit
When Claude makes a mistake:
1. Ask: "What in your system prompt or tooling made you make this mistake?"
2. Claude reflects on the root cause
3. Update `CLAUDE.md` or the relevant `/command` to prevent it from happening again
4. Your workflow gets smarter over time

## Project Structure
```
daily-todo/
├── .claude/
│   └── commands/          ← All /commands live here
│       ├── create-issue.md
│       ├── exploration-phase.md
│       ├── create-plan.md
│       ├── execute-plan.md
│       ├── review.md
│       ├── peer-review.md
│       ├── update-docs.md
│       ├── learning-opportunity.md
│       ├── deploy-check.md
│       └── test-feature.md
├── plans/                 ← Implementation plans (markdown)
├── issues/                ← Captured issues (markdown)
├── src/                   ← App code (built during execute phase)
├── CLAUDE.md              ← System prompt Claude reads every session
└── README.md              ← This file
```

## First Session: What To Do
1. Open the project in Cursor
2. Start Claude Code in the terminal
3. Run `/exploration-phase I want to build a daily todo list with: title, time (like calendar events), mark complete, edit, and delete`
4. Answer Claude's clarifying questions
5. Run `/create-plan`
6. Run `/execute-plan`
7. Follow the rest of the workflow

The app gets built through the process. That's the whole point.
