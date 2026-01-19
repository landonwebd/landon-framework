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
      { type: "confirm", name: "withJs", message: "Generate JS file?", initial: false },
    ]);

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
    ];

    const { icon } = await prompter.prompt([
      {
        type: "select",
        name: "icon",
        message: "Block icon:",
        choices: iconChoices,
      },
    ]);

    // Normalize to the dashicon slug (the value we want in PHP)
    const iconValue = typeof icon === "string" ? icon : (icon?.name || icon?.value || "admin-generic");


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
    };
  },
};
