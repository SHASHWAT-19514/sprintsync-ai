# Security Guidelines

## Environment Variables

This project uses environment variables to store sensitive configuration. **Never commit `.env.local` or any file containing actual API keys to version control.**

### Setup Instructions

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual credentials in `.env.local`:
   - `WATSONX_API_KEY`: Your IBM WatsonX API key
   - `WATSONX_PROJECT_ID`: Your WatsonX project ID
   - `WATSONX_URL`: WatsonX API endpoint URL

### Protected Files

The following files are automatically ignored by git (see `.gitignore`):
- `.env*` - All environment files are excluded by default
- `.env.local` - Local environment variables (contains secrets)

### What Gets Committed

✅ **Safe to commit:**
- `.env.example` - Template with placeholder values
- Code that references `process.env.VARIABLE_NAME`

❌ **Never commit:**
- `.env.local` - Contains actual API keys
- Any file with hardcoded credentials
- API keys in comments or documentation

### Verification

Before pushing to GitHub, verify your secrets are protected:

```bash
# Check if .env.local is ignored
git check-ignore .env.local

# Check what files will be committed
git status

# Verify .env.local is not in the staging area
git diff --cached
```

### If You Accidentally Commit Secrets

1. **Immediately rotate/regenerate** the exposed API keys
2. Remove the file from git history:
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch path/to/file" \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. Force push (if already pushed to remote):
   ```bash
   git push origin --force --all
   ```

## Best Practices

- Use environment variables for all sensitive data
- Keep `.env.example` updated with new variables (without actual values)
- Never log sensitive information to console
- Use different credentials for development and production
- Regularly rotate API keys