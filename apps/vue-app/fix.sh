rm node_modules/@bingsjs/greeting
cp -r ../../libs/greeting/ node_modules/@bingsjs/
rm node_modules/@bingsjs/greeting/node_modules/@bingsjs/word
cp -r ../../libs/word/ node_modules/@bingsjs/greeting/node_modules/@bingsjs
