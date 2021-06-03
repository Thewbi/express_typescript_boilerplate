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
