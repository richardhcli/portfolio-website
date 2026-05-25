# Agent Guidelines for Richard Li Portfolio

A Jekyll portfolio site (forked from [al-folio](https://github.com/alshedivat/al-folio)) focused on **projects**, **blog**, **about**, and **CV** — not academic publications or teaching pages.

## prompt template:

```
@.github/agents/customize.agent.md
Follow the customization agent instructions. I want to:
- make a custom jekyll theme (color palete).

What is the best way to do this?
```

## Site structure

| URL          | Source                              | Notes                                                         |
| ------------ | ----------------------------------- | ------------------------------------------------------------- |
| `/`          | `_pages/home.md`                    | Featured project, latest posts, link to About — not in navbar |
| `/projects/` | `_pages/projects.md` + `_projects/` | Vertical **project log** timeline (animated rail, year TOC)   |
| `/blog/`     | `_pages/blog.md` + `_posts/`        | Technical writing; posts grouped by year (year TOC)           |
| `/about/`    | `_pages/about.md`                   | Intro, explore links, contact (orange nav highlight)          |
| CV (PDF)     | `_config.yml` → `cv_pdf`            | External PDF link (navbar, sidebar, search); no `/cv/` page   |

**Profile sidebar:** Left column on all pages when `profile_sidebar.enabled: true`. Configured in `_config.yml` under `profile_sidebar:` (photo, title, location, contact links). Global résumé PDF URL: top-level `cv_pdf` in `_config.yml`. Name comes from `first_name`, `middle_name`, `last_name`. Template: `_includes/profile_sidebar.liquid`.

**After editing `_config.yml`:** Restart Jekyll — see [TROUBLESHOOTING.md § Changes to \_config.yml not appearing locally](TROUBLESHOOTING.md#changes-to-_configyml-not-appearing-locally).

## Quick Links by Role

- **Are you a coding agent?** → Read [`.github/copilot-instructions.md`](.github/copilot-instructions.md) first (tech stack, build, CI/CD, common pitfalls & solutions)
- **Customizing the site?** → See [`.github/agents/customize.agent.md`](.github/agents/customize.agent.md)
- **Writing documentation?** → See [`.github/agents/docs.agent.md`](.github/agents/docs.agent.md)
- **Need setup/deployment help?** → [INSTALL.md](INSTALL.md)
- **Troubleshooting & FAQ?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Customization?** → [CUSTOMIZE.md](CUSTOMIZE.md)
- **Color theming?** → [THEMING.md](THEMING.md) (color pipeline)
- **Quick 5-min start?** → [QUICKSTART.md](QUICKSTART.md)

## Essential Commands

### Workflow 1 — Fast Dev (everyday)

```bash
docker compose up              # http://localhost:8080 — livereload
docker compose restart jekyll   # after _config.yml changes
docker compose down             # stop & free port
```

### Workflow 2 — Production Preview (before pushing CSS/JS/Liquid changes)

Mirrors GitHub Actions (PurgeCSS + CSS validation). Catches production-only bugs.

```bash
# Option A: inside Docker (no local Ruby/Node needed)
docker compose -f docker-compose.prod-preview.yml up
# http://localhost:8081

# Option B: if you have Ruby + Node locally
npm ci
npm run build:production
npm run preview:production   # http://localhost:8081
```

### Pre-Commit Checklist

1. **Format:** `npx prettier . --write`
2. **Dev verify:** `docker compose up` — check http://localhost:8080
3. **Production verify (if CSS/JS/Liquid changed):** run Workflow 2 above

## Critical Configuration

When modifying `_config.yml`, these **must be updated together**:

- **Personal site:** `url: https://username.github.io` + `baseurl:` (empty)
- **Project site:** `url: https://username.github.io` + `baseurl: /repo-name/`
- **YAML errors:** Quote strings with special characters: `title: "My: Cool Site"`

## Development Workflow

- **Git & Commits:** For commit message format and Git practices, see [.github/GIT_WORKFLOW.md](.github/GIT_WORKFLOW.md).
- **Code-Specific Instructions:** Consult the relevant instruction file for your code type.

| File Type                                     | Instruction File                                                                              |
| --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Markdown content (`_posts/`, `_pages/`, etc.) | [markdown-content.instructions.md](.github/instructions/markdown-content.instructions.md)     |
| YAML config (`_config.yml`, `_data/`)         | [yaml-configuration.instructions.md](.github/instructions/yaml-configuration.instructions.md) |
| Liquid templates (`_includes/`, `_layouts/`)  | [liquid-templates.instructions.md](.github/instructions/liquid-templates.instructions.md)     |
| JavaScript (`_scripts/`)                      | [javascript-scripts.instructions.md](.github/instructions/javascript-scripts.instructions.md) |

## Common Issues

For troubleshooting, see:

- [Common Pitfalls & Workarounds](.github/copilot-instructions.md#common-pitfalls--workarounds) in copilot-instructions.md
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions
- [GitHub Issues](https://github.com/alshedivat/al-folio/issues) to search for your specific problem.
