# PR #412 Review — Track: Load Transactions from the New API

**Review basis:** Static inspection of `review/TrackScreen.tsx` and `review/useTransactions.ts`.
**Overall recommendation:** Request changes before merging.

## 1. [P1] Preserve loaded transactions when a request fails
**Decision: Block merge**

**Location:** `review/useTransactions.ts` — `catch` block in `load()`.

The catch block calls `setTransactions([])`. If loading another page or refreshing fails, transactions already visible to the user are discarded. This violates the requirement that a failure must never cost users data they could already see.

**Suggested fix:** Preserve existing transactions on request failure, show a recoverable error, and clear data only when the product explicitly requires it.

## 2. [P1] Prevent overlapping pagination requests and stale-state updates
**Decision: Block merge**

**Location:** `review/useTransactions.ts` — `load()`, `loadMore()` and `setTransactions()`.

`loadMore()` has no guard against an in-flight request. Repeated `onEndReached` calls can request the same cursor more than once. The append operation also reads `transactions` from the render closure, so concurrent responses can overwrite one another or append duplicates.

**Suggested fix:** Track in-flight requests, prevent duplicate cursor requests, merge results by stable transaction ID, and use functional state updates. Ensure refresh and pagination responses cannot overwrite newer state.

## 3. [P1] Handle unsuccessful HTTP responses and invalid payloads
**Decision: Block merge**

**Location:** `review/useTransactions.ts` — `load()`.

`fetch()` does not reject on HTTP 4xx/5xx responses. The code immediately parses JSON and assumes `body.items` and `body.next_cursor` exist. An unsuccessful or malformed response can therefore be treated as successful or fail unpredictably.

**Suggested fix:** Check `res.ok`, validate the expected response shape, and expose a recoverable error without discarding cached transactions.

## 4. [P1] Format amounts for Indian users
**Decision: Block merge**

**Location:** `review/TrackScreen.tsx` — `formatAmount()`.

The formatter uses `toLocaleString('en-US')`, which groups large amounts using US conventions rather than Indian numbering conventions.

**Suggested fix:** Use `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` or an equivalent formatter that consistently displays INR amounts using Indian grouping.

## 5. [P1] Keep monetary totals in integer minor units
**Decision: Block merge**

**Location:** `review/useTransactions.ts` — `monthTotal()`.

The reducer divides each `amount_minor` by 100 and accumulates floating-point rupee values. Floating-point arithmetic can introduce rounding errors in monetary totals.

**Suggested fix:** Sum integer `amount_minor` values first, then format the result for display. Add tests with many transactions and amounts that expose rounding errors.

## 6. [P1] Avoid hardcoding the Android emulator API address
**Decision: Block merge**

**Location:** `review/useTransactions.ts` — `API`.

`http://10.0.2.2:4010` is the standard Android emulator host alias. It does not work as a universal endpoint for iOS simulators and physical devices. The plain HTTP endpoint may also be blocked by device/network security settings.

**Suggested fix:** Make the API base URL configurable for the target environment, document device setup, and verify connectivity on the supported Android build and other intended test environments.

## 7. [P2] Use stable transaction keys
**Decision: Non-blocking, but fix before release**

**Location:** `review/TrackScreen.tsx` — `keyExtractor`.

Using the array index as the key means rows can retain the wrong identity when transactions are inserted, refreshed, or reordered. This can cause confusing row reuse during updates.

**Suggested fix:** Give transaction rows keys based on `t.id`; give month headers a distinct, stable key based on their month.

## 8. [P1] Complete the required Track interactions and monthly summary
**Decision: Block merge for this assignment**

**Location:** `review/TrackScreen.tsx` — `TrackScreen()` and `Row()`.

The screen currently displays a merchant and amount only. It does not implement merchant search or opening a transaction to see its details. The monthly header displays spending only and does not show earned amounts, despite the Track requirements.

**Suggested fix:** Add merchant search, a transaction-detail view, and monthly earned/spent totals. Verify that transfers between a user's own accounts are excluded from both spending and earning where the API identifies them.

---

## Verification still required

- Exercise initial load, pagination, refresh, and failed requests against the mock API.
- Verify no transaction is duplicated or lost during concurrent requests.
- Check monthly totals against the supplied checkpoint.
- Test Indian currency formatting and large monetary values.
- Verify behavior when the server is unavailable and when the app restarts.
- Run tests and record the actual results before approving.

**Final recommendation:** Request changes. The most urgent issues are preserving visible data on failure, safe pagination/state updates, and correct monetary presentation.
