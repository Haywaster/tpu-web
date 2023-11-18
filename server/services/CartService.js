import Cart from '../models/Cart.js';
import Post from '../models/Post.js';

class CartService {
	async createCart(userId) {
		const cart = new Cart({
			_id: userId,
			items: [],
		});
		return cart.save();
	}

	getCart(cartId) {
		if (!cartId) {
			throw new Error('Id не указан');
		}
		return Cart.findById(cartId);
	}

	async addToCart(itemId, cartId) {
		if (!itemId || !cartId) {
			throw new Error('Id не указан');
		}

		const currentCart = await Cart.findById(cartId);
		if (!currentCart) {
			throw new Error('Корзина не найдена');
		}

		const post = await Post.findById(itemId);
		const cartItem = {
			_id: itemId,
			name: post.name,
			description: post.description,
			price: post.price,
			category: post.category,
			image: post.image,
		};

		if (!currentCart.items.some(item => item._id === itemId)) {
			await Cart.findOneAndUpdate(
				{ _id: cartId },
				{ $addToSet: { items: cartItem } },
				{ new: true }
			);
		} else {
			throw new Error('Товар уже есть в корзине');
		}
	}

	async delete(itemId, cartId) {
		if (!itemId || !cartId) {
			throw new Error('Id не указан');
		}

		const currentCart = await Cart.findById(cartId);
		if (!currentCart) {
			throw new Error('Корзина не найдена');
		}

		console.log(itemId);
		console.log(currentCart.items);

		if (currentCart.items.some(item => item._id === itemId)) {
			await Cart.findByIdAndUpdate(
				cartId,
				{ $pull: { items: { _id: itemId } } },
				{ new: true }
			);
		} else {
			throw new Error('Такого товара нет в корзине');
		}
	}

	async deleteAll(cartId) {
		if (!cartId) {
			throw new Error('Id корзины не указан');
		}

		const currentCart = await Cart.findById(cartId);
		if (!currentCart) {
			throw new Error('Корзина не найдена');
		}

		currentCart.items = []; // Очистка массива items
		await currentCart.save();
	}
}

export default new CartService;