import StyleDictionary from 'style-dictionary';

// Register a custom format to wrap variables in a selector
StyleDictionary.registerFormat({
  name: 'css/dark-theme',
  format: function({ dictionary, options }) {
    return `${options.selector} {\n` +
      dictionary.allTokens.map(prop => `  --${prop.name}: ${prop.value};`).join('\n') +
      '\n}\n';
  }
});

// LIGHT THEME CONFIG
const lightConfig = {
  source: ["tokens/core/**/*.json", "tokens/semantic/theme.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/assets/styles/",
      files: [{
        destination: "_variables.css",
        format: "css/variables"
      }]
    }
  }
};

// DARK THEME CONFIG
const darkConfig = {
  source: ["tokens/core/**/*.json", "tokens/semantic/theme-dark.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/assets/styles/",
      files: [{
        destination: "_variables-dark.css",
        format: "css/dark-theme",
        options: {
          selector: ".dark-theme"
        }
      }]
    }
  }
};

// Run builds
const sdLight = new StyleDictionary(lightConfig);
await sdLight.buildAllPlatforms();

const sdDark = new StyleDictionary(darkConfig);
await sdDark.buildAllPlatforms();

