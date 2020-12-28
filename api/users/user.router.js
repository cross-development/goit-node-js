//Core
const { Router } = require('express');
//Middleware
const userMiddleware = require('./user.middleware');

const { validateUserRegister, validateUserLogin } = userMiddleware;

const userRouter = Router();

// @ POST /api/auth/register
userRouter.post('/register', validateUserRegister);

// @ POST /api/auth/login
userRouter.post('/login', validateUserLogin);

// @ POST /api/auth/logout
userRouter.post('/logout');

// @ GET /api/users/current
userRouter.get('/current');

// @ PATCH /api/users/:userId
userRouter.patch('/:userId');

module.exports = userRouter;
