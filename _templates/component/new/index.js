module.exports = {
  prompt: require("./prompt"),
  actions: (data) => {
    const name = data.name;

    if (!name) {
      throw new Error("Missing component name. Run: `hygen component new hero` or use the prompt.");
    }

    // DEBUG: Hygen will print this if actions are running
    console.log(`[hygen] generating component: ${name}`);

    return [
      {
        type: "add",
        path: `components/${name}/${name}.php`,
        templateFile: "component/new/templates/component.php.ejs",
      },
      {
        type: "add",
        path: `components/${name}/${name}.js`,
        templateFile: "component/new/templates/component.js.ejs",
      },
      {
        type: "add",
        path: `components/${name}/${name}.scss`,
        templateFile: "component/new/templates/component.scss.ejs",
      },
      {
        type: "add",
        path: `components/${name}/${name}-acf.php`,
        templateFile: "component/new/templates/component-acf.php.ejs",
      },
    ];
  },
};
