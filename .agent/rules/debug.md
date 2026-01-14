---
trigger: always_on
---

These rules describe how a good software engineer iteratively improves an application, especially one intended for a portfolio.

A. Product Rules (Before Writing Code)

Define one objective per iteration
Every change must pursue a clear goal (e.g., “improve decision creation flow”, “reduce errors”), never a vague “improve the app”.

Keep scope minimal
If a change does not directly improve value or fix a real issue, postpone it.

Prioritize impact over complexity
Choose changes that deliver visible value with the least risk.

Document technical decisions
Briefly record what was decided, why, and what trade-offs were accepted.

B. Engineering Rules (How to Implement Changes Safely)

Make small, reviewable changes
Small iterations reduce risk and simplify debugging and review.

Understand before modifying
Read existing logic, data flow, inputs, outputs, and dependencies before touching code.

Design before implementation
Define data models, function contracts, and responsibilities first.

Avoid duplication
If logic appears more than once, extract it into a reusable unit.

Maintain high cohesion
Each module/component should have one clear responsibility.

Use intention-revealing names
Names must describe purpose, not implementation details.

Test proportionally to risk

Pure logic → unit tests

Critical flows → integration tests

UI → minimal smoke tests
Avoid over-testing an MVP, but protect what breaks the product.

C. Quality Rules (Pre-Completion Checklist)

Correctness
Does it behave as expected in normal and edge cases?

Simplicity
If the code is hard to understand, simplify it.

Explicit states
Handle loading, empty, and error states explicitly.

Basic observability
Logs must be useful and actionable, not noise.

Baseline performance
Avoid unnecessary re-renders, heavy computations in UI, or unbounded lists.

Basic security
Validate inputs and never blindly trust external data—even in local apps.

D. Versioning and Delivery Rules

Version changes intentionally

Breaking changes → major

New features → minor

Fixes → patch

Minimal release notes

What changed

What was fixed

What is still pending

Rollback awareness
Every change should be easy to revert; this is why changes stay small.

PART 2 — Rules for Error Detection and Code Fixing (Debugging Protocol)

These rules are written as internal instructions the AI must always follow when detecting or fixing errors.

A. Rule Zero: Never Guess

Do not assume causes without evidence
Always rely on error messages, stack traces, reproduction steps, or diffs.

If information is missing, propose hypotheses clearly labeled as such and explain how to validate them.

B. Reproduction and Isolation

Reproduce the issue
If reproduction is impossible, request:

exact error message

file(s) involved

recent changes

steps to reproduce

Isolate the smallest failing case
Reduce inputs and scope until the failure is minimal.

Classify the error

Compilation / typing / lint

Runtime exception

Logical bug

Performance issue

UI or state inconsistency

C. Evidence-First Debugging

Read the full error output
Message, stack trace, file, and line number.

Find the real origin
The crashing line is often a symptom, not the root cause.

Validate assumptions
Use logs, breakpoints, or state inspection to confirm behavior.

D. Fix Strategy (Mandatory Order)

Fix crashes first
Runtime exceptions always take priority.

Fix data/state integrity issues next
Null values, undefined access, race conditions.

Fix logic errors
Conditions, calculations, or incorrect flows.

Refactor last
Only if the fix leaves the code fragile or unclear.

E. Safe Fix Rule

Every fix must include:

Root cause explanation

The actual fix

Minimal verification step (manual or automated)

Risk assessment (what could break)

Never mix bug fixes with new features

Prefer the smallest fix that solves the root cause
Avoid cosmetic or superficial patches.

F. Post-Fix Review Checklist

Did the bug reproduce before and disappear after?

Are new edge cases introduced?

Was performance affected?

Are errors/logs now more actionable?

Is readability preserved or improved?

G. Communication Rules (Critical for AI Responses)

Always respond using this structure:

What is failing (symptom)

Why it fails (root cause)

How it was confirmed (evidence)

Proposed fix

How to verify the fix

If multiple causes are possible:

List them

Rank by probability

Explain how to rule each one out