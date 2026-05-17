# Contributing to website-templates

Thanks for wanting to contribute! This repository collects small website templates and starter kits — to keep things consistent and easy to use we ask contributors to follow the structure and rules below.

If you are making non-template changes (docs, CI, tooling), the workflow is the same but you can skip the template checklist.

---

## Quick start

1. Fork the repository and create a feature branch from the default branch, e.g. `feat/add-<template-name>`.
2. Add your template following the required folder structure (see below).
3. Run the checklist locally (validate HTML/CSS/JS, open `index.html` in a browser, include screenshot/preview).
4. Push your branch and open a pull request describing the template and including the completed checklist.

---

## Required folder structure

All templates must live inside the `templates/` directory at the repo root. Each template gets its own folder named using kebab-case (lowercase, dashes, no spaces). Example:

templates/
  my-cool-template/
    index.html
    README.md
    meta.json
    preview.png
    assets/
      css/
        main.css
      js/
        main.js
      images/
        hero.jpg

Required files and their purpose:

- `templates/<template-name>/index.html` — The main entry file for the template. Must use only relative links for local assets.
- `templates/<template-name>/README.md` — Short README describing the template, supported browsers, any build steps, and usage instructions (how to open the demo locally). Include a short example of how to integrate the template.
- `templates/<template-name>/meta.json` — Minimal JSON metadata to help automations and the maintainer review. Example schema below.
- `templates/<template-name>/preview.png` — Small preview image (recommended dimensions: 1280×720 or 800×450). If you prefer WebP, add `preview.webp` in addition to `preview.png`.
- `templates/<template-name>/assets/` — A subfolder that contains `css/`, `js/`, and `images/` or similarly organized asset folders. Keep generated/minified output and source files together in clearly labeled files (e.g., `main.css` and `main.min.css`).

Optional but recommended:

- `templates/<template-name>/LICENSE` — If your template is under a different license than the repository, include a copy here and make sure it's compatible.
- `templates/<template-name>/demo/` — A self-contained demo directory if the template requires build steps or routing (e.g., `demo/index.html`).
- `templates/<template-name>/src/` — Source files (Sass, TypeScript) if you include prebuilt assets; also include the compiled `assets/` files alongside.

meta.json example (required fields):

{
  "name": "My Cool Template",
  "slug": "my-cool-template",
  "description": "A brief one-line description",
  "author": "Your Name",
  "version": "1.0.0",
  "tags": ["landing", "responsive", "one-page"]
}

Make sure `slug` matches the folder name.

---

## Naming conventions and file rules

- Template folder: kebab-case (`my-template-name`).
- Filenames: use lowercase and dashes where appropriate. Avoid spaces.
- Use only relative paths to assets inside the template so users can download and open locally.
- External resources (CDN-hosted fonts, icons) are allowed but document them in the template README and include fallback instructions.
- Do not include tracking, analytics, or any third-party code that collects user data without explicit disclosure in the README.

---

## Quality checklist (must be completed before opening a PR)

- [ ] The template lives in `templates/<kebab-case-name>/` and `meta.json` slug matches the folder name.
- [ ] `index.html` opens locally and displays correctly (no 404 assets).
- [ ] README.md included and explains usage, build steps (if any), and license.
- [ ] Accessibility basics: images have `alt` text, semantic headings used, and keyboard navigability for interactive controls.
- [ ] Responsive: layout works on narrow/mobile widths (<= 480px) and on desktop.
- [ ] No inline secrets, API keys, or tracking code.
- [ ] Preview image included (`preview.png` or `preview.webp`) and referenced in README.
- [ ] Images optimized (reasonable file size) and CSS/JS not unnecessarily bloated.
- [ ] If you included third-party assets, document their sources and licenses.
- [ ] If the template contains prebuilt/minified files, include the unminified source or explain how to rebuild.

Include this checklist in your PR description (you can copy-paste and tick items).

---

## Pull request guidelines

- PR title format: `Add template: <template-name>` or `Fix template: <template-name>`.
- In the PR description include:
  - A short summary of the template and intended use-cases.
  - A preview image (paste or link) and steps to view locally.
  - The completed checklist above.
  - Notes about any external dependencies or build steps.
- If your change updates a shared index or listing file, update it in the same PR.

Maintainers will try to review within a few days; be responsive to feedback and push follow-up commits to the same PR.

---

## Licensing

All contributions should be compatible with the repository license. If your template uses a different license, include a `LICENSE` file in the template folder and mention it in the README and PR.

If you are contributing original work, including a short license header in `README.md` and supplying a `LICENSE` in the repo root (if not present) helps avoid confusion.

---

## Security & sensitive data

Do not include passwords, API keys, or other secrets in your contribution. If you discover a security issue, please open a private issue or contact a maintainer directly — do NOT open a public PR with sensitive information.

---

## Reporting issues and discussion

- Open an issue for bugs or feature requests; include a minimal reproduction where possible.
- For discussion about a new template idea, open an issue first to avoid duplicating existing work.

---

## Linting, validation and helpful tools

- Validate HTML: https://validator.w3.org/
- Test responsive layouts using your browser devtools (device toolbar).
- Optional: run CSS/HTML linters or Prettier/ESLint if you use JS.

---

## PR template (suggested copy)

Title: Add template: my-cool-template

Description:

- Short description: ...
- Preview image: `templates/my-cool-template/preview.png`
- How to open locally: open `templates/my-cool-template/index.html` in a browser

Checklist:
- [ ] Template folder and files present
- [ ] meta.json slug matches folder name
- [ ] README included and usage documented
- [ ] Accessibility and responsive checks done
- [ ] License and third-party attributions included

---

Thanks for contributing — we look forward to seeing your templates! If you have any questions before starting, open an issue and tag `maintainers`.
