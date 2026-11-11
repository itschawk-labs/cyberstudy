# CyberStudy — IT 6203, Milestone 2 (Group 5)

Integrated Angular frontend, Express API, MongoDB persistence; three routed components: Study Topics, Lab Tracker, Learning Resources.

## Run locally
1. Install Node.js and npm. Configure an Atlas cluster, database user, and IP access list, or use local MongoDB.
2. In `server/`: `npm install`; copy `.env.example` to `.env`; edit `MONGODB_URI` to point to YOUR database (including `/cyberstudy`).
3. In `server/`: `npm start`. Verify http://localhost:8000/api/health reports a connected database.
4. In another terminal in the project root: `npm install` then `npm start`.
5. Open http://localhost:4200 and test all three routes: `/topics`, `/labs`, `/resources`.

The Angular development server forwards `/api` to Express using `proxy.conf.json`.

## Windows/VPN DNS workaround
Only if Node.js raises `querySrv ECONNREFUSED` but an SRV query to 8.8.8.8 succeeds, set `DNS_SERVERS=8.8.8.8` in your PRIVATE `server/.env`. This applies to the Node process and does not alter system DNS. Don't hardcode or commit your personal DNS setting or credentials.

## Verification status (November 11, 2026)
- Chad verified Express/MongoDB API Create, Read, Update and Delete for all three collections.
- Marcianna reported browser CRUD, required-field validation, navigation, persistence after reload, and a successful Angular production build using her change-detection fix.
- Chad ran `npm run build` successfully on the merged project and demonstrated Study Topics Create, Update and Delete on the merged frontend (screenshots provided in the team conversation).
- Recheck browser CRUD for Lab Tracker and Learning Resources against the final GitHub version before submitting; report only confirmed test results.
- The source ZIP is not itself proof of GitHub publication or D2L submission.

## Group responsibilities
- Chad Hawkins — Backend/MongoDB, API integration, API testing and GitHub final integration.
- Marcianna Newell — Frontend review and fixes, navigation and form behavior, UX consistency, real application screenshots and PDF report.
- The original proposal also assigned Learning Resources to Jamil Beauge. Do not imply an absent member performed unverified work.

## Submission
`IT6203_M2_Group5.pdf`: original approved scope table, real screenshots of UI/navigation and CRUD per component, GitHub URL. Include the GitHub URL as a submission comment. Third-party API is not required for Milestone 2.

**Security:** Never commit any `.env` file, Atlas URI with credentials, or `node_modules`. The supplied `server/.env.example` contains placeholders only.
