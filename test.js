var nmap = require("node-nmap");

nmap.nmapLocation = "nmap"; //default

//    Accepts array or comma separated string of NMAP acceptable hosts
var quickscan = new nmap.OsAndPortScan("pixer.uz");

quickscan.on("complete", function (data) {
	console.log(data);
});

quickscan.on("error", function (error) {
	console.log(error);
});

quickscan.startScan();
