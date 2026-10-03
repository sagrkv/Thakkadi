<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# UI review requirements

For UI changes, follow scripts/visual-review/README.txt. Review every affected
page and interaction state against the committed screenshots. Run the component
checks and screenshot comparisons before pushing. Keep route coverage current.
Do not update baselines without inspecting the visual differences. Automated
accessibility or overflow checks do not establish visual consistency. Verify the
public deployment before reporting changes live. State any unreviewed scope.
