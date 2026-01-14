---
description: You will use this for do everything
---

AI OPERATING PROCEDURE
Professional Application Development (Linear Structure)
PHASE 0 — Operating Principles (Always Active)

0.1 Prioritize clarity over cleverness
0.2 Prefer simple, explicit solutions over abstract or generic ones
0.3 Optimize for maintainability and readability
0.4 Never introduce complexity without a documented reason
0.5 Treat the application as a real product, not a demo
0.6 Assume the code will be read by senior engineers

PHASE 1 — Problem & Product Definition

1.1 Clearly define the problem the application solves
1.2 Define the target user and their core need
1.3 State the primary value proposition in one sentence
1.4 Define what success means for the MVP
1.5 Explicitly list non-goals to control scope
1.6 Validate that the problem can be solved with a small, focused product

Output required:
– Product summary
– MVP scope definition

PHASE 2 — Domain Modeling

2.1 Identify the core domain entities
2.2 Define responsibilities and boundaries for each entity
2.3 Define valid states and transitions
2.4 Identify invariants (rules that must always hold)
2.5 Validate that the model is minimal and not over-abstracted

Output required:
– Domain model description
– State transition definitions

PHASE 3 — User Experience & Flow Design

3.1 Define the minimal set of screens/views
3.2 Define the primary user flow (happy path)
3.3 Define secondary and edge flows
3.4 Explicitly define empty, loading, and error states
3.5 Ensure every screen has a single clear purpose

Output required:
– Screen list
– User flow description

PHASE 4 — Technical Architecture

4.1 Choose the simplest architecture that supports the MVP
4.2 Separate concerns explicitly:

UI

State

Business logic

Persistence

4.3 Define data flow direction clearly
4.4 Decide persistence strategy and justify it
4.5 Avoid premature abstraction or over-engineering

Output required:
– Architecture overview
– Data flow explanation

PHASE 5 — Project Structure & Conventions

5.1 Define a clear folder/module structure
5.2 Establish naming conventions
5.3 Define file responsibility rules
5.4 Ensure structure scales without refactoring immediately
5.5 Validate that a new developer could understand it quickly

Output required:
– Project structure
– Conventions summary

PHASE 6 — Incremental Implementation Strategy

6.1 Implement features in vertical slices, not layers
6.2 Start with the simplest functional version
6.3 Commit working code only
6.4 Avoid partial or dead code
6.5 Prefer correctness over completeness

Output required:
– Implementation order

PHASE 7 — State Management Discipline

7.1 Identify global vs local state
7.2 Minimize shared state
7.3 Make state transitions explicit
7.4 Avoid hidden or implicit mutations
7.5 Ensure state is always inspectable and predictable

Output required:
– State map

PHASE 8 — Error Handling & Resilience

8.1 Identify failure points
8.2 Handle errors at the correct layer
8.3 Provide actionable error messages
8.4 Never fail silently
8.5 Ensure the UI can always recover gracefully

Output required:
– Error handling strategy

PHASE 9 — Code Quality Enforcement

9.1 Maintain small, focused functions
9.2 Avoid deep nesting
9.3 Prefer pure functions where possible
9.4 Remove duplication aggressively
9.5 Keep logic close to where it is used

Output required:
– Code quality checklist

PHASE 10 — Testing Strategy (Proportional)

10.1 Identify critical logic paths
10.2 Test business rules first
10.3 Test edge cases deliberately
10.4 Avoid testing implementation details
10.5 Keep tests readable and intention-driven

Output required:
– Test plan

PHASE 11 — Review & Validation

11.1 Re-evaluate original goals
11.2 Validate feature completeness
11.3 Validate UX consistency
11.4 Validate error states
11.5 Validate maintainability

Output required:
– Review summary

PHASE 12 — Portfolio Readiness

12.1 Ensure the app tells a clear story
12.2 Ensure decisions are visible and intentional
12.3 Remove experimental or unused code
12.4 Add minimal documentation (README)
12.5 Ensure the project feels “finished”, not abandoned

Output required:
– Portfolio checklist

FINAL RULE (Non-Negotiable)

At no point should the AI optimize for speed over quality.
Correctness, clarity, and coherence always take priority.