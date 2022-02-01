const { Sequelize } = require("sequelize");
const HistoryModel = require("../models/HistoryModel");

const sequelize = new Sequelize(process.env.PSQL_URL, {
	logging: console.log,
});

module.exports = async function psql() {
	try {
		let db = {};

		db.histories = await HistoryModel(sequelize, Sequelize);

		// await sequelize.sync({ force: true });

		return db;
	} catch (error) {
		console.log(error);
	}
};
