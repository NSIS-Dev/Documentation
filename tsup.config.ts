import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

export default defineConfig({
	target: 'esnext',
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	format: 'esm',
	minify: true,
	treeshake: 'recommended',
    esbuildPlugins: [
        {
            name: "markdown-as-module",
            setup(build) {
                build.onResolve({ filter: /\.md$/ }, (args) => {
                    return {
                        path: path.resolve(args.resolveDir, args.path),
                        namespace: "markdown-as-module",
                    };
                });

                build.onLoad(
                    { filter: /.*/, namespace: "markdown-as-module" },
                    (args) => {
                        const contents = fs.readFileSync(args.path, "utf8");
                        return {
                            contents: `export default ${JSON.stringify(contents)}`,
                            loader: "ts",
                        };
                    }
                );
            },
        }
    ]
});
