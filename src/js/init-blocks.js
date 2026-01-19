// Lazy-load any block JS file that matches: blocks/<name>/<name>.js
const blocksContext = require.context(
  "../../blocks",
  true,
  /\/([a-z0-9-]+)\/\1\.js$/,
  "lazy"
);

function normalizeName(name) {
  return (name || "").trim();
}

export async function initBlocks(root = document) {
  const nodes = Array.from(root.querySelectorAll("[data-block]"));

  const initialized = new WeakSet();

  for (const el of nodes) {
    if (initialized.has(el)) continue;

    const raw = el.getAttribute("data-block");
    if (!raw) continue;

    const names = raw.split(/\s+/).map(normalizeName).filter(Boolean);

    for (const name of names) {
      const request = `./${name}/${name}.js`;

      try {
        const mod = await blocksContext(request);
        const init = mod?.default;

        if (typeof init === "function") {
          init(el);
        } else {
          console.warn(`[block] ${name}: default export is not a function`);
        }
      } catch (err) {
        console.warn(`[block] ${name}: failed to load (${request})`, err);
      }
    }

    initialized.add(el);
  }
}
