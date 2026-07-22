const fs = require("fs");
const path = require("path");

const slug = process.argv[2];
const isValidSlug = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || "");

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function count(content, value) {
  return content.split(value).length - 1;
}

function removeMarkedLine(content, marker, nextLinePattern, file) {
  if (count(content, marker) !== 1) {
    throw new Error(`Expected exactly one "${marker}" marker in ${file}.`);
  }

  const pattern = new RegExp(
    `^[\\t ]*${escapeRegExp(marker)}\\r?\\n${nextLinePattern.source}\\r?\\n?`,
    "m"
  );

  if (!pattern.test(content)) {
    throw new Error(`The entry following "${marker}" in ${file} is not what was expected.`);
  }

  return content.replace(pattern, "");
}

function removeMarkedSection(content, startMarker, endMarker, file) {
  if (count(content, startMarker) !== 1 || count(content, endMarker) !== 1) {
    throw new Error(`Expected one matching start and end marker for ${file}.`);
  }

  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker, start);

  if (end < start) {
    throw new Error(`The end marker appears before the start marker in ${file}.`);
  }

  const startLine = content.lastIndexOf("\n", start) + 1;
  const endLine = content.indexOf("\n", end);
  const sectionEnd = endLine === -1 ? content.length : endLine + 1;

  return content.slice(0, startLine) + content.slice(sectionEnd);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  if (!isValidSlug(slug)) {
    fail("Provide a lowercase, hyphenated block slug, such as logo-grid.");
  }

  const root = process.cwd();
  const blockDir = path.join(root, "blocks", slug);
  const registerFile = path.join(root, "inc/blocks/register-blocks.php");
  const editorFile = path.join(root, "inc/blocks/editor.php");

  if (!fs.existsSync(blockDir) || !fs.statSync(blockDir).isDirectory()) {
    fail(`Block folder not found: blocks/${slug}`);
  }

  try {
    const requireMarker = `// HYGEN:BLOCK:REQUIRE ${slug}`;
    const startMarker = `// HYGEN:BLOCK:START ${slug}`;
    const endMarker = `// HYGEN:BLOCK:END ${slug}`;
    const editorMarker = `// HYGEN:BLOCK:EDITOR ${slug}`;

    let registerContent = fs.readFileSync(registerFile, "utf8");
    let editorContent = fs.readFileSync(editorFile, "utf8");

    registerContent = removeMarkedLine(
      registerContent,
      requireMarker,
      new RegExp(`^[\\t ]*require_once get_template_directory\\(\\) \\. '/blocks/${escapeRegExp(slug)}/${escapeRegExp(slug)}-acf\\.php';`),
      "inc/blocks/register-blocks.php"
    );
    registerContent = removeMarkedSection(registerContent, startMarker, endMarker, "inc/blocks/register-blocks.php");
    editorContent = removeMarkedLine(
      editorContent,
      editorMarker,
      new RegExp(`^[\\t ]*'acf/${escapeRegExp(slug)}',`),
      "inc/blocks/editor.php"
    );

    fs.writeFileSync(registerFile, registerContent);
    fs.writeFileSync(editorFile, editorContent);
    fs.rmSync(blockDir, { recursive: true, force: false });

    console.log(`Deleted block "${slug}".`);
    console.log("Review the changes with git diff, then run npm run build.");
  } catch (error) {
    fail(error.message);
  }
}

main();
