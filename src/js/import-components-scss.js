// Automatically import all component SCSS files
const req = require.context(
  "../../components",
  true,
  /\/[a-z0-9-]+\.scss$/
);

req.keys().forEach(req);
