# Marcianna — Frontend and report handoff

## Starting point
This is the same baseline application Chad has used for backend/API verification, **not** the final published repository. It includes a full frontend and backend for local functional testing; no real MongoDB credentials are shared.

## Your responsibilities
1. Launch frontend locally, using your own database connection or a safe test setup coordinated with Chad.
2. Verify all navigation links: Study Topics, Lab Tracker, Learning Resources; include relevant feature access.
3. For each page, verify a complete user flow: Create, displayed list (Read), Edit + Save (Update), Delete + confirmation. Reload to verify MongoDB persistence.
4. Check required-field validation and useful error messages, mobile/desktop readability, and uniform labels/buttons/layout.
5. Fix frontend code as needed. Keep changes limited primarily to `src/app/` and `src/styles.css`.
6. Capture genuine screenshots after using a working backend and database; no mockups as grading evidence.
7. Prepare the Group 5 PDF report with the ORIGINAL project scope table and link to the final GitHub repository.

## What to send Chad for integration
- **Preferred:** commit changes to a separate branch and open a pull request against the `cyberstudy` repo. Include branch name and PR URL. Do not overwrite the default branch directly.
- **If GitHub branch access isn't available:** send a ZIP containing ONLY modified frontend files and a `CHANGES.md` listing added/modified/deleted paths, plus copy of test screenshots. Keep original relative paths.
- Include a short list of tests performed, results, and any remaining errors.
- Report any API contract changes requested; coordinate with Chad BEFORE changing endpoint paths or payload field names.
- Send actual screenshots for: navigation, each component and Create/Read/Update/Delete (can combine operations when visible clearly), and persistence after refresh.
- Do NOT send `.env`, passwords, connection strings, node_modules, or personal Atlas access credentials.

## Existing API contract — do not rename without coordination
`GET /api/topics`, `POST /api/topics`, `PUT /api/topics/:id`, `DELETE /api/topics/:id`
Same method/path structure for `labs` and `resources`. Identifiers are MongoDB `_id` strings.
- Topic fields: `topicName`, `category`, `description`, `difficulty`, `status`, `notes`.
- Lab fields: `title`, `relatedTopic`, `description`, `tools`, `labDate`, `status`, `notes`.
- Resource fields: `title`, `type`, `relatedTopic`, `description`, `link`, `notes`.

## Integration checkpoints
- Chad checks clean Angular install/build and merges your changes.
- Chad checks the backend health endpoint and API behavior against the merged frontend.
- Both verify successful user flows on the merged application and complete the final review before PDF submission.
