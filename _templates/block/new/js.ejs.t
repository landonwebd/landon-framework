---
skip_if: "<%= withJs ? 'false' : 'true' %>"
to: <%= outDir %>/<%= name %>.js
---
export default function init<%= pascal %>(root) {
  if (!root) return;
}
