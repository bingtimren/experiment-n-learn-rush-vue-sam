import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //
  // **** Below are work-arounds to solve problems when (1) packages are symbol linked and (2) built for CommonJS ****
  // **** See https://github.com/vitejs/vite/issues/2697 ****
  // **** Since @bingsjs/greeting is now built for ES2015 as well, the work-arounds below are not needed ****
  //
  // optimizeDeps: {
  //   include: ['@bingsjs/greeting']
  // },
  // build: {
  //   rollupOptions: {
  //     plugins:[ resolve(), commonjs()]
  //   }
  // }
});
