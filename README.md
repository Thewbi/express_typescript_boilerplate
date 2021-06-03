# Quickstart

**Hint:** Make sure no server is binding to the port already. Otherwise the next server will fail to bind to the port during startup!

```
npm i
npm run build
npm run start
```

Stop the server using CTRL + c or

```
ps
kill -9 <PID>
```

Visit the URLs in the browser or via a REST API tool.

# Creating the app

## Folder Structure

Create a folder for the app

```
mkdir todo_backend
cd todo_backend
```

Create a folder within for the source code

```
mkdir src
```

## Setup node / npm / npx

Create a package.json

```
npm init
```

Add a build and a start script to the package.json so that it looks like this:

```
{
  "name": "todo_backend",
  "type": "module",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node --experimental-modules dist/index.js",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.12",
    "@types/node": "^15.9.0",
    "express": "^4.17.1",
    "typescript": "^4.3.2"
  }
}
```

**Hint:** "type": "module" in combination with the --experimental-modules is required in order to let node (starting with version 12) process the es6 module syntax (import/export) instead of using the CommonJS require syntax for modules. As typescript uses the import/export syntax, the tsc compiler will output import/export syntax into the resulting javascript files. node starting with version 12 understands this import/export syntax since it is part of ES6/ES2015 but only when enabling the experimental module loader. Another option would be to use Babel to transpile away the ES6 module syntax but since node supports it natively, the experimental suppport is used since this allows us to not add another transpiler to the setup.

**Hint:** The typescript compiler tsc will only read the tsconfig.json file when it is called without parameters! When you target tsc to compile a specific file, it will ignore tsconfig.json and only read parameters from the command line! This is why the start script in the package.json above only contains the tsc command without parameters. tsc will search the nearest typescript files and compile them.

## Setup typescript

Install typescript

```
npm i typescript --save-dev
```

Create a tsconfig.json

```
npx tsc --init
```

Adjust the tsconfig.json file

```
...
```

## Create a index.ts

Create a index.ts file in the src folder

```
const world = 'world';

function hello(word: string = world): string {
  return `Hello ${world}! `;
}

console.log(hello());
```

## Testing the Progress

Build and start the application

```
npm run build
npm run start
```

The output should be:

```
Hello world!
```

## Setup express

Install express

```
npm install express
npm install --save-dev @types/node @types/express
```

## Update the index.ts file and start an express server

```
import express from "express";

const world = 'world';

function hello(word: string = world): string {
  return `Hello ${world}! `;
}

const app = express();
const port = 8080; // default port to listen on

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    console.log(hello());
    res.send(hello());
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
```

## Testing the Progress

Build and start the application

**Hint:** Make sure no server is binding to the port already. Otherwise the next server will fail to bind to the port during startup!

```
npm i
npm run build
npm run start
```

The output should be:

```
server started at http://localhost:8080
```

Copy the URL http://localhost:8080 and paste it into a browser.
The browser loads the page and displays `Hello world!`

Stop the server using CTRL + c or

```
ps
kill -9 <PID>
```
