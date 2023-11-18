import CartService from '../services/CartService.js';
import jwt from 'jsonwebtoken';
import { secret } from '../config.js';

class CartController {
	async getCart(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const {id} = jwt.verify(token, secret);
			const cart = await CartService.getCart(id);
			return res.json(cart);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async addToCart(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const {id: cartId} = jwt.verify(token, secret);
			const cartItem = await CartService.addToCart(req.body.id, cartId);
			return res.json(cartItem);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async delete(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const {id: cartId} = jwt.verify(token, secret);
			const cartItem = await CartService.delete(req.params.id, cartId);
			return res.json(cartItem);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async deleteAll(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const {id: cartId} = jwt.verify(token, secret);
			const cart = await CartService.deleteAll(cartId);
			return res.json(cart);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}

export default new CartController;