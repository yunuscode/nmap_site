module.exports = function databaseMiddleware(req, res, next, db) {
	req.db = db;
	next();
};
