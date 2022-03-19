module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended'
  ],
  globals: {
    localStorage: true,
    require: true
  },
  ignorePatterns: [
    'test/**/*'
  ],
  "overrides": [
    {
      "files": ["tsconfig.json"],
      "rules": {
        "json/*": ["error", "allowComments"]
      }
    }
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  }
};

