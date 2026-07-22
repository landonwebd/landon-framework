---
skip_if: "<%= withScss ? 'false' : 'true' %>"
to: <%= outDir %>/<%= name %>.scss
---
.block-<%= slug %> {
}
