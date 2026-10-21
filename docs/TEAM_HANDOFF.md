# CyberStudy handoff — Milestone 1

## What you're receiving
A clean, uploadable Angular project with the Study Topics and Lab Tracker components, shared styling, documented Lab Tracker evidence, and a draft project-wide user flow.

### For the partner maintaining Study Topics
1. Review `src/app/study-topics/` (your existing component has been preserved).
2. Run `npm ci`, `npm run build`, `npm start` locally.
3. Open `http://localhost:4200/` and test the Study Topics form, validation, and console output.
4. Capture a real browser screenshot with the URL visible and your `.ts`/`.html` snippets; write a brief explanation of each.
5. Confirm your assigned component name and the other members in the approved Project Scope table.

### For the third team member
1. Confirm your **approved** component in the Project Scope table (the diagram currently has a placeholder).
2. Add a standalone Angular reactive-form component under `src/app/<approved-component>/`, with `.ts`, `.html`, `.css`.
3. Use the existing shared theme in `src/styles.css`; retain component-specific CSS in your component file.
4. Integration is not required for Milestone 1. If not integrating it into the demo shell, keep the component in a clearly named folder and include screenshots from its separately running demo.
5. Send code excerpts, real browser screenshot and explanations for the group PDF.

### For group repository owner
1. If a CyberStudy group repo already exists, coordinate access instead of creating a duplicate.
2. Upload the **contents** of this folder, not the ZIP file itself. Preserve all source subfolders and `.gitignore`.
3. Do not overwrite the existing `mean-test` individual coursework repository.
4. Invite collaborators with appropriate permission once the team agrees.
5. Verify the repository displays `package.json`, `angular.json`, `src/app/study-topics/`, and `src/app/lab-tracker/`.
6. Confirm the repo is accessible to the instructor (public or instructor access if private).
7. Before submission, finalize the third component and group diagram and combine the report material into one PDF.

## Scope and honesty
No database; Lab Tracker CRUD is in browser memory. Study Topics valid submissions are logged to console, not saved in a displayed list. Screenshots in the evidence folder were captured from the locally running application, but the group should verify that their final repository code still matches those screenshots after merging contributions.
