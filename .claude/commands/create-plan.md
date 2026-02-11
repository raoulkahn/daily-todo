# Create Plan

Based on our exploration phase exchange, create a detailed implementation plan as a markdown file.

## Plan Template
Create a markdown file in `/plans/` with the following structure:

```markdown
# Plan: [Feature Name]
**Created**: [date]
**Status**: In Progress

## TLDR
One paragraph summary of what we're building and why.

## Critical Decisions
| Decision | Choice | Reasoning |
|----------|--------|-----------|
| [decision point] | [what we chose] | [why] |

## Implementation Tasks

### Phase 1: [Phase Name]
- [ ] Task 1 — brief description
- [ ] Task 2 — brief description

### Phase 2: [Phase Name]
- [ ] Task 3 — brief description
- [ ] Task 4 — brief description

### Phase 3: [Phase Name]
- [ ] Task 5 — brief description
- [ ] Task 6 — brief description

## Files to Create/Modify
- `path/to/file.js` — what changes and why

## Testing Checklist
- [ ] Test case 1
- [ ] Test case 2

## Risks & Mitigations
- **Risk**: [what could go wrong] → **Mitigation**: [how we handle it]
```

## Rules
- Keep steps clear, minimal, and concise
- Each task should be small enough to complete in one focused session
- Include status trackers that you'll update during execution
- The plan should be readable by someone who wasn't in the exploration conversation
- Think about the order of operations — what needs to happen first?
- This plan may be executed by a different model, so be explicit about implementation details

## Argument
Additional context or constraints: $ARGUMENTS
