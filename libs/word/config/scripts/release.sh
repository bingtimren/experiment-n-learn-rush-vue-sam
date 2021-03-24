#!/bin/sh

# TODO: review the branch and release script, change if needed. 
# TODO: set NPM_TOKEN and 

echo "
##########################################################################################
#
# According to the branch, bump up version with standard-version, git push, and npm publish
#
# This script can be called manually or from CI. Without argument '--execute' it will only do
# a dry run and output what it will do.
#
# This script works only under a release branch:
#
# "alpha", "beta" - publishes a pre-release version
# "stable" - publishes a stable version
#
##########################################################################################
"

branch="$(git rev-parse --abbrev-ref HEAD)"

echo "BRANCH: $branch"

dryrun="--dry-run"

# test arguments
while test $# -gt 0
do
    case "$1" in
        --execute) dryrun=""
            ;;
        *) echo "unknown argument $1";
            exit 1
            ;;
    esac
    shift
done

# versioning according to branch, pass whatever additional arguments
if [ "$branch" = "alpha" ] || [ "$branch" = "beta" ]; then
    npmtag="--tag $branch";
    npx standard-version --prerelease $branch $dryrun;
elif [ "$branch" = "stable" ] ; then
    npmtag="";
    npx standard-version $dryrun;
else
    echo "Branch $branch is not a release branch."
    exit 1    
fi

# push and publish if not dryrun
if [ "$dryrun" = "--dry-run" ]; then 
    echo "DRYRUN: ignored command 'git push --follow-tags origin $branch && npm publish $npmtag'";
else
    git push --follow-tags origin $branch && npm publish --access public $npmtag;
fi