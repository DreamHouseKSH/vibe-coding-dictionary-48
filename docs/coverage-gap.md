# Coverage gap review · 2026-10-30

## Evidence and scope

Read the user-provided `붙여넣은 텍스트.txt` (79,060 bytes) and compared the catalog. Original IDs 1–48 remain byte-for-byte unchanged in terms.ts. Captured the current public homepage in a new cloud-browser tab before implementation. The supplied video summary is not a verified transcript; nothing in IDs49–56 is attributed to those videos. No monetization or unrelated service integration was added.

## Four practical quadrants

1. **Known and named:** 7 layout + 9 component + 8 visual + 24 motion examples. Preserve them rather than add renamed duplicates.
2. **Known needs, missing instruction:** input validation, recoverable waiting/empty/failure, pending vs committed changes. Group related states instead of padding the count.
3. **Familiar behavior, unfamiliar names:** autocomplete combobox, container queries, pagination. Explain how these differ from dropdown, viewport responsiveness and tabs.
4. **Gaps exposed through use:** drag-only input, late responses, rapid changes, IME, cancellation. These are test hypotheses, not a claim that all unknown unknowns were found.

## Bounded extension shortlist

| Priority | ID | Added | Existing related concept | Primary reference |
|---|---:|---|---|---|
| P0 |49|Form validation, error summary and field feedback|Modal, micro-interaction|[W3C forms notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)|
| P0 |50|Loading, empty, error, success, retry and cancellation|Skeleton, toast|[W3C status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)|
| P0 |51|Optimistic changes, rollback and undo|Micro-interaction|[React useOptimistic](https://react.dev/reference/react/useOptimistic)|
| P1 |52|Autocomplete combobox|Dropdown|[W3C APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)|
| P0 |53|Reordering with equivalent button controls|Cards, pointer effects|[W3C dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)|
| P1 |54|Container queries|Responsive/sidebar layouts|[MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)|
| P1 |55|Pagination and result ranges|Tabs, cards|[GOV.UK pagination](https://design-system.service.gov.uk/components/pagination/)|
| P1 |56|Debounce, IME and stale-response protection|Search/combobox|[React effect cleanup and requests](https://react.dev/reference/react/useEffect#fetching-data-with-effects)|

P0 prioritizes recovery and alternative input; P1 broadens frequent patterns without rebuilding the whole web platform. References were opened and verified during this review; explanations are original summaries, not transcript quotations. useOptimistic is a conceptual reference: the demo intentionally uses explicit local state to make pending/committed/rollback visible.

## Deferred rather than forgotten

Breadcrumbs, multi-step forms, virtualization, infinite scrolling and offline sync need meaningful navigation/data workloads. They are not part of this bounded update. Existing site-level empty search and skip link already existed; missing teaching cards are not evidence those site features were broken.

## Next discovery questions

Can a keyboard-only visitor finish the same task? Does cancellation really invalidate late results? Can composition-aware input avoid premature Korean searches? What happens when page size changes at the last page? Are the same actions reachable with a finger and a screen reader? Future real-device tests can reveal additional gaps; no complete accessibility or exhaustive coverage claim is made.
