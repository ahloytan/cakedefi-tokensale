# cakedefi-tokensale
 
### Notes
1. Install typescript globally by typing "npm install -g typescript"
2. To compile .ts to .js, type "tsc src/index.ts" in command line
3. To run index.js, type "node src/index.js < input.txt" in command line
4. To run unit test, type "npm test" or "npm test < input.txt" in command line (Unit test is incomplete, unable to return value from Promise/async function)
5. Data fetching using axios, from Coin Gecko
6. Unit testing using JEST
7. To get the same results as provided in (https://gist.github.com/benzumbrunn/84738476972c85614fe7520cf2274fc6), go to "index.ts", comment out line 11 & 12, uncomment line 40, follow step 2, and run step 3. Current results is base off live market spot rates of the cryptocurrency
