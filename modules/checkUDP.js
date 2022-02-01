const util = require("util");
const exec = util.promisify(require("child_process").exec);
const net = require("net");

async function checkUDP(ip) {
	if (!(net.isIPv4(ip) || net.isIPv6(ip))) {
		throw new Error("Invalid id");
	}

	let query = `nmap --top-ports 20 -sU -v `;

	if (net.isIPv6(ip)) {
		query += `-6 `;
	}

	const { stdout, stderr } = await exec(query + ip);

	if (stderr.length) {
		throw new Error(stderr);
		return;
	}

	const lines = stdout.split("\n");
	let ports = [];

	let starts = false;

	for (const iterator of lines) {
		if (iterator.startsWith("Read data")) {
			starts = false;
		}
		if (starts) {
			ports.push(iterator);
		}
		if (iterator.startsWith("PORT")) {
			starts = true;
		}
	}

	return ports;
}
// getPorts();

module.exports = checkUDP;
