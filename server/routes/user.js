const router = require('express').Router();
const cryptoJS = require('crypto-js');
const { verifyToken, authorizeUser } = require('../middleware/verifyToken');
const User = require('../models/User');

router.get('/', async (req, res) => {
	try {
		const users = await User.find({}).limit(10);
		res.status(200).json(users);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.put('/:id', verifyToken, authorizeUser, async (req, res) => {
	if (req.body.password) {
		req.body.password = cryptoJS.AES.encrypt(
			req.body.password,
			process.env.SECRET_KEY
		);
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

module.exports = router;
