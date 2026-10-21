# CyberStudy — IT 6203 Design Studio

**Milestone 1 team application (work in progress)**  
Angular 22 reactive-form project for a cybersecurity study and practice tracker.

## What's implemented

| Component | Status | Form behavior |
| --- | --- | --- |
| Study Topics | Partner contribution included | Reactive form, required-field validation; valid submissions logged to the browser console |
| Lab Tracker | Chad Hawkins contribution included and locally tested | Reactive form with validation and temporary in-memory Create, Read, Update, Delete |
| Third approved component | **Awaiting team confirmation/contribution** | Must be added by the assigned team member |

The present application displays **two independent components** for Milestone 1. The exact approved third-component name and teammate assignments must be confirmed against the group's proposal. **Do not present this repository as a finished three-component project.**

The project has **no persistent storage**, backend, MongoDB connection, or active YouTube API integration. These are not required for Milestone 1. Lab records reset on page refresh.

## Setup (Windows / macOS / Linux)

Open a terminal in the folder containing `package.json`:

```bash
npm ci
npm run build
npm start
```

Then visit **http://localhost:4200/**, typed directly into the browser address bar. If `npm ci` fails due to inconsistent dependencies, review its output; `npm install` can be used if the lockfile needs regeneration.

In **Study Topics**, complete the fields and click Save Topic. A valid submission is currently logged in the browser DevTools Console (no list UI). In **Lab Tracker**, use Save Lab Entry to add an item, then Edit and Delete to demonstrate temporary in-memory CRUD. Required and minimum-length validators should reject invalid values.

## Project source

```text
src/
  app/
    study-topics/    # Partner's contribution
    lab-tracker/     # Chad Hawkins's contribution
    app.ts           # Displays both components for demonstration
    app.html         # Application shell
  styles.css         # Shared styles
```

**Do not upload** `node_modules/`, `dist/`, `.angular/`, or local log/cache files. They are excluded by `.gitignore`.

## Milestone 1 evidence and next steps

- User-flow diagram: [`docs/architecture/CyberStudy_User_Flow_DRAFT.png`](docs/architecture/CyberStudy_User_Flow_DRAFT.png). It shows the third component as a **placeholder**; update it before final submission using the approved proposal.
- Lab Tracker evidence: `docs/evidence/lab-tracker/`, including real localhost screenshots and accompanying notes.
- Lab Tracker component: tested locally by Chad using screenshots demonstrating validation and all four in-memory CRUD operations.
- Study Topics: working form displayed in the browser; its assigned member still needs to supply report evidence and test results.
- Third component: not included yet. Add its Angular source and screenshots.
- Final submission: **one PDF** with the approved scope table, final three-component user flow, each member's labeled TypeScript/HTML snippets and real browser screenshot, explanations, and this shared repository URL.

See [`docs/M1_SUBMISSION_CHECKLIST.md`](docs/M1_SUBMISSION_CHECKLIST.md) and [`docs/TEAM_HANDOFF.md`](docs/TEAM_HANDOFF.md).

## Source and attribution

The shared project began with a partner-supplied `Cyberstudy-main.zip` (Study Topics). The Lab Tracker component was contributed by Chad Hawkins. Final attribution of all components should be recorded in the approved Project Scope table; do not infer member names from placeholders.

**Build verification:** user-observed local Angular development build and browser workflow are documented in screenshots. Automated CI and production build from this packaged copy are not claimed here.
