<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Global & Workspace Skills Priority Rule

Whenever the user prompts for any task, always actively review and apply relevant installed skills from the global and workspace skills collection for the highest quality results.

- **Frontend & UI/UX**: Always invoke `frontend-design`, `frontend-ui-engineering`, `ux-design-systems`, `mobile-responsiveness`, and `web-accessibility`.
- **Security & Hardening**: Proactively apply `security-best-practices`, `security-and-hardening`, `owasp-security`, and related security testing playbooks (`muku-*`, `somar-pt-*`, `yak-*`).
- **Code Quality & Testing**: Enforce `code-review-and-quality`, `test-driven-development`, and `code-simplification`.
- **Databases & Architecture**: Use `database-designer`, `sql-database-assistant`, `supabase-postgres-best-practices`, and `arch-lens`.
- **Debugging & Error Handling**: Follow `debugging-and-error-recovery` systematic workflows.
