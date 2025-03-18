import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command !== "build";
  // if (isDev) {
  //   // Terminate the watcher when Phoenix quits
  //   process.stdin.on("close", () => {
  //     process.exit(0);
  //   });

  //   process.stdin.resume();
  // }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "esnext", // build for recent browsers
      outDir: "../priv/static", // emit assets to priv/static
      emptyOutDir: true,
      sourcemap: isDev, // enable source map in dev build
      manifest: false, // do not generate manifest.json
      rollupOptions: {
        input: {
          main: "./src/main.ts",
        },
        output: {
          entryFileNames: "frontend/[name].js", // remove hash
          chunkFileNames: "frontend/[name].js",
          assetFileNames: "frontend/[name][extname]",
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  };
})
