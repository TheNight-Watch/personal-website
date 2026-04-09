# Notion Backend

This site uses Notion as a content back office and GitHub as the deployment source.

## Content Model

The website has three content domains:

- `Home`
- `Projects`
- `Writing`

The Git-backed source files remain:

- `content/home/en.mdx`
- `content/home/zh.mdx`
- `content/projects/en/<slug>.mdx`
- `content/projects/zh/<slug>.mdx`
- `content/writing/en/<slug>.mdx`
- `content/writing/zh/<slug>.mdx`

## Notion Structure

Build the backend under one parent Notion page with four children:

- `Home`
- `Projects`
- `Writing`
- `Operations`

### Home

Use a single page, not a database.

Maintain these sections:

- `name`
- `tagline`
- `subtitle`
- `description`
- `experience`
- `awards`
- `eventsHosted`
- `techStack`

### Projects database

Each record maps to one project slug.

Recommended properties:

- `Name`
- `slug`
- `name_zh`
- `tagline_zh`
- `description_zh`
- `status`
- `category`
- `tags_zh`
- `features_zh`
- `challenges_zh`
- `tech_stack`
- `timeline`
- `role`
- `links`
- `github_url`
- `demo_url`
- `article_url`
- `order`
- `published`
- `sync_to_site`

The record body maps to the project detail-page body on the website.
The database properties map to the project card/frontmatter fields.

### Writing database

Each record maps to one article slug.

Recommended properties:

- `Name`
- `slug`
- `title_zh`
- `publication_zh`
- `date`
- `excerpt_zh`
- `tags_zh`
- `featured`
- `external`
- `external_url`
- `order`
- `published`
- `sync_to_site`

The record body maps to the article detail-page body on the website.
The database properties map to the writing card/frontmatter fields.

## Sync Rules

- Chinese is the source of truth.
- English is generated during sync.
- `id = slug` for `Projects` and `Writing`.
- `Projects.category` must stay `current` or `side`.
- `published = false` or `sync_to_site = false` means the content should not be synced.
- `Projects` and `Writing` must always produce both `zh` and `en` files.
- Full syncs should prune removed or unpublished slugs from the repo.
- Single-slug syncs should only touch the requested slug.

## Branch Flow

- `dev` -> preview deploy
- `main` -> production deploy

Recommended flow:

1. Edit content in Notion.
2. Sync content into this repo.
3. Run validation and `pnpm build`.
4. Push to `dev`.
5. Review the preview deployment.
6. Promote `dev` to `main`.

## Current implementation notes

- The local skill for this repo is `personal-site-content-updater`.
- The payload writer lives at:
  - `$HOME/.codex/skills/personal-site-content-updater/scripts/apply_site_payload.py`
- The publish helper lives at:
  - `$HOME/.codex/skills/personal-site-content-updater/scripts/publish_site_changes.sh`
- The validator lives at:
  - `$HOME/.codex/skills/personal-site-content-updater/scripts/validate_site_content.py`
