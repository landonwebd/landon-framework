function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    // turn underscores/spaces into dashes
    .replace(/[_\s]+/g, "-")
    // remove anything not alphanumeric or dash
    .replace(/[^a-z0-9-]/g, "")
    // collapse multiple dashes
    .replace(/-+/g, "-")
    // trim dashes
    .replace(/^-|-$/g, "");
}

function toTitle(input) {
  const s = String(input || "").trim();
  if (!s) return "";
  // preserve user’s casing-ish, but normalize whitespace
  return s.replace(/\s+/g, " ");
}

function toPascalFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toSnakeFromSlug(slug) {
  return slug.replace(/-/g, "_");
}

module.exports = {
  prompt: async ({ prompter }) => {
    const { rawName } = await prompter.prompt([
      {
        type: "input",
        name: "rawName",
        message: 'Block name (e.g. "Rich Text", "Logo Grid", "Hero"):',
      },
    ]);

    const title = toTitle(rawName);
    const slug = slugify(rawName);

    if (!slug) {
      throw new Error("Block name produced an empty slug. Try a different name.");
    }

    const { withScss, withJs } = await prompter.prompt([
      { type: "confirm", name: "withScss", message: "Generate SCSS file?", initial: true },
      { type: "confirm", name: "withJs", message: "Generate JS file?", initial: true },
    ]);

    const dashiconsUrl = "https://developer.wordpress.org/resource/dashicons/";
    const customDashiconChoice = "__custom_dashicon__";

    const iconChoices = [
      { name: "cover-image", message: "Cover" },
      { name: "text", message: "Text" },
      { name: "heading", message: "Heading" },
      { name: "format-image", message: "Image" },
      { name: "format-gallery", message: "Gallery" },
      { name: "columns", message: "Columns" },
      { name: "button", message: "Buttons" },
      { name: "star-filled", message: "Star" },
      { name: "megaphone", message: "Megaphone" },
      { name: "layout", message: "Layout" },
      { name: "slides", message: "Slides" },
      { name: "admin-generic", message: "Generic" },
      { name: customDashiconChoice, message: "Choose from WordPress (Dashicons)" },
    ];

    const { icon } = await prompter.prompt([
      {
        type: "select",
        name: "icon",
        message: "Block icon:",
        choices: iconChoices,
      },
    ]);

    // Normalize to the dashicon slug (the value we want in PHP).
    let iconValue = typeof icon === "string" ? icon : (icon?.name || icon?.value || "admin-generic");

    if (iconValue === customDashiconChoice) {
      const { customDashicon } = await prompter.prompt([
        {
          type: "input",
          name: "customDashicon",
          message: `Dashicon slug (browse ${dashiconsUrl}):`,
          validate: (value) => {
            const normalized = slugify(value).replace(/^dashicons-/, "");
            return normalized ? true : "Enter a Dashicon slug, such as admin-site.";
          },
        },
      ]);

      // Accept either a slug (admin-site) or CSS class name (dashicons-admin-site).
      iconValue = slugify(customDashicon).replace(/^dashicons-/, "");
    }

    const { supportsAnchor, alignment, usesInnerBlocks } = await prompter.prompt([
      {
        type: "confirm",
        name: "supportsAnchor",
        message: "Enable a custom HTML anchor?",
        initial: true,
      },
      {
        type: "select",
        name: "alignment",
        message: "Block alignment options:",
        choices: [
          { name: "none", message: "None" },
          { name: "all", message: "All (left, center, right, wide, full)" },
          { name: "wide-full", message: "Wide and full only" },
        ],
      },
      {
        type: "confirm",
        name: "usesInnerBlocks",
        message: "Allow nested blocks (InnerBlocks)?",
        initial: false,
      },
    ]);

    const { starterField } = await prompter.prompt([
      {
        type: "select",
        name: "starterField",
        message: "Starter ACF field:",
        choices: [
          { name: "none", message: "None (empty field group)" },
          { name: "heading", message: "Heading" },
          { name: "rich-text", message: "Rich text" },
          { name: "image", message: "Image" },
          { name: "repeater", message: "Repeater" },
        ],
      },
    ]);

    return {
      // Human readable
      title,           // "Rich Text"

      // Machine readable
      name: slug,      // keep compatibility: templates that use <%= name %> still work
      slug,            // "rich-text"
      pascal: toPascalFromSlug(slug), // "RichText"
      snake: toSnakeFromSlug(slug),   // "rich_text"

      // Output folder
      outDir: `blocks/${slug}`,

      withScss,
      withJs,
      icon: iconValue,
      supportsAnchor,
      alignment,
      usesInnerBlocks,
      starterField,
    };
  },
};
