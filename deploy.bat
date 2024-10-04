@ECHO on

set /p message= Commit Message: 

REM abort on errors
set -e

REM build
call npm run build

@ECHO on
REM navigate into the build output directory
cd dist

REM if you are deploying to a custom domain
echo 'www.vintgram.com' > CNAME

git init
git add -A
git commit -m"%message%"

git push -f git@github.com:vintgram/babylonPlayground.git master:gh-pages

cd ..