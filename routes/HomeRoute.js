const {
	HomeGetController,
	HomeScanController,
	HomeCheckController,
} = require("../controllers/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/", HomeGetController);
HomeRouter.get("/start", HomeScanController);
HomeRouter.get("/:id", HomeCheckController);

module.exports = HomeRouter;
