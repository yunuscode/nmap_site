require("dotenv").config();
const express = require("express");
const databaseMiddleware = require("./middlewares/databaseMiddleware");
const sequelize = require("./modules/sequelize");
const router = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 8080);

async function server() {
	try {
		let db = await sequelize();
		app.use((req, res, next) => databaseMiddleware(req, res, next, db));
		app.use(router);
	} catch (error) {
		console.log(`Server error:`, error);
	}
}

server();
