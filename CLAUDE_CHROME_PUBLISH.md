# Publish CyberStudy Milestone 2 with Claude Chrome

**Target repository:** https://github.com/itschawk-labs/cyberstudy

This archive is a **full replacement source snapshot for Milestone 2**, not a patch to the historical Milestone 1 `main` tree. It includes both Angular and Express plus Marcianna's frontend fix.

## Before uploading
- Extract the ZIP and open `CyberStudy_M2/`. The repository root must contain `package.json`, `src/`, `server/`, `angular.json`, and `README.md`, **not an extra nested CyberStudy_M2 directory**.
- Do not upload a private `.env`, connection URI, password, node_modules, `.angular`, `dist`, or local build data.
- Prefer a new GitHub branch `milestone-2-final`, review the file diff, then merge the branch into `main` if validated.
- GitHub's browser uploader will not necessarily delete obsolete Milestone 1 files. If the final branch contains obsolete files, remove or clearly archive them before submitting.

## Paste into Claude Chrome

Use the browser to open https://github.com/itschawk-labs/cyberstudy. I have a ZIP named CyberStudy_M2_Final_GitHub_Claude_Chrome.zip with a `CyberStudy_M2/` project folder inside. Publish its **contents**, preserving relative paths, as the full Milestone 2 Angular+Express application in a new branch called `milestone-2-final`. Before publishing, inspect the file list and ensure there are no `.env`, secrets, private MongoDB credentials, `node_modules`, `.angular`, or `dist` files. Review how this new project differs from the older Milestone 1 `main` branch. Do not overwrite unrelated branch work or publish credentials. If browser upload cannot preserve all subfolders or deletes are needed, stop and show me a safe GitHub Desktop alternative rather than claiming success. Create a pull request to `main`, summarize the changes, and request my review before merging. Then verify the final `main` tree contains `src/`, `server/index.js`, `server/package.json`, `server/.env.example`, the merged `src/app/records-page.ts`, and the README. Report the URL of the exact commit or PR. Do not claim completion unless the files are visible.

## After publishing
1. Install root and server dependencies on a developer machine.
2. Put the actual private connection string in `server/.env` (never upload it).
3. Start server, verify `/api/health`, start Angular, and test all three routed pages.
4. Run `npm run build` and check that CRUD updates show immediately in the frontend.
5. Add the final repository URL to `IT6203_M2_Group5.pdf` and D2L submission comment.
