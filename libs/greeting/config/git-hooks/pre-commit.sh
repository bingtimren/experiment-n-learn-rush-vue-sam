#!/bin/sh

# check if we have something to commit before doing other heavy checks
count=`git diff --cached --name-status|wc -l`

if [ $count = 0 ];
then
  echo "Nothing to commit. Forgot git add?";
  exit 1
fi

# prevent commit into certain branches
branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "master" ] || [ "$branch" = "main" ] || [ "$branch" = "staging" ] || [ "$branch" = "production" ] || \
  [ "$branch" = "release" ] || [ "$branch" = "develop" ]; 
then
  echo "ERROR: You can't commit directly to $branch branch"
  exit 1
fi

if [ "$branch" = "alpha" ] || [ "$branch" = "beta" ] || [ "$branch" = "stable" ]; 
then
  if git diff --cached --name-status | grep -v package-lock.json | grep -v package.json | grep -v CHANGELOG.md;
  then
    echo "ERROR: Branch $branch only allows release commits (package.json, package-lock.json & CHANGELOG.md"
    exit 1
  fi
fi

# clean -> build -> test
npm run cbt
