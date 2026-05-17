# Security Policy

## 🔒 IBM Bob Hackathon - Security Guidelines

This document outlines security best practices for SprintSync AI, with special emphasis on IBM Cloud credential protection as required by the IBM Bob Hackathon guidelines.

---

## ⚠️ CRITICAL: Preventing Credential Exposure

### IBM Cloud Credentials Protection

**IMPORTANT**: Exposing IBM Cloud API keys or credentials can lead to:
- Immediate credential deactivation
- Account suspension
- Unauthorized access to resources
- Service disruption

### Required Actions

If you accidentally expose credentials in a public repository:

1. **Remove the exposed credential immediately**
   - Delete from all public sources
   - For GitHub, see: [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

2. **Rotate the credential**
   - Generate a new API key in IBM Cloud
   - Update your `.env.local` file
   - Never reuse exposed credentials

3. **Confirm remediation**
   - Contact hackathon support team
   - Request account reactivation

---

## 🛡️ Environment Variables Security

### Protected Credentials

The following credentials must NEVER be committed to version control:

```env
WATSONX_API_KEY=your_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=your_watsonx_url_here
```

### Best Practices

1. **Use `.env.local` for secrets**
   ```bash
   # .env.local is automatically gitignored
   cp .env.example .env.local
   ```

2. **Never commit `.env.local`**
   - Already included in `.gitignore`
   - Double-check before committing

3. **Use `.env.example` as template**
   ```env
   # .env.example (safe to commit)
   WATSONX_API_KEY=your_actual_api_key_here
   WATSONX_PROJECT_ID=your_actual_project_id_here
   WATSONX_URL=enterURLhere
   ```

4. **Rotate keys regularly**
   - Change API keys after hackathon
   - Use different keys for dev/prod

---

## 🔐 API Security

### Server-Side Only

All IBM WatsonX API calls are made server-side:

```typescript
// ✅ CORRECT: Server-side API route
// app/api/generate-tasks/route.ts
export async function POST(req: Request) {
  // API key is only accessible on server
  const apiKey = process.env.WATSONX_API_KEY;
  // ... make API call
}
```

```typescript
// ❌ WRONG: Never expose credentials on client
// This would expose your API key in browser
const apiKey = process.env.NEXT_PUBLIC_WATSONX_API_KEY; // DON'T DO THIS
```

### IAM Token Management

- Tokens are generated server-side only
- Tokens expire after 60 minutes
- Implement token caching to reduce API calls
- Never send tokens to client

```typescript
// Token caching example
let cachedToken: { token: string; expiry: number } | null = null;

async function getIAMToken(apiKey: string): Promise<string> {
  // Check if cached token is still valid
  if (cachedToken && Date.now() < cachedToken.expiry) {
    return cachedToken.token;
  }
  
  // Generate new token
  const response = await axios.post(/* ... */);
  const token = response.data.access_token;
  const expiresIn = response.data.expires_in;
  
  // Cache token
  cachedToken = {
    token,
    expiry: Date.now() + (expiresIn - 300) * 1000 // 5 min buffer
  };
  
  return token;
}
```

---

## 🔍 Code Review Checklist

Before committing or pushing code, verify:

- [ ] No API keys in code files
- [ ] No credentials in comments
- [ ] `.env.local` is gitignored
- [ ] No hardcoded URLs with credentials
- [ ] No credentials in error messages
- [ ] No credentials in console.log statements
- [ ] No credentials in test files

### Automated Checks

```bash
# Search for potential credential leaks
grep -r "WATSONX_API_KEY" --exclude-dir=node_modules --exclude=".env.example"
grep -r "apikey=" --exclude-dir=node_modules
grep -r "Bearer " --exclude-dir=node_modules
```

---

## 📝 Data Privacy

### Meeting Transcripts

- **No storage**: Transcripts are processed in-memory only
- **No logging**: Sensitive data is not logged
- **No persistence**: Data is discarded after processing

### User Data

- **No collection**: No personal information is collected
- **No tracking**: No analytics or tracking cookies
- **No third-party sharing**: Data stays within IBM Cloud

---

## 🚨 Security Incident Response

### If You Suspect a Security Issue

1. **Do NOT create a public GitHub issue**
2. **Contact the team privately**
3. **Provide details**:
   - What was exposed
   - When it was exposed
   - Where it was exposed
   - Steps taken to remediate

### For Hackathon Participants

If you detect exposed credentials:
1. Immediately remove from public repository
2. Rotate the credential in IBM Cloud
3. Contact hackathon support team
4. Document the incident and remediation steps

---

## 🔧 Development Security

### Local Development

```bash
# Use environment variables
npm run dev

# Never hardcode credentials
# ❌ WRONG
const apiKey = "sk-1234567890abcdef";

# ✅ CORRECT
const apiKey = process.env.WATSONX_API_KEY;
```

### Production Deployment

- Use secure environment variable management
- Enable HTTPS only
- Implement rate limiting
- Monitor for unusual activity
- Regular security audits

---

## 📚 Additional Resources

### IBM Cloud Security
- [IBM Cloud Security Best Practices](https://cloud.ibm.com/docs/overview?topic=overview-security)
- [Managing API Keys](https://cloud.ibm.com/docs/account?topic=account-userapikey)
- [IAM Token Management](https://cloud.ibm.com/docs/account?topic=account-iamtoken_from_apikey)

### General Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

---

## 📧 Contact

For security concerns related to this project:
- **Hackathon Support**: Contact through official hackathon channels
- **GitHub Issues**: For non-sensitive bugs only
- **Private Contact**: For credential exposure or security vulnerabilities

---

## ✅ Security Compliance

This project follows:
- IBM Cloud security guidelines
- IBM Bob Hackathon security requirements
- OWASP security best practices
- Next.js security recommendations

**Last Updated**: May 2026  
**Version**: 1.0.0

---

**Remember**: Security is everyone's responsibility. When in doubt, ask before committing!
