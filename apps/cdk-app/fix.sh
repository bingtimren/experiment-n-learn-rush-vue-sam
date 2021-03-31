rm -fr build/lambdas/node_modules/@bingsjs
mkdir -p build/lambdas/node_modules/@bingsjs
cp -r ../../libs/greeting/ build/lambdas/node_modules/@bingsjs/
rm build/lambdas/node_modules/@bingsjs/greeting/node_modules/@bingsjs/word
cp -r ../../libs/word/ build/lambdas/node_modules/@bingsjs/greeting/node_modules/@bingsjs
cp -r ../../common/temp/node_modules/.pnpm/string@3.3.3/node_modules/string build/lambdas/node_modules/
echo "then there's a lot of manual cleanings to reduce the size.... just for experiment"