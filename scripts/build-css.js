const fs = require("fs");
const path = require("path");

const allColourScales = require("../dist/index");

const lightThemeVariables = [];
const darkThemeVariables = [];

Object.entries(allColourScales).forEach(([colourScaleName, scale]) => {
  if (colourScaleName.toLowerCase().includes("dark")) {
    if (colourScaleName.toLowerCase().includes("overlay")) {
      darkThemeVariables.push(`  --overlay: ${scale};\n`);
    } else {
      darkThemeVariables.push(
        Object.entries(scale)
          .map(([name, value]) => {
            const formattedColourScaleName = colourScaleName.replace(
              "Dark",
              ""
            );

            const variableName = `  --${formattedColourScaleName}-${
              name.split(formattedColourScaleName)[1]
            }: ${value};`;

            return variableName;
          })
          .join("\n")
      );
    }
  } else {
    if (colourScaleName.toLowerCase().includes("overlay")) {
      lightThemeVariables.push(`  --overlay: ${scale};\n`);
    } else {
      lightThemeVariables.push(
        Object.entries(scale)
          .map(([name, value]) => {
            const formattedColourScaleName = colourScaleName.replace(
              "Dark",
              ""
            );

            const variableName = `  --${formattedColourScaleName}-${
              name.split(formattedColourScaleName)[1]
            }: ${value};`;

            return variableName;
          })
          .join("\n")
      );
    }
  }
});

const scaleAsCSSFile = `:root {\n${lightThemeVariables.join(
  "\n\n"
)}\n}\n\n.dark {\n${darkThemeVariables.join("\n\n")}\n}`;

fs.writeFileSync(
  path.join(path.dirname(__dirname), "/dist/tokens.css"),
  scaleAsCSSFile
);
