# Test Feature

Guide me through manually testing the feature we just built.

## Your Job
1. Based on the feature we just implemented, create a step-by-step QA checklist
2. Include both "happy path" tests (everything works as expected) and "edge case" tests (things that might break)
3. Tell me exactly what to click, type, and look for at each step

## Test Format
```
## Manual QA — [Feature Name]

### Happy Path
1. **Step**: [what to do]
   **Expected**: [what should happen]

2. **Step**: [what to do]
   **Expected**: [what should happen]

### Edge Cases
1. **Step**: [what to do]
   **Expected**: [what should happen — graceful error, etc.]

### Regression
1. **Step**: [verify existing feature still works]
   **Expected**: [unchanged behavior]
```

## Rules
- Write tests a non-technical person can follow — be specific about what to click and type
- Include at least 3 happy path tests and 3 edge case tests
- Always include regression tests for features that might be affected by our changes
- If something fails during testing, help me understand if it's a bug or expected behavior

## Argument
Feature to test (optional — defaults to most recent feature built): $ARGUMENTS
