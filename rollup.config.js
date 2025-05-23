import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env", "@babel/preset-react"],
        extensions: [".js", ".jsx"],
      }),
      postcss({
        modules: true,
        extract: false,
        minimize: true,
        use: ["sass"],
      }),
    ],
    external: ["react", "react-dom"],
  },
];
