import CartService from '../services/CartService.js';

class CartController {
	async addToCart(req, res) {
		try {
			const cartItem = await CartService.addToCart(req.body.id);
			return res.json(cartItem);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async getAll(req, res) {
		try {
			const cart = await CartService.getAll();
			return res.json(cart);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async delete(req, res) {
		try {
			const cartItem = await CartService.delete(req.params.id);
			return res.json(cartItem);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async deleteAll(req, res) {
		try {
			const cart = await CartService.deleteAll();
			return res.json(cart);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}

export default new CartController;