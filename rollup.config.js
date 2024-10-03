import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default defineConfig([
  // App Configuration
  {
    input: "src/app/app.ts",
    // input: {
    //   app: 'src/app/app.ts',
    //   index: 'src/lib/index.ts',
    // },
    output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
      name: "test-2",
    },
    plugins: [
      resolve(), // helps Rollup find node modules
      commonjs(), // converts commonjs modules to ES6
      typescript({ tsconfig: "tsconfig.json" }), // compiles TypeScript
      json(), // allows Rollup to import JSON files
      terser(), // minify the bundle
    ],
    external: [
      "express",
      "mongoose",
      "dotenv",
      "axios",
      "cors",
      "express-async-handler",
    ],
  },

  // Library Configuration
  {
    input: "src/lib/index.ts",
    // input: {
    //   app: 'src/app.ts',
    //   index: 'src/index.ts',
    // },
    output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
      name: "test-2",
    },
    plugins: [
      resolve(), // helps Rollup find node modules
      commonjs(), // converts commonjs modules to ES6
      typescript({ tsconfig: "tsconfig.json" }), // compiles TypeScript
      json(), // allows Rollup to import JSON files
      terser(), // minify the bundle
    ],
    external: [
      "express",
      "mongoose",
      "dotenv",
      "axios",
      "cors",
      "express-async-handler",
    ],
  },
]);
