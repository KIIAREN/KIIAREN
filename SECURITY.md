# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          | Status                    |
| ------- | ------------------ | ------------------------- |
| 1.0.x   | :white_check_mark: | Active development        |
| < 1.0   | :x:                | No longer supported       |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability within KIIAREN, please send an email to **[INSERT SECURITY EMAIL]**. All security vulnerabilities will be promptly addressed.

### What to Include

When reporting a vulnerability, please include:

- **Type of vulnerability** (e.g., XSS, SQL injection, authentication bypass)
- **Full paths of source file(s)** related to the manifestation of the issue
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue**, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours of receiving your report
- **Status Updates**: We'll keep you informed about our progress every 5-7 days
- **Fix Timeline**: We aim to release a fix within 90 days, depending on complexity
- **Public Disclosure**: Coordinated with you after a fix is released

### What to Expect

If the vulnerability is accepted:

- We'll work on a fix and release it as soon as possible
- You'll be credited in the security advisory (unless you prefer to remain anonymous)
- We may ask for additional information or guidance

If the vulnerability is declined:

- We'll explain why it doesn't meet the criteria for a security issue
- We may suggest filing a regular bug report if appropriate

## Security Best Practices for Contributors

When contributing to KIIAREN, please:

1. **Never commit sensitive data** (API keys, passwords, tokens) to the repository
2. **Use environment variables** for all configuration secrets
3. **Validate all user inputs** on both client and server side
4. **Follow OWASP guidelines** for web application security
5. **Keep dependencies updated** and monitor for known vulnerabilities
6. **Use HTTPS** for all external communications
7. **Implement proper authentication** and authorization checks

## Dependencies

We use automated tools to monitor our dependencies for known vulnerabilities:

- All dependencies are regularly updated
- Critical security patches are prioritized
- We follow semantic versioning for all updates

To check for vulnerabilities in your local environment:

```bash
npm audit
npm audit fix
```

## Convex Security

KIIAREN uses Convex as its backend. Convex provides:

- Automatic HTTPS encryption
- Built-in authentication and authorization
- Secure data storage and transmission
- Regular security updates and monitoring

For Convex-specific security concerns, please also refer to [Convex Security Documentation](https://docs.convex.dev/production/security).

## Contact

For any security-related questions or concerns, please contact:

**Email**: [INSERT SECURITY EMAIL]

---

**Thank you for helping keep KIIAREN and its users safe!** 🔐
