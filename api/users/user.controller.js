//Model
const userModel = require('./user.model');
//Crypt
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function singUpUser(req, res, next) {
	try {
		const { email, password } = req.body;

		const existedUser = await userModel.findOne({ email });

		if (existedUser) {
			return res.status(409).json({ message: 'Email in use' });
		}

		const encryptedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
		const user = { email, password: encryptedPassword };

		await userModel.create(user);

		return res.status(201).json({ email: user.email, subscription: 'free' });
	} catch (error) {
		next(error);
	}
}

async function signInUser(req, res, next) {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: 'Email or password is wrong' });
		}

		const isUserPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isUserPasswordCorrect) {
			return res.status(401).json({ message: 'Email or password is wrong' });
		}

		const userToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: '24h',
		});

		const response = {
			token: userToken,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		};

		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
}

async function signOutUser(req, res, next) {}

async function getCurrentUser(req, res, next) {}

async function updateUserSubscription(req, res, next) {}

module.exports = {
	singUpUser,
	signInUser,
	signOutUser,
	getCurrentUser,
	updateUserSubscription,
};
