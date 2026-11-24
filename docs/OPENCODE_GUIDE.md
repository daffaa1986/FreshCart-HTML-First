# OpenCode workflow for FreshCart

1. Open the repository root (`freshcart/`) in your editor/terminal.
2. Start OpenCode and let it read `AGENTS.md` and this document.
3. Ask for an audit before authorizing broad changes.
4. Work one feature at a time and review the changed files.
5. Run `cd frontend && npm run build` after changes.

## First audit prompt

```text
Read AGENTS.md, README.md and docs/architecture.md.
Inspect the current FreshCart project. Do not edit files yet.
Report the architecture, functional features, demo features, placeholders,
risks and recommended next implementation steps. Preserve HTML First +
Selective React and do not convert complete HTML pages into JSX.
```

## Feature prompt: make the catalog functional

```text
Implement and test the Product Listing interactions using the existing
React island in #product-catalog-root. Preserve the Google Stitch design.
Make category, price, certification, stock, rating, sorting and pagination
filters work together. Use the shared product data and cart store. Do not
rewrite the whole HTML page. Run npm run build and report any remaining gaps.
```

## Safety and review
- Commit a Git checkpoint before large refactors.
- Review diffs before accepting edits.
- Do not allow destructive file operations without explicit approval.
- Never put API keys or database passwords into source files.
- Do not treat sample prices, stock, reviews or marketing claims as real business data.
