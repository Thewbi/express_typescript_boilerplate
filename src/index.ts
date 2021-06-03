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