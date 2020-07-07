# DT-DIGITAX-WEBSITE
DigiTax website


This is project is built in Angular 9. It contains all of the specs from Angular's test guide as well as some extras. 

Get started
Clone the repo
git clone https://github.com/Leroyal/DT-DIGITAX-WEBSITE.git
cd DT-DIGITAX-WEBSITE
Install npm packages
Install the npm packages described in the package.json and verify that it works:

npm install
ng serve
The ng serve command builds (compiles TypeScript and copies assets) the application into dist/, watches for changes to the source files, and runs lite-server on port 4200.

Shut it down manually with Ctrl-C.

npm scripts
These are the most useful commands defined in package.json:

npm start - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
npm run build - runs the TypeScript compiler and asset copier once.
npm run build:watch - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into dist/.
npm run lint - runs tslint on the project files.
npm run serve - runs lite-server.
These are the test-related scripts:

npm test - builds the application and runs Intern tests (both unit and functional) one time.
npm run ci - cleans, lints, and builds the application and runs Intern tests (both unit and functional) one time.
Techniques

Hence for security we have used both local storage and session storage, If users wants to remember them, then we are using local storage otherwise using session storage.
