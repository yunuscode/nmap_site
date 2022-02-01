const {
	HomeGetController,
	HomeScanController,
	HomeCheckController,
	HomeSavedController,
} = require("../controllers/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/", HomeGetController);
HomeRouter.get("/start", HomeScanController);
HomeRouter.get("/old/:id", HomeSavedController);
HomeRouter.get("/:id", HomeCheckController);

module.exports = HomeRouter;
