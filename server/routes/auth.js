const router = require('express').Router();
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
	const info = req.body;
	const newUser = new User({
		username: info.username,
		email: info.email,
		password: cryptoJS.AES.encrypt(
			info.password,
			process.env.SECRET_KEY
		).toString(),
	});

	try {
		const user = await newUser.save();
		res.status(201).json(user);
	} catch (e) {
		console.log(err);
	}
});

router.post('/login', async (req, res) => {
	const userInfo = req.body;
	try {
		const user = await User.findOne({
			username: userInfo.username,
		});

		if (!user) throw new Error('User not found');

		const hashedPass = cryptoJS.AES.decrypt(
			user.password,
			process.env.SECRET_KEY
		).toString(cryptoJS.enc.Utf8);

		if (hashedPass !== userInfo.password) {
			res.status(401).send('Invalid credentials');
		} else {
			const accessToken = jwt.sign(
				{
					id: user._id,
					isAdmin: user.isAdmin,
				},
				process.env.JWT_SECRET_KEY,
				{ expiresIn: '3d' }
			);
			const { password, ...info } = user._doc;

			res.status(200).json({ ...info, accessToken });
		}
	} catch (e) {
		res.status(404).send(e.message);
	}
});

module.exports = router;
