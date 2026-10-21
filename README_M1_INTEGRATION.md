# CyberStudy — combined working copy for Milestone 1

This combines the actual Study Topics files in Cyberstudy-main.zip with Chad's Lab Tracker source. The team's existing Angular 22.2 project configuration, package-lock, and global styles are preserved. The app root now renders the two forms on one page. The third approved component is still missing.

**Build status:** Chad demonstrated a successful Angular development compilation and actual browser operation locally in screenshots, including form validation and in-memory CRUD. The packaged ZIP has not been independently production-built in this environment. See `docs/evidence/lab-tracker/` for user-supplied evidence.

## Windows / VS Code steps
1. Extract the combined ZIP to a working folder. Open the folder containing `package.json` and `angular.json` in VS Code.
2. Open Terminal > New Terminal. Run `node --version` and `npm --version` to verify Node and npm are installed. Angular 22 requires a supported version of Node (check Angular's compatibility table if installation errors occur).
3. Run `npm ci` (preferred when package-lock is present; `npm install` is a fallback if lockfile is inconsistent).
4. Run `npm run build`. If this fails, copy the first error message before changing any files.
5. Run `npm start` and open the URL printed by Angular, usually `http://localhost:4200/`.
6. Confirm **CyberStudy**, **Study Topics** and **Lab Tracker** appear on the same page.
7. Study Topics: click Save Topic with empty required fields; confirm validation; enter Topic Name `Packet Analysis`, Category `Networking`, Difficulty `Beginner`, Status `In Progress`; press Save Topic. Submission is currently logged in browser developer tools > Console.
8. Lab Tracker: click Save Lab Entry with blank fields. Fill in Title `Wireshark DHCP Analysis`, Category `Network Security`, Lab Date (today), Status `Completed`, Notes `Inspected DHCP offer packets and identified a legitimate server.` Submit; verify the in-memory entry appears. Test Edit, Delete / Keep Entry, and Confirm Delete.
9. Take real browser screenshots with the URL visible, and code screenshots/excerpts from .ts and .html.
10. Put source code into your group's ONE shared GitHub repository. Confirm exact approved team assignments and component names; add third member's component to shared project or their clearly labeled source folder.
11. Assemble one final PDF with scope table, complete three-branch user-flow diagram and each member's name/code snippets/explanation/screenshots, plus GitHub link.

## Key files in this merged project
- `src/app/study-topics/` — partner's original code; not modified
- `src/app/lab-tracker/` — Chad's contributed code
- `src/app/app.ts` — imports both components
- `src/app/app.html` — renders both components
- `src/app/app.css` — minimal root layout
- `src/styles.css` — partner's shared styling (unchanged)
- `src/app/app.spec.ts` — adjusts original boilerplate title test to render current heading

## Scope of functionality
- Study Topics: reactive form + validation; valid submissions logged to browser console.
- Lab Tracker: reactive form + validation + temporary in-memory create/read/update/delete.
- No backend or database. Refreshing clears Lab Tracker entries. This is appropriate for Milestone 1.
