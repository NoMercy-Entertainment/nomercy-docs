# Docs v2 rebuild — content ledger (branch docs/v2-rebuild)
Contract: DOCS-CONTRACT.md. Backup tag: docs-content-backup-f353481. His CLAUDE.md WIP: stash stoney-claude-md-wip.
Engine (cherry-picked, verified): PlayerExample, remark-snippet, check-docs, media.ts, playwright gate, dev fix.
Arc per library (identical order): 1 introduction, 2 quickstart, 3 tour/*, 4 build/*, 5 recipes/*, 6 plugins-adapters/*, 7 reference/*.
Altitude: core = compose-your-own-player (under the hood); video/music = consumer.

## Status
- [~] core content: intro+quickstart+tour DONE (baseUrl mandate, core rc.21). Pending: build, recipes, plugins-adapters, reference
- [ ] video content
- [ ] music content
- [ ] final cross-library verify (check-docs + build + nav + a11y)
checkpoint e69b6e9: core intro+quickstart + baseUrl fix (core republished rc.21, join keeps base path)
checkpoint (uncommitted): core tour/* (10 pages: lifecycle, event-bus, transport, time-and-state, queue,
plugin-base, adapters, i18n, cue-parsers, errors) + 11 new src/examples/tour-*.ts + tour-player.ts shared
scaffold + nav-structure.ts Guided Tour group + check-docs.mjs ARC_SECTIONS 'tour' prefix fix
