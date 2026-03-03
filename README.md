# Cypherpunk Jekyll Theme

A dark terminal-aesthetic Jekyll theme with CRT scan lines, a live Bitcoin HUD, and green phosphor styling.

Built for [757btc.org](https://757btc.org).

## Features

- Dark terminal aesthetic (#0a0a0a bg, #00ff41 green phosphor)
- CRT scan line animation
- Hero image with Bitcoin HUD overlay (live data from mempool.space)
- Sticky header with terminal prompt styling
- Mobile responsive
- Post listing with hover glow effects
- Author display with avatars
- Terminal-styled 404

## Usage

### As a remote theme (GitHub Pages)

In your `_config.yml`:

```yaml
remote_theme: wattbotsworth/cypherpunk-jekyll-theme
```

### As a gem theme

Add to your `Gemfile`:

```ruby
gem "cypherpunk-jekyll-theme", github: "wattbotsworth/cypherpunk-jekyll-theme"
```

In your `_config.yml`:

```yaml
theme: cypherpunk-jekyll-theme
```

## Required Data Files

The theme expects these in your site's `_data/` directory:

**`_data/menu.yml`** — Navigation items:
```yaml
- title: Home
  url: /
  position: 1
- title: About
  url: /about/
  position: 2
```

**`_data/authors.yml`** — Post authors:
```yaml
cnix:
  name: cnix
  avatar: "https://example.com/avatar.png"
  url: "https://example.com"
```

## Configuration

Optional `_config.yml` settings used by the theme:

```yaml
title: Your Site
email: you@example.com
description: >-
  Your site description
excerpt: true           # Show excerpts on home page
post_navigation: true   # Show prev/next on posts

# Hero image (defaults to theme's generic cypherpunk image if not set)
header_feature_image: /assets/img/your-hero.jpeg

# Favicon
favicon: /favicon.ico

# Bitcoin HUD — mempool.space API endpoint
# Defaults to the public mempool.space instance.
# Point this at your own mempool instance if you run one.
mempool_api: https://mempool.space/api
```

## Bitcoin HUD

The homepage hero includes a live Bitcoin network data overlay showing block height, price, and fee rates. Data is fetched client-side from the [mempool.space API](https://mempool.space/docs/api) every 60 seconds.

To use your own mempool instance, set `mempool_api` in `_config.yml`:

```yaml
mempool_api: https://your-mempool-instance.com/api
```

If the API is unreachable, the HUD gracefully degrades to `---` placeholders.

## License

MIT
