const checkTCP = require("./checkTCP");
const checkUDP = require("./checkUDP");

async function backgroundWorker(db) {
	try {
		let queries = await db.histories.findOne({
			where: {
				history_done: false,
			},
			order: [["createdAt", "ASC"]],
			raw: true,
		});

		if (!queries) {
			setTimeout(() => {
				backgroundWorker(db);
			}, 2000);
			return;
		}

		let results = await checkUDP(queries.history_ip);

		if (results?.error) {
			await db.histories.destroy({
				history_id: queries.history_id,
			});

			setTimeout(() => {
				backgroundWorker(db);
			}, 5000);
			return;
		}

		let data = { tcp: [], udp: results };

		let x = await db.histories.update(
			{
				history_data: data,
				history_done: true,
			},
			{
				where: {
					history_id: queries.history_id,
				},
			}
		);

		if (x) {
			setTimeout(() => {
				backgroundWorker(db);
			}, 5000);
			return;
		}
	} catch (error) {}
}

module.exports = backgroundWorker;
