// Lazy-load any component JS file that matches: components/<name>/<name>.js
const componentsContext = require.context(
  "../../components",
  true,
  /\/([a-z0-9-]+)\/\1\.js$/,
  "lazy"
);

function normalizeName(name) {
  return (name || "").trim();
}

export async function initComponents(root = document) {
  const nodes = Array.from(root.querySelectorAll("[data-component]"));

  // avoid initializing the same element twice
  const initialized = new WeakSet();

  for (const el of nodes) {
    if (initialized.has(el)) continue;

    const raw = el.getAttribute("data-component");
    if (!raw) continue;

    // allow multiple components: data-component="hero-banner something-else"
    const names = raw.split(/\s+/).map(normalizeName).filter(Boolean);

    for (const name of names) {
      const request = `./${name}/${name}.js`;

      try {
        const mod = await componentsContext(request);
        const init = mod?.default;

        if (typeof init === "function") {
          init(el);
        } else {
          // module exists but doesn't export a default init fn
          console.warn(`[component] ${name}: default export is not a function`);
        }
      } catch (err) {
        // module not found or failed to load
        console.warn(`[component] ${name}: failed to load (${request})`, err);
      }
    }

    initialized.add(el);
  }
}
