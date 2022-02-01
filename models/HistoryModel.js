module.exports = async function (sequelize, Sequelize) {
	return await sequelize.define("history", {
		history_id: {
			type: Sequelize.DataTypes.UUID,
			allowNull: false,
			defaultValue: Sequelize.DataTypes.UUIDV4(),
			unique: true,
			primaryKey: true,
		},
		history_ip: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		history_done: {
			type: Sequelize.DataTypes.BOOLEAN,
			defaultValue: false,
		},
		history_data: {
			type: Sequelize.DataTypes.JSON,
			defaultValue: {},
		},
	});
};
