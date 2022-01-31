const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PSQL_URL, {
	logging: console.log,
});

module.exports = async function psql() {
	try {
		console.log(process.env.PSQL_URL);

		await sequelize.authenticate();
	} catch (error) {
		console.log(error);
	}
};
