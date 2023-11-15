import Router from 'express';
import controller from '../controllers/authController.js';
import { check } from 'express-validator';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = new Router();

authRouter.post('/registration', [
	check('username', 'Имя пользователя не может быть пустым').notEmpty(),
	check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({ min: 4, max: 10 })
], controller.registration);
authRouter.post('/login', controller.login);
authRouter.get('/users', authMiddleware, controller.getUsers);
authRouter.get('/user', authMiddleware, controller.getUserInfo);

export default authRouter;