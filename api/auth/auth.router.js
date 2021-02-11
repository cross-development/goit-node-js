//Core
const { Router } = require('express');
//Controllers
const authController = require('./auth.controller');
//Helpers
const validators = require('../../helpers/validators');

const { singUpUser, signInUser, signOutUser } = authController;
const {
	validateSignUpUser,
	validateSignInUser,
	validateUserToken,
	verificationEmailToken,
} = validators;

const authRouter = Router();

// @ POST /api/auth/register
authRouter.post('/register', validateSignUpUser, singUpUser);

// @ POST /api/auth/login
authRouter.post('/login', validateSignInUser, signInUser);

// @ POST /api/auth/logout
authRouter.post('/logout', validateUserToken, signOutUser);

// @ GET /api/auth/verify/:verificationToken
authRouter.get('/verify/:verificationToken', verificationEmailToken);

module.exports = authRouter;
