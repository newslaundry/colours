import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs"
    },
    {
      file: "dist/index.mjs",
      format: "es"
    }
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ]
};
