require("dotenv").config();
const express = require("express");
const databaseMiddleware = require("./middlewares/databaseMiddleware");
const sequelize = require("./modules/sequelize");
const router = require("./routes");
const app = express();
const path = require("path");
const backgroundWorker = require("./modules/backgroundWorker");
const { Op } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 8080);

async function server() {
	try {
		let db = await sequelize();
		app.use((req, res, next) => databaseMiddleware(req, res, next, db));
		app.use(router);

		backgroundWorker(db);

		setInterval(async () => {
			await db.histories.destroy({
				where: {
					createdAt: {
						[Op.lt]: new Date(new Date() - 1000000000),
					},
				},
			});
		}, 1000000);
	} catch (error) {
		console.log(`Server error:`, error);
	}
}

server();
