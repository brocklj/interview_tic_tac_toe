import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
    plugins: [tsconfigPaths()],
    resolve: {
        alias: {
            '@utils': 'src/utils',
            'BoardValidator': 'src/utils/BoardValidator.d'
        }
    },
    test: {
        globals: true,
        environment: 'node'
    }
});
