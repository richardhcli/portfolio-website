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

| URL | Source | Notes |
| --- | --- | --- |
| `/` | `_pages/home.md` | Featured project, latest posts, link to About — not in navbar |
| `/projects/` | `_pages/projects.md` + `_projects/` | Project gallery |
| `/blog/` | `_pages/blog.md` + `_posts/` | Technical writing |
| `/about/` | `_pages/about.md` | Extended bio (orange nav highlight) |
| `/cv/` | `_pages/cv.md` + `_data/cv.yml` | RenderCV / JSONResume |

**Profile sidebar:** Left column on all pages when `profile_sidebar.enabled: true`. Configured entirely in `_config.yml` under `profile_sidebar:` (photo, title, location, contact links). Name comes from `first_name`, `middle_name`, `last_name`. Template: `_includes/profile_sidebar.liquid`.

**After editing `_config.yml`:** Restart Jekyll — see [TROUBLESHOOTING.md § Changes to _config.yml not appearing locally](TROUBLESHOOTING.md#changes-to-_configyml-not-appearing-locally).

## Quick Links by Role

- **Are you a coding agent?** → Read [`.github/copilot-instructions.md`](.github/copilot-instructions.md) first (tech stack, build, CI/CD, common pitfalls & solutions)
- **Customizing the site?** → See [`.github/agents/customize.agent.md`](.github/agents/customize.agent.md)
- **Writing documentation?** → See [`.github/agents/docs.agent.md`](.github/agents/docs.agent.md)
- **Need setup/deployment help?** → [INSTALL.md](INSTALL.md)
- **Troubleshooting & FAQ?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Customization & theming?** → [CUSTOMIZE.md](CUSTOMIZE.md)
- **Quick 5-min start?** → [QUICKSTART.md](QUICKSTART.md)

## Essential Commands

### Local Development (Docker)

The recommended approach is using Docker.

```bash
# Initial setup & start dev server
docker compose pull && docker compose up
# Site runs at http://localhost:8080

# Rebuild after changing dependencies or Dockerfile
docker compose up --build

# Restart after _config.yml changes (profile sidebar, theme, url, etc.)
docker compose restart jekyll

# Stop containers and free port 8080
docker compose down
```

### Pre-Commit Checklist

Before every commit, you **must** run these steps:

1.  **Format Code:**
    ```bash
    # (First time only)
    npm install --save-dev prettier @shopify/prettier-plugin-liquid
    # Format all files
    npx prettier . --write
    ```
2.  **Build Locally & Verify:**

    ```bash
    # Rebuild the site
    docker compose up --build

    # Verify by visiting http://localhost:8080.
    # Check navigation, pages, images, and dark mode.
    ```

## Critical Configuration

When modifying `_config.yml`, these **must be updated together**:

- **Personal site:** `url: https://username.github.io` + `baseurl:` (empty)
- **Project site:** `url: https://username.github.io` + `baseurl: /repo-name/`
- **YAML errors:** Quote strings with special characters: `title: "My: Cool Site"`

## Development Workflow

- **Git & Commits:** For commit message format and Git practices, see [.github/GIT_WORKFLOW.md](.github/GIT_WORKFLOW.md).
- **Code-Specific Instructions:** Consult the relevant instruction file for your code type.

| File Type                                     | Instruction File                                                                                |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Markdown content (`_posts/`, `_pages/`, etc.) | [markdown-content.instructions.md](.github/instructions/markdown-content.instructions.md)       |
| YAML config (`_config.yml`, `_data/`)         | [yaml-configuration.instructions.md](.github/instructions/yaml-configuration.instructions.md)   |
| Liquid templates (`_includes/`, `_layouts/`)  | [liquid-templates.instructions.md](.github/instructions/liquid-templates.instructions.md)       |
| JavaScript (`_scripts/`)                      | [javascript-scripts.instructions.md](.github/instructions/javascript-scripts.instructions.md)   |

## Common Issues

For troubleshooting, see:

- [Common Pitfalls & Workarounds](.github/copilot-instructions.md#common-pitfalls--workarounds) in copilot-instructions.md
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions
- [GitHub Issues](https://github.com/alshedivat/al-folio/issues) to search for your specific problem.
