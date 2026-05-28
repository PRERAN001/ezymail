# EzyMail v2.0.0

<img width="2172" height="724" alt="EzyMail Banner" src="https://github.com/user-attachments/assets/88eafc60-3cd2-43a0-811a-e4b5e4848333" />

## Summary

EzyMail v2.0.0 is a milestone release focused on production readiness: backend hosting has been migrated to AWS EC2, deployment and infrastructure have been hardened for improved availability, and operational stability has been significantly improved.

## Highlights

- Migrated backend hosting to AWS EC2 for better control and reliability
- Improved server stability and uptime through operational hardening
- Production deployment pipeline and configuration completed
- Infrastructure improvements and deployment optimizations

## What’s New

- Backend now runs on an AWS EC2 instance.
- Deployment configuration updated for production use (start-up, environment variables, and process supervision).
- Monitoring and basic operational safeguards added to reduce unexpected downtime.

## Deployment & Upgrade Notes

- The API/backend has moved hosts — update any DNS records, endpoints, or client configuration that pointed at the previous host to the new EC2 public endpoint.
- Ensure required environment variables are set on the EC2 instance (see `README.md` for environment expectations).
- If you run local or staging instances, confirm your CORS and webhook targets are configured for the new domain/IP.

## Compatibility

- No breaking changes in public API for sending emails; client usage remains the same.
- Verify any integration that relied on the previous host IP/hostname and update to the new deployment details.

## Known Issues

- Migration may cause transient delays while DNS propagates for some clients.
- Additional monitoring and auto-restart policies are in place but will be further tuned in future patch releases.

## Full Changelog

See the complete commit history for this release: https://github.com/PRERAN001/ezymail/commits/v2.0.0

## Credits

Thanks to everyone who contributed to this release and to the operations work that made the EC2 migration possible.

---

If you want this note added to a different file or formatted for GitHub Releases, tell me and I will update it.