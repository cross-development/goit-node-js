//Core
const { Router } = require('express');
//Controller
const userController = require('./user.controller');
//Middleware
const userMiddleware = require('./user.middleware');

const {
	singUpUser,
	signInUser,
	signOutUser,
	getCurrentUser,
	updateUserSubscription,
} = userController;

const {
	validateSignUpUser,
	validateSignInUser,
	validateUserToken,
	validateUserID,
} = userMiddleware;

const userRouter = Router();

// @ POST /api/auth/register
userRouter.post('/register', validateSignUpUser, singUpUser);

// @ POST /api/auth/login
userRouter.post('/login', validateSignInUser, signInUser);

// @ POST /api/auth/logout
userRouter.post('/logout', validateUserToken, signOutUser);

// @ GET /api/users/current
userRouter.get('/current', validateUserToken, getCurrentUser);

// @ PATCH /api/users/:userId
userRouter.patch('/:userId', validateUserID, updateUserSubscription);

module.exports = userRouter;
