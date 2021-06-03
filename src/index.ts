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