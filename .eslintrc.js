module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-no-undef": "off",
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ],
    "no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/no-unknown-property": 1,
    indent: ["warn", "tab"],
    "linebreak-style": ["warn", "windows"],
    quotes: ["warn", "single"],
    semi: ["warn", "always"]
  }
};
