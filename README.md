# Landon's Framework

A component-based WordPress theme using ACF blocks, Tailwind CSS, Webpack, and
Hygen for block scaffolding.

## Requirements

- WordPress 6.0+
- PHP 8.0+
- Advanced Custom Fields Pro (used to register and render custom blocks)
- Node.js and npm

Install the frontend dependencies once after cloning the theme:

```bash
npm install
```

Build production assets with:

```bash
npm run build
```

For development, start the watcher:

```bash
npm run watch
```

## Creating an ACF block with Hygen

Run the block generator from the theme root:

```bash
npm run block
```

Hygen will ask for:

1. A block name, such as `Logo Grid`.
2. Whether the block needs a stylesheet and/or JavaScript.
3. A Gutenberg icon. Choose **Choose from WordPress (Dashicons)** to enter any
   icon slug from the [Dashicons reference](https://developer.wordpress.org/resource/dashicons/).

Use a descriptive, human-readable name. Hygen converts it to a slug, so
`Logo Grid` becomes `logo-grid` and its files are created in
`blocks/logo-grid/`.

The generator creates a starter block template, ACF field-group definition,
stylesheet, and JavaScript module. It also adds the block registration to
`inc/blocks/register-blocks.php` and the block to the Gutenberg allowlist in
`inc/blocks/editor.php`.

### Required follow-up

1. Add the ACF fields you need to `blocks/logo-grid/logo-grid-acf.php`.
2. Build the block markup in `blocks/logo-grid/logo-grid.php`.
3. Add block-specific styles in `blocks/logo-grid/logo-grid.scss`.
4. If the block needs browser behavior, implement the default export in
   `blocks/logo-grid/logo-grid.js`.
5. Run `npm run build` and confirm the block is available in the **Landon
   Framework** Gutenberg category.

Each rendered block has a `data-block` attribute. The frontend automatically
loads the matching `blocks/<slug>/<slug>.js` module and calls its default
export with the rendered block element.

### Example JavaScript module

```js
export default function initLogoGrid(root) {
  if (!root) return;

  // Add behavior scoped to this one block instance.
}
```

### Notes

- Keep block slugs lowercase and hyphenated.
- Commit the generated source files and the rebuilt `dist/` assets together.
- The SCSS and JavaScript starter files are created only when selected in the
  generator prompts.

## Deleting a block

Run the deletion command from the theme root:

```bash
npm run delete-block
```

Enter the block's exact slug and review the removal preview before confirming.
The command deletes the block folder and its generated ACF include,
registration, and Gutenberg allowlist entry. It only works for blocks with the
matching Hygen deletion markers. Review `git diff` and run `npm run build`
afterward.
