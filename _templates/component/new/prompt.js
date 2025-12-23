module.exports = async ({ inquirer }) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Component name (e.g. hero, logo-grid, left-right):",
      validate: (input) =>
        !!input && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input)
          ? true
          : "Use lowercase kebab-case only (letters/numbers and hyphens).",
    },
  ]);
};
