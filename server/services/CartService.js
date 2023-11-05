import CartItem from '../models/CartItem.js';
import Post from '../models/Post.js';

class CartService {
	async addToCart(postId) {
		if (!postId) {
			throw new Error('Id не указан');
		}

		const post = await Post.findById(postId);

		if (!post) {
			throw new Error('Товар не найден');
		}

		const cartItem = new CartItem({
			_id: postId,
			name: post.name,
			description: post.description,
			price: post.price,
			category: post.category,
			image: post.image,
		});

		return cartItem.save();
	}

	getAll() {
		return CartItem.find();
	}

	delete(postId) {
		if (!postId) {
			throw new Error('Id не указан');
		}
		return CartItem.findByIdAndDelete(postId);
	}

	deleteAll() {
		return CartItem.deleteMany();
	}
}

export default new CartService;