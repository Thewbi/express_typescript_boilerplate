import express from "express";

const world = 'world';

function hello(word: string = world): string {
  return `Hello ${world}! `;
}

const app = express();


// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    console.log(hello());
    res.send(hello());
} );

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

// default port to listen on
const port = 8080;

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );