# The Hashgraph Association Transaction Explorer Web Application

This application is a front end, open-source application. Its main focus is:

- To look up transactions made in any of its nodes
- To visualize the data from any account in a table and graph format
- Share any transactions via an URL

## Installation guide for local use

1. Run `npm install` to install all dependencies of the project
2. Run `npm run dev` to run the application in a developement enviroment
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This application has 2 types of tests:

1. Jest Testing
   1. To run Jest input the command `npm run test` OR `npx jest`
   2. Wait for the tests to run
      1. Currently only 71% coverage is assured in Jest Testing
      2. The Graph is not currently tested, waiting on an Open GitHub [issue](https://github.com/mui/mui-x/issues/11568) from Mui X-Charts
2. Cypress E2E testing
   1. To run the test you must run the application before with `npm run dev`
   2. After the application is running:
      1. Run the command `npx cypress open`
      2. Go into E2E testing
         1. Select and run the tests you wish to
