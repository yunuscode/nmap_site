const {
	HomeGetController,
	HomeScanController,
} = require("../controllers/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/", HomeGetController);
HomeRouter.get("/start", HomeScanController);

module.exports = HomeRouter;
