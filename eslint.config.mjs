import next from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "output.html"],
  },
  ...next,
];

export default eslintConfig;
