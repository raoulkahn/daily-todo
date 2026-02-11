# Deploy Check

We're about to deploy. Run through the pre-deployment checklist.

## Your Job
1. Verify the app runs locally without errors
2. Check that all plan tasks are marked complete
3. Review for any hardcoded values, debug code, or console.logs that shouldn't ship
4. Verify error handling is in place for user-facing features
5. Check that the UI looks correct and is responsive
6. Confirm no sensitive data (API keys, passwords) is exposed in the code

## Checklist Output
```
## Deploy Checklist — [Feature Name]

- [ ] App runs locally without errors
- [ ] All plan tasks marked complete
- [ ] No debug code or console.logs left behind
- [ ] Error handling in place
- [ ] UI renders correctly
- [ ] No sensitive data exposed
- [ ] Documentation updated

**Verdict**: READY TO DEPLOY / NOT READY — [reason]
```

## Rules
- Be conservative. If anything is questionable, flag it.
- Better to catch something small now than deal with it in production.
