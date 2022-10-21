const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const { token } = req.headers;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
			if (err) res.status(403).send('Invalid token');
			req.user = user;
			next();
		});
	} else {
		res.status(401).send('Unauthorized!');
	}
};

const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(401).send('Forbidden action');
		}
	});
};

const authorizeUser = (req, res, next) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		next();
	} else {
		res.status(403).send("You're not allowed to edit this");
	}
};

module.exports = { verifyToken, authorizeUser, verifyAdmin };
