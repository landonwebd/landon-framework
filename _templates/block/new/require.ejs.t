---
inject: true
to: inc/blocks/register-blocks.php
before: "// HYGEN:REQUIRE_ONCE"
---
// HYGEN:BLOCK:REQUIRE <%= slug %>
require_once get_template_directory() . '/blocks/<%= slug %>/<%= slug %>-acf.php';
