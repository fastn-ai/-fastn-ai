import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts", // Entry file
    output: [
      {
        file: "dist/index.esm.js", // ES Module output
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs.js", // CommonJS output
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(), // Exclude peer dependencies like React
      resolve(), // Resolve node_modules
      commonjs(), // Convert CommonJS modules to ES6
      typescript({ tsconfig: "./tsconfig.json" }), // Use TypeScript
    ],
    external: ["react", "react-dom"], // Mark React as a peer dependency
  },
  {
    // TypeScript definitions output
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
