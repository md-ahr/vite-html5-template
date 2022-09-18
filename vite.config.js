import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            __APP_ENV_PORT__: env.SERVER_PORT,
        },
        server: {
            port: env.SERVER_PORT,
        },
        build: {
            watch: {
                // https://rollupjs.org/guide/en/#watch-options
            },
            rollupOptions: {
                input: {
                    main: resolve(__dirname, "index.html"),
                },
            },
        },
        plugins: [
            viteImagemin({
                gifsicle: {
                    optimizationLevel: 7,
                    interlaced: false,
                },
                optipng: {
                    optimizationLevel: 7,
                },
                mozjpeg: {
                    quality: 20,
                },
                pngquant: {
                    quality: [0.8, 0.9],
                    speed: 4,
                },
                svgo: {
                    plugins: [
                        {
                            name: "removeViewBox",
                        },
                        {
                            name: "removeEmptyAttrs",
                            active: false,
                        },
                    ],
                },
            }),
        ],
    };
});
