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


## SAM

I modified 'get-by-id' function to remove dependency on any resource (dynamoDB) but depend on @bingsjs/greeting, a linked package in monorepo.

`sam build` fails - because sam build invokes npm install, and the dependency is not published. This is not just monorepo, SAM build has problem with all packages not published & available through npm install.

```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@bingsjs%2fgreeting - Not found
npm ERR! 404 
npm ERR! 404  '@bingsjs/greeting@~1.0.0-alpha.0' is not in the npm registry.
```

`sam local start-api` initially does not work

```
2021-03-29T03:31:11.496Z        undefined       ERROR   Uncaught Exception      {"errorType":"Runtime.ImportModuleError","errorMessage":"Error: Cannot find module '@bingsjs/greeting'\
```

after `source fixme` to replace symbol linked package with local copied package, without restart sam, it works

so `sam start local` does not rely on build! 
Observation: 
(1) if I use another package in monorepo, `sam local start-api` shows message `Mounting /home/bing/tech-playground/rush/apps/sam-app as /var/task:ro,delegated inside runtime container` , the root dir is mounted as task root. 
(2) if I remove @bingsjs/greeting in dependency, `sam build` will pass, then `sam local start-api` shows message `Mounting /home/bing/tech-playground/rush/apps/sam-app/.aws-sam/build/getByIdFunction as /var/task:ro,delegated inside runtime container`, mounting built dir as task root

I can use `sam local start-api` without build, but still symbol link is not accepted

## CDK

Without any dependency, simple api-gateway integration with one-file lambda works, `cdk synth` and `cdk deploy` works as expected

The problem is when with dependencies, the examples given by CDK document is insufficient. Check https://sites.google.com/site/bingsite/aws/tools/cdk. The problem is about bundling lambda.

FIX 1:

apps/cdk-app/fix.sh copies dependencies to the build/lambdas dir and COULD solve the issue - however, the tree has too much other files and the size is too big, needs manual trim the files to a smaller size. Not really a solution but as a success proof of idea.
