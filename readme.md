# WB Umbrella - technical test - code review

*Here you will find the summary of my review for the technical test of WP Umbrella.*

# BACKEND

## Code quality & Typing (Global Back-end)
### Absence of strong typing (interfaces/types):
Makes code difficult to read, maintain and secure over the long term.
Consequence: inconsistencies between the front and back, unexpected errors.
Solution: define TypeScript interfaces for all the manipulated objects (e.g. Project, Request, Response).

## API: /pages/projects and/pages/projects/:id
### Absence of HTTP method verification (GET, POST, etc.):
Risk of unwanted, unmanaged calls.
Solution: condition the treatment to the expected method.

### No query typing:
Can cause silent errors (ex: req.query.id not parsed).
Solution: explicit id parse with isNaN verification, and req/res typing.

### Parsing the id in the fetch function directly:
Risk of crash if the value is not a number.
Solution: isolate the upstream parsing + validity check.

## Redis & Workers (ping)
### Redis hardcoded login info:
Poor security/configuration practice.
Solution: store and use the .env file.

### Incorrect ping frequency:
Ping every 20 seconds instead of 2 minutes.
Correction: 
```ts
repeat: { pattern: "0 */2 * * * *" }
```

### No retry system in case of failure:
May cause silent losses of information.
Solution: implement retries + log or alert in case of multiple failures.

### Request not batched for the pings:
Looping calls can overload the server in case of a large number of projects.
Solution: batch processing (e.g. 100 per iteration) with Promise.allSettled.

# FRONTEND

## General Issues
### Absence of strong typing:
Makes the components fragile and difficult to test.
Solution: define interfaces (e.g. Project, Tag, ApiResponse) and use them in useState, props, fetch, etc.

### hardcoded API URLs:
Difficult to maintain / change between environments (dev/prod).
Solution: store the URLs in . env and create a config.ts.

### Fetch calls without try/catch or error handling:
Unstable behavior, no user feedback.
Solution: catch errors + UI display (toasts, alerts, etc.).

### No cache on fetch calls:
Strong performance impact (particularly for 20,000 projects).
Solution: use the Next cache system.

### No UI loading, nor bounce, nor suspense:
Bad UX, and client-side network overhead.
Solution: Solution: loading.tsx for the pages, suspense on heavy interactions

## Specific issues

### helper/getColorByTag
Returns blue for unknown tags instead of gray.
Use magic strings.
Proposed solution:
```ts
const tagColor: Record<string, string> = {
  blue: "#3B82F6",
  red: "#EF4444",
  yellow: "#F59E0B",
  default: "#9CA3AF", // gray
};

export const getColorByTag = (tag: string): string => {
  return tagColor[tag.toLowerCase()] ?? tagColor["default"];
};
```

### components/projects.tsx
Contains server logic with fetch: risk of client overload (20k projects).
No cutting of components, code not very maintainable, difficult to test.
No loading or error status.
Solutions:
Forward calls to actions.ts files, or even to the server part.
Create a dedicated ProjectItem.tsx component.
Manage loading, error, empty state in the UI.

### components/tags.tsx
Unnecessary import.
Not optimized: recalculation of color at each render.
Solution: Use React.memo/useMemo for getColorByTag.

### app/page.tsx
Fetch calls executed in components/projects.tsx
Solution:
Do the fetches on the server side

### app/projects/[id]/page.tsx
Absence of error handling for the fetch.
Hardcoded URL base.
Missing typing, requiring a useState with raw model.
Poor loading management.
Solutions:
Use interface to type `project`.
Add loading.tsx or Suspense for fallback.
Use a try/catch in the fetch.
