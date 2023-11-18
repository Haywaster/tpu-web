import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { secret } from '../config.js';
import CartService from '../services/CartService.js';

const generateAccessToken = (id, roles) => {
	const payload = { id, roles };
	return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Ошибка при регистрации', errors });
			}
			const { username, password } = req.body;
			const candidate = await User.findOne({ username });
			if (candidate) {
				return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
			}
			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: 'USER' });
			const user = new User({ username, password: hashPassword, roles: [userRole.value] });
			await user.save();
			//Создание корзины за текущим юзером
			const userId = user._id;
			await CartService.createCart(userId)
			return res.json({ message: 'Пользователь успешно зарегистрирован' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Registration error' });
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(400).json({ message: `Пользователь ${ username } не найден` });
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: `Введен неверный пароль` });
			}
			const token = generateAccessToken(user._id, user.roles);
			return res.json({ token });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Login error' });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.json(users);
		} catch (e) {
			console.log(e);
		}
	}

	async getUserInfo(req, res) {
		try {
			const user = await User.findById(req.user.id);
			res.json(user);
		} catch (e) {
			console.log(e);
		}
	}
}

export default new authController();