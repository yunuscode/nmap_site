const HomeRouter = require("./HomeRoute");

const Router = require("express").Router();

Router.use("/", HomeRouter);

module.exports = Router;
