import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: "index.html",
                add: "add.html",
                about: "about.html"
            }
        }
    }
})