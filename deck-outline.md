# Deck Outline: How I Build Products with AI

## Purpose
A slide deck to share with friends and interviewers explaining my AI development workflow. Uses the Daily Todo app as a concrete example.

---

## Phase 0: Research & Inspiration
- Watched a YouTube interview of an advanced, non-technical PM who uses AI to build and ship real products
- Extracted the full transcript and gave it to Claude for deeper analysis
- Identified the core workflow: a structured PM-to-CTO pipeline using `CLAUDE.md` + `/commands` in Cursor with Claude Code
- Broke down the three modes of working with AI: conversational, thinking partner, build pipeline

## Phase 1: Setup
- With Claude's help, created the full project scaffold — `CLAUDE.md`, 10 `/commands`, folder structure
- The `CLAUDE.md` acts as a system prompt making Claude Code behave as a CTO — opinionated, challenges thinking, owns technical decisions
- Each `/command` maps to a phase: create-issue → exploration → plan → execute → review → peer-review → update-docs → learning-opportunity

## Phase 2: Exploration
- Ran `/exploration-phase` — Claude analyzed the (empty) codebase and asked 12 clarifying questions organized by scope, data model, UX/UI, and validation
- Answered as the product owner — focused on how it should feel, not how to build it
- Let the CTO make technical calls I wasn't sure about

## Phase 3: Plan
- Ran `/create-plan` — generated a markdown plan with TLDR, critical decisions, phased tasks, risks & mitigations
- Reviewed the plan before approving — this is the checkpoint that separates intentional building from vibe coding

## Phase 4: Execute
- Ran `/execute-plan` — Claude built the full app in minutes
- Ran it locally with `npm run dev` and tested manually

## Phase 5: QA & Iteration
- Found bugs through manual testing (time validation edge case)
- Told Claude Code directly to fix them
- Ran `/review` — Claude found 6 issues on its own, including 2 critical, and fixed 5 automatically

## Phase 6: Postmortem
- Asked Claude why it missed the time validation bug during review
- Claude reflected on the root cause and updated its own `/review` command and `CLAUDE.md` so the mistake never happens again
- The workflow gets permanently smarter after every session

## Phase 7: Backlog & Next Steps
- Created issues for future work using the same process: portfolio documentation, demo tasks, GitHub Pages deployment
- Demo tasks added so first-time visitors see a functional app, not an empty screen

---

## Key Themes for the Deck
- The process is the differentiator, not the output
- Three modes: conversational, thinking partner, build pipeline
- You own the product decisions, AI owns the technical decisions
- Multi-model peer review (Claude, Composer, Codex)
- Postmortem habit — the workflow gets smarter over time
- Anyone can replicate this with the starter kit
