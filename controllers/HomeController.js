const checkTCP = require("../modules/checkTCP");
const net = require("net");
const checkUDP = require("../modules/checkUDP");

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
			// const IP = `2604:a880:400:d0::1d31:d001`;

			// const udp = await checkUDP(ip);
			// const tcp = await checkTCP(ip);

			const newData = await req.db.histories.create({
				history_ip: ip,
			});

			res.json(newData);
		} catch (error) {
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

			const data = await req.db.histories.findOne({
				where: {
					history_id,
				},
				raw: true,
			});

			if (!data) {
				throw new Error("test");
			}

			res.json(data);
		} catch (error) {
			res.json({
				error,
			});
		}
	}
};
