# rush-vue-sam study project

The aim of this project is to experiment with rush and see if I can put two Typescript libraries, a Vue3 project, and an AWS SAM project all into a rush monorepo, and how well it works.

The structure of this project includes:

/libs/word - export a const
/libs/greeting - exports a greeting function, depends on /libs/word
/apps/vue-app - a Vue3-Vite App, depends on /libs/greeting
/apps/sam-app a AWS SAM App, depends on /libs/greeting

## Libs (word & greeting)

To check the result, `git checkout vue-vite-pnpm`

Lesson learnt: 
- use 'rush add' instead of 'npm install' 
- 'rush update' and 'rush build' works well
- once 'rush build', changes of 'word' is effective in 'greeting'. this is correct since 'greeting' refers to 'word' through absolute path and resolves to the type definition (index.d.ts) and code is linked to '.js', both files are result of build. changes become effective only after build.

## Vue+Vite

See https://github.com/vitejs/vite/issues/2697

After `rush update`, change to /apps/vue-app directory, run `pnpm dev` and check local webpage. Console shows "Uncaught SyntaxError: The requested module '/@fs/home/bing/tech-playground/rush/libs/greeting/build/main/index.js' does not provide an export named 'greeting'"

Now run
```
rm node_modules/@bingsjs/greeting
cp -r ../../libs/greeting/ node_modules/@bingsjs/
pnpm dev
```

On console there's a vite error "[vite] error while updating dependencies:
Error: Build failed with 1 error:
node_modules/@bingsjs/greeting/build/main/commons.js:8:21: error: Could not resolve "@bingsjs/word" (mark it as external to exclude it from the bundle)
"

Now
```
rm node_modules/@bingsjs/greeting/node_modules/@bingsjs/word
cp -r ../../libs/word/ node_modules/@bingsjs/greeting/node_modules/@bingsjs
pnpm dev
```
It works!

CONCLUSION: Vite has problem with rush's SYMBOL LINKING but has no problem with the non-flat node_modules directory

Try building, restore state to after `rush update`, run `npx vite build`, error. 

THE WORK-AROUND:

add linked modules to "optimizeDeps.include" in vite.config.ts. This makes dev works but build still does NOT work


