const reactPlugin = require("eslint-plugin-react");
const babelParser = require("@babel/eslint-parser");

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/", ".next/"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["next/babel"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: "module",
    },
    plugins: {
      reactPlugin,
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
      "reactPlugin/jsx-uses-react": "error",
      "reactPlugin/jsx-uses-vars": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
