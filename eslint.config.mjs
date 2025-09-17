import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: {...globals.browser, $: "readonly"} }},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": ["error", { "varsIgnorePattern": "^(startTimer|startCountdown|addClock|removeClock)$" }]
    }
  }
];