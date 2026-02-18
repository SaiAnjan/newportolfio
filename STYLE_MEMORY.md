# Portfolio Style Memory

Use this as the source of truth for future updates to this website.

## Product Direction
- Keep the website clean, minimal, and portfolio-first.
- Use shadcn-style components and patterns, but do not copy external sites verbatim.
- Keep visual consistency across home, project pages, and GPT mode.

## Visual System
- Base style: shadcn neutral/stone family with clean light background by default.
- Global page background: `#f2f2f2` across pages.
- Hover actions: use white hover background across interactive UI.
- Hover motion: soft easing (roughly 220ms with a gentle cubic-bezier) instead of sudden state changes.
- Dark mode hover actions: use `hsl(0 0% 9%)`.
- Text selection highlight: `#E5E5E5`.
- Typography: normal web typography (no inline hard-coded custom font stacks).
- Corners: subtle/minimal border radius on cards and surfaces.
- Avoid heavy decoration; keep spacing intentional and readable.

## Theme Behavior
- Light/dark toggle should exist across pages (not only home).
- Toggle UI: icon-based, circular container, smooth/soft motion.
- Motion should feel calm, not snappy or harsh.

## Home Page Preferences
- Keep homepage minimal and text-focused.
- No large avatar in hero (user preferred removing it).
- Project listing remains clean and easy to scan.

## Writing/Blog Preferences
- Show both Substack and Medium posts in blog/writing feed.
- Use official-style source logos for Substack/Medium instead of text tags.
- Medium fallback behavior should still display known posts if RSS is unreliable.

## GPT Mode Preferences
- Match main site max-width alignment and centering.
- Remove side panel layout; keep interface clean.
- Assistant responses should be plain text (no chat bubble background).
- Links in responses should appear as blue links.
- Input area should sit at page bottom and remain usable on mobile.

## Case Study Media Behavior
- Support both single-image and carousel media blocks.
- Media should be clickable to open preview.
- Preview overlay should have black background with opacity.
- Single-image preview size should match carousel preview sizing.
- Close interaction should support `Esc`.
- For carousel previews, navigation should support arrows/keyboard where applicable.

## Share Actions
- Share actions should appear as a compact tooltip action group on hover of a tertiary "Share" trigger.
- Tooltip visual style: dark pill-style action group with breathing room between icons.
- Action set: LinkedIn, X, copy link, and native OS share where supported.

## Current Content Decisions
- New IAM case study project name: **EdgeNexus IAM**.
- Route: `/projects/edgesecure-iam`.
- Include walkthrough video: `/videos/iam1.mp4`.
- EdgeNexus IAM should appear at top of featured project ordering on home page.
