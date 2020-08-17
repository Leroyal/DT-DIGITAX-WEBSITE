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


## Table of Contents

* [Technical Information](#technical-information)
    * [Framework](#framework)
    * [Version](#version)
    * [Installation](#installation)    
    * [For Login](#login)
    * [For Idle](#idle)
    * [For UserTaxDetails](#usertaxdetails)

    
* [Error Handling](#error-handling)
* [CHANGELOG](#changelog)


<a name="technical-information"></a>
## Technical Information


### Framework	: Angular

### Version	:9

### Installation

1. 	First  of all, we are going to need Node js. NPM (node package manager, is a part of node js) is a tool for installing 3rd party libraries and dependencies to our project. If you don’t have it yet, you can download and install it from https://nodejs.org/en/
2. 	If you have node js installed, the next step is installing the Angular CLI itself to your computer---npm install -g @angular/cli.
g stands for global installation. If you use -g later you can use the CLI in any Angular project on your computer.
3. 	After the installation is completed, you can use Angular CLI to create a new Angular project with the following command:ng new my-first-app
4. 	After installing the CLI and creating a new Angular app, the final step is to start the project. To do that, we need to use the following command:ng serve -- open
5. 	Run the project in browser like 'localhost:4200'. You can see angular default page.
	

### For Login

 1. Create login component .To do that ,we need to use the following command :ng g c signin/signin
 2. Create signup component same as before.


### For Idle

 1. We need to use bn-ng-idle tool in app component
 2. If session idle for 15 minutes or more than that it is figure out by this tool.

 ### For UserTaxDetails

 1. Create tax-prepare-profile component .To do that ,we need to use the following command :ng g c tax-prepare-profile/tax-prepare-profile
 2. User personal info,tax info is figure out by this tool.


<a name="error-handling"></a>
## Error Handling

If you are encountering a angular cli  error, don't panic! Here is a list of common issues and how to solve them.

### npm ERR! code ENOENT

Try uninstalling clearing your cache first npm uninstall -g @angular/cli npm cache clean npm install -g @angular/cli@latest.

### Module not found: Error: 

If your component is inside the same directory, then you need to point your templateUrl to the same folder as well:

<a name="changelog"></a>
## CHANGELOG

1. 2020-08-03: Initial release 1.0.0
