module.exports = async function (sequelize, Sequelize) {
	return await sequelize.define("history", {
		history_id: {
			type: Sequelize.DataTypes.UUIDV,
		},
	});
};
