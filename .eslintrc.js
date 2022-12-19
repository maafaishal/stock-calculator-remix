/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  plugins: ["unused-imports"],
  rules: {
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never", propElementValues: "always" },
    ],
    "import/no-duplicates": ["warn"],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
  },
};
