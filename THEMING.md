# Theming Guide

This site uses the [Dracula Classic](https://draculatheme.com/spec) (dark) and [Alucard Classic](https://draculatheme.com/spec) (light) color schemes. All colors flow through a single pipeline so you only edit hex values in one place.

## Color pipeline

```text
_sass/_variables.scss     SCSS tokens ($dracula-pink, $alucard-bg, …)
        ↓
_sass/_themes.scss        CSS custom properties (--global-*, --pygments-*)
        ↓
Other _sass/ partials     var(--global-theme-color), var(--pygments-keyword), …
        ↓
assets/css/main.scss      Compiled to assets/css/main.css
```

**Rule of thumb:** change hex values in `_variables.scss` only. Map them to runtime variables in `_themes.scss` if you add new tokens. Use `var(...)` everywhere else — never hardcode hex in component styles.

## File reference

| File | Purpose |
| --- | --- |
| [`_sass/_variables.scss`](_sass/_variables.scss) | Single source of truth for palette hex values (Dracula, Alucard, functional UI colors) |
| [`_sass/_themes.scss`](_sass/_themes.scss) | Maps SCSS tokens to `--global-*` and `--pygments-*` CSS variables for light (`:root`) and dark (`html[data-theme="dark"]`) |
| [`_sass/_pygments.scss`](_sass/_pygments.scss) | Code block syntax highlighting; uses `var(--pygments-*)` only |
| [`_sass/_interactive-chrome.scss`](_sass/_interactive-chrome.scss) | Transient hover/click colors on titles and chrome |
| [`assets/css/main.scss`](assets/css/main.scss) | Entry point that `@use`s all partials |
| [`assets/js/theme.js`](assets/js/theme.js) | Light/dark toggle (stores preference in `localStorage.theme`) |

Legacy plain-CSS pygments files (`assets/css/jekyll-pygments-themes-*.css`) are **not used**. Syntax highlighting is bundled in `main.css` and switches automatically with dark mode.

## Light and dark modes

| Mode | Spec variant | Activated when |
| --- | --- | --- |
| Light | Alucard Classic | `html[data-theme="light"]` or default before JS runs on first visit |
| Dark | Dracula Classic | `html[data-theme="dark"]` |

First-time visitors default to **dark mode**. The navbar button toggles light ↔ dark only (no system/auto mode).

After editing `_config.yml` theme-related settings, restart Jekyll: `docker compose restart jekyll`.

## Common customizations

### Change an accent color site-wide

1. Edit the token in `_variables.scss` (e.g. `$dracula-pink: #ff79c6`).
2. Rebuild or refresh — `_themes.scss` already references that token.

### Change link / active color (blue)

Update `$dracula-functional-cyan` usage in `_themes.scss` (`--global-theme-color`) or change the functional cyan token itself.

### Change hover color (pink)

Update `$dracula-pink` / `$alucard-pink` in `_variables.scss`. Used as `--global-hover-color`.

### Change About nav pill (orange)

Tokens: `$alucard-orange` (light), `$dracula-orange` (dark) → `--global-nav-highlight-bg` in `_themes.scss`.

### Change code syntax colors

Token roles in `_themes.scss`:

| CSS variable | Dracula role | Example tokens |
| --- | --- | --- |
| `--pygments-keyword` | Pink | `if`, `class`, tags |
| `--pygments-function` | Green | function names |
| `--pygments-class` | Cyan | types, classes, regex |
| `--pygments-string` | Yellow | string literals |
| `--pygments-number` | Orange | numbers, constants |
| `--pygments-comment` | Comment gray | `//`, `#` |
| `--pygments-error` | Red | errors |
| `--pygments-builtin` | Purple (italic) | `self`, builtins |

Mapping from variables to roles is in `_themes.scss` under the `--pygments-*` block. Selector → role mapping is in `_pygments.scss`.

### Add a new UI color

1. Add `$my-color` to `_variables.scss`.
2. Add `--global-my-color: #{v.$my-color};` in both `:root` and `html[data-theme="dark"]` in `_themes.scss`.
3. Use `var(--global-my-color)` in the relevant partial.

## What not to edit

- **`assets/css/jekyll-pygments-themes-github.css`** / **`native.css`** — unused upstream leftovers; safe to ignore or delete.
- **Compiled `main.css`** — generated; edit SCSS sources instead.
- **Hex values in `_pygments.scss`** — use CSS variables only.

## Verify changes locally

```bash
docker compose up
```

Open `http://localhost:8080`, toggle light/dark, and check:

- Page background and text
- About nav pill (orange)
- A blog post or project with a fenced code block
- Hover/click on a page title (pink hover, cyan flash, blue active)

## Further reading

- [Dracula spec](https://draculatheme.com/spec)
- [CUSTOMIZE.md § Changing theme color](CUSTOMIZE.md#changing-theme-color) — brief overview
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — build and cache issues
