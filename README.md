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

# Usage

Clone to create a new project:

```
git clone https://github.com/Thewbi/express_typescript_boilerplate.git <your_project_folder>
```

e.g.

```
git clone https://github.com/Thewbi/express_typescript_boilerplate.git todo_backend
```

remove git:

```
cd todo_backend
rm -rf .git
```

You could also just clone the template and copy the files over manually (without the .git folder)

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
    "start": "node --es-module-specifier-resolution=node --experimental-modules dist/index.js",
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

**Hint:** --es-module-specifier-resolution=node is required so that modules can be imported without using an explicit .js extensions during node execution. This is handy because the typescript compiler will output module imports inside the generated js files without explicitly adding .js extensions! That means when you open the generated index.js from the dist folder, you will see import statements such as import indexRouter from "./routes/indexrouter"; Without the --es-module-specifier-resolution=node parameter, these imports are not understood by node and an error is thrown during javascript execution.

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
{
  "compilerOptions": {
      "incremental": true
      "target": "es6"
      "sourceMap": true
      "outDir": "dist"
      "strict": true
      "moduleResolution": "node"
      "allowSyntheticDefaultImports": true
      "esModuleInterop": true
      "experimentalDecorators": true
      "emitDecoratorMetadata": true
      "skipLibCheck": true
      "forceConsistentCasingInFileNames": true
  }
}
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
server started at http://localhost:8080
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

## Adding a POST method

Add code to the index.ts

```
class Result {
    constructor(message:string, code:number) {
        this.message = message;
        this.code = code;
    }
  message: string;
  code: number;
};

app.post('/create/real', async function (req, res, next) {

    console.log(req);

    let result: Result;
    result = new Result("Your data was processed! Result:OK", 123);

    res.status(200).send(result);
});
```

This defines a Person class and a POST handler for the URL /create/real.
Whenever a POST request arrives at that URL, a person Ted is created and returned.
Inside the POST handler, the posted data could be processed which is not shown in this example.
Instead of real business logic, the request is just output to the console.

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

Use a REST API client to POST a raw JSON body request to the URL http://localhost:8080/create/real.
The returned value should be

```
{
    "message": "Your data was processed! Result:OK",
    "code": 123
}
```

## Splitting the Application up into Routes

To organize the code, move related handlers into the own files and combine them into routes. Inform express about the different routes and the handlers for those routes.

Create a routes folder and inside that folder create the files indexrouter.ts

```
import express from "express";

var indexRouter = express.Router();

indexRouter.get('/', function (req, res, next) {
    res.send('ok');
});

export default indexRouter;
```

and todorouter.ts

```
import express from "express";

var todoRouter = express.Router();

class Result {
    constructor(message:string, code:number) {
        this.message = message;
        this.code = code;
    }
  message: string;
  code: number;
};

todoRouter.post('/create/real', async function (req, res, next) {

    console.log(req);

    let result: Result;
    result = new Result("Your data was processed! Result:OK", 123);

    res.status(200).send(result);
});

export default todoRouter;
```

Add the routers to the express app inside index.ts:

```
import express from "express";
import indexRouter from "./routes/indexrouter";
import todoRouter from "./routes/todorouter";

const world = 'world';

function hello(word: string = world): string {
  return `Hello ${world}! `;
}

const app = express();

app.use('/', indexRouter);
app.use('/todo', todoRouter);

// default port to listen on
const port = 8080;

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

Test the URLs provided via the routers this time around:

http://localhost:8080/

This GET route should return `ok`

http://localhost:8080/todo/create/real

The POST route should return

```
{
    "message": "Your data was processed! Result:OK",
    "code": 123
}
```

**Hint:** by adding the router like this: app.use('/todo', todoRouter); the URL changed from http://localhost:8080/create/real from the previous example to the http://localhost:8080/todo/create/real. Make sure you do not test using the old URL but test using the new, updated URL.
