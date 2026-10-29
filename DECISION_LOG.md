# Implementation Decision Log

1. **React Native with Expo** — Used the existing Expo project to support cross-platform development.
2. **File-based navigation** — Kept screens in the existing `src/app` route structure.
3. **Dashboard-first experience** — Prioritized monthly financial summaries and recent transactions on the main screen.
4. **Minor-unit amounts** — Converted `amount_minor` to display units when rendering currency, avoiding direct display of raw minor-unit values.
5. **Transaction selection** — Used a selectable transaction row to expose transaction details without leaving the dashboard.
6. **Paginated transactions** — Added a load-more flow to retrieve further transaction records.
7. **Duplicate filtering** — Filtered newly loaded items against known transaction identifiers during pagination.
8. **Request error handling** — Added error handling around loading additional transactions so failures can be communicated to the user.
9. **Separate Money Insights screen** — Kept general financial guidance separate from the transaction dashboard.
10. **Web-specific tab component** — Kept web tab behavior in `app-tabs.web.tsx` to accommodate platform-specific rendering.

## Known limitations / verification
- Confirm the monthly balance formula against the assignment's expected business rules.
- Test network failure and retry behavior.
- Confirm transaction detail completeness and pagination duplicate handling.
- Settings currently appears to be a basic panel rather than a complete preferences screen.
- These decisions describe the current implementation and should be updated if the code changes.
