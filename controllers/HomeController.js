const checkTCP = require("../modules/checkTCP");
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
		const IP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		// const IP = `2604:a880:400:d0::1d31:d001`;

		const udp = await checkUDP(IP);
		const tcp = await checkTCP(IP);

		res.render("results", {
			udp,
			tcp,
		});
	}
};
