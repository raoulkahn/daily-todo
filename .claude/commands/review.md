# Review

Review all code changes made in this session. Be your own harshest critic.

## Your Job
1. Read through every file that was created or modified
2. Check for issues in these categories:

### Critical (must fix before shipping)
- Security vulnerabilities
- Data loss risks
- Logic errors that break core functionality

### High (should fix)
- Edge cases not handled
- Error handling gaps
- Performance concerns
- **UX state consistency**: When a user changes one input, do related inputs stay valid? Walk through realistic multi-step form interactions — don't just check that validation rejects bad input, check that the UI prevents bad states from forming in the first place. For every form with interdependent fields, simulate: "What happens if the user changes field A after already setting field B?"

### Medium (nice to fix)
- Code organization issues
- Naming inconsistencies
- Missing comments on complex logic

### Low (minor)
- Style inconsistencies
- Redundant code
- Minor optimizations

## Output Format
For each issue found:
```
**[SEVERITY]** — File: `path/to/file` — Line: [line number]
Issue: What's wrong
Fix: What should be done
```

## Rules
- Be thorough and honest — this is the last line of defense before other reviewers see the code
- Don't just look for bugs — look for maintainability, readability, and architectural concerns
- If you find zero issues, something is probably wrong with your review. Look harder.
- After listing issues, fix them unless I say otherwise
