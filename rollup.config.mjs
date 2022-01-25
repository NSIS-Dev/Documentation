import { string } from "rollup-plugin-string";
import typescript from '@rollup/plugin-typescript';

const __dirname = new URL('.', import.meta.url).pathname;

export default {
  input: 'src/index.ts',
  output: {
    file: './index.mjs',
    format: 'esm'
  },
  plugins: [
    string({
      include: "**/*.md",
      exclude: ["README.md"]
    }),
    typescript({
      module: "esnext",
      moduleResolution: "node"
    })
  ]
};