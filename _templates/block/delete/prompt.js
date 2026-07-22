const fs = require("fs");
const path = require("path");

const isValidSlug = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

const count = (content, value) => content.split(value).length - 1;

function assertMarker(content, marker, file) {
  if (count(content, marker) !== 1) {
    throw new Error(`Expected exactly one "${marker}" marker in ${file}.`);
  }
}

module.exports = {
  prompt: async ({ prompter }) => {
    const { slug } = await prompter.prompt([
      {
        type: "input",
        name: "slug",
        message: "Block slug to delete:",
        validate: (value) => isValidSlug(value)
          ? true
          : "Use a lowercase, hyphenated slug, such as logo-grid.",
      },
    ]);

    const blockDir = path.join(process.cwd(), "blocks", slug);
    const registerFile = path.join(process.cwd(), "inc/blocks/register-blocks.php");
    const editorFile = path.join(process.cwd(), "inc/blocks/editor.php");

    if (!fs.existsSync(blockDir)) {
      throw new Error(`Block folder not found: blocks/${slug}`);
    }

    const registerContent = fs.readFileSync(registerFile, "utf8");
    const editorContent = fs.readFileSync(editorFile, "utf8");

    assertMarker(registerContent, `// HYGEN:BLOCK:REQUIRE ${slug}`, "inc/blocks/register-blocks.php");
    assertMarker(registerContent, `// HYGEN:BLOCK:START ${slug}`, "inc/blocks/register-blocks.php");
    assertMarker(registerContent, `// HYGEN:BLOCK:END ${slug}`, "inc/blocks/register-blocks.php");
    assertMarker(editorContent, `// HYGEN:BLOCK:EDITOR ${slug}`, "inc/blocks/editor.php");

    console.log("\nThe following will be permanently removed:");
    console.log(`  - blocks/${slug}/`);
    console.log("  - ACF field-group include");
    console.log("  - ACF block registration");
    console.log("  - Gutenberg allowlist entry\n");

    const { confirmed } = await prompter.prompt([
      {
        type: "confirm",
        name: "confirmed",
        message: `Delete block "${slug}"?`,
        initial: false,
      },
    ]);

    if (!confirmed) {
      throw new Error("Deletion cancelled. No files were changed.");
    }

    return { slug };
  },
};
