const checkTCP = require("../modules/checkTCP");
const net = require("net");
const checkUDP = require("../modules/checkUDP");
const { Op } = require("sequelize");

module.exports = class HomeController {
	static async HomeGetController(req, res) {
		try {
			res.render("index");
		} catch (error) {
			console.log(error);
		}
	}
	static async HomeScanController(req, res) {
		try {
			let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

			if (ip.substr(0, 7) == "::ffff:") {
				ip = ip.substr(7);
			}

			if (!(net.isIPv4(ip) || net.isIPv6(ip))) {
				throw new Error("test");
			}

			let data = await req.db.histories.findOne({
				where: {
					history_done: false,
					history_ip: ip,
				},
				raw: true,
			});

			// const IP = `2604:a880:400:d0::1d31:d001`;

			// const udp = await checkUDP(ip);
			// const tcp = await checkTCP(ip);

			if (!data) {
				data = await req.db.histories.create({
					history_ip: ip,
				});
			}

			res.json(data);
		} catch (error) {
			console.log(error);
			res.json({
				error: true,
			});
		}
	}

	static async HomeCheckController(req, res) {
		try {
			const history_id = req.params.id;

			if (!history_id) {
				throw new Error("Error");
			}

			const count = await req.db.histories.count({
				where: {
					createdAt: {
						[Op.lt]: new Date(),
					},
					history_done: false,
				},
			});

			const data = await req.db.histories.findOne({
				where: {
					history_id,
				},
				raw: true,
			});

			if (!data) {
				throw new Error("test");
			}

			res.json({
				...data,
				count,
			});
		} catch (error) {
			res.json({
				error,
			});
		}
	}

	static async HomeSavedController(req, res) {
		try {
			const history_id = req.params.id;

			if (!history_id) {
				throw new Error("Error");
			}

			const data = await req.db.histories.findOne({
				where: {
					history_id,
					history_done: true,
				},
				raw: true,
			});

			if (data) {
				res.render("old_data", {
					data,
				});
			}
		} catch (error) {
			res.redirect("/");
		}
	}
};
