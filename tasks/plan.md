# Implementation Plan: Living Illustrated Portfolio

## Overview
Turn the current flattened poster hero into a layered, interactive studio scene while preserving its hand-painted cartoon identity. Generate a cohesive set of new portfolio artworks, animate the illustrated character with a blink and restrained body motion, float the real HTML portfolio title, unify the navigation with the scene, and make the CD visibly active without sacrificing accessibility.

## Architecture Decisions
- Keep the page composition server-rendered; isolate pointer/parallax state in one focused client-side hero scene component.
- Replace the single hero screenshot with semantic HTML text, CSS doodles, and two aligned transparent character frames: eyes open and eyes closed.
- Use CSS custom properties for pointer parallax so React does not rerender on every pointer movement.
- Generate project assets from the supplied illustration as a style reference and import them statically through `next/image`.
- Run ambient motion only when motion is allowed; `prefers-reduced-motion` removes floating, blinking, marquee, parallax, and disc rotation.

## Visual System
- Keep ink `#171515`, paper `#fff2df`, cobalt `#1762dc`, yellow `#ffc62f`, green `#087947`, and coral `#ff704f`.
- Signature: a living illustrated workbench where Kunal blinks, leans with pointer movement, and writes beneath floating `PORTFOLIO` letter tiles.
- Generated art language: editorial comic illustration, visible ink contour, dry-brush grain, halftone texture, imperfect paper edges, saturated cobalt/yellow/coral/green, no photorealistic mockup lighting.

## Task List

### Phase 1: Layered Asset Foundation
- Task 1: Generate aligned open-eye and closed-eye transparent hero character frames.
- Task 2: Generate a cohesive three-image project set and supporting studio artwork.

### Checkpoint: Assets
- Every selected generated image is saved under `public/images/` and visually matches the hero palette.

### Phase 2: Living Hero
- Task 3: Build the semantic layered hero with floating title, blink, body drift, pointer parallax, and real CTA.
- Task 4: Restyle the navigation as part of the illustrated scene at desktop and mobile sizes.

### Checkpoint: Hero
- The person moves and blinks, the title floats independently, navigation remains usable, and reduced motion produces a stable composition.

### Phase 3: Cohesive Portfolio
- Task 5: Replace old project visuals and about/playground art with the generated illustrated set.
- Task 6: Make the CD rotate as a visible ambient studio object, with pause/control behavior appropriate to pointer and reduced-motion contexts.

### Phase 4: Verification
- Task 7: Verify keyboard focus, mobile menu, motion preferences, responsive layouts, lint, TypeScript, and production build.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Generated blink frame drifts from the open pose | High | Use the open frame as an edit target and require that only the eyelids change. |
| Motion becomes noisy or harms readability | High | Concentrate motion in the hero and CD, keep copy still, use small transform ranges, and remove it for reduced motion. |
| Transparent cutout edges are imperfect | Medium | Inspect at full size and place against the cobalt field with an ink-shadow treatment. |
| Mobile crop loses the character or CTA | Medium | Use a dedicated mobile composition and test at 320px, 500px, 768px, and desktop widths. |

## Open Questions
- None. The user explicitly approved replacing the flattened hero and old project imagery while preserving the cartoon direction.
