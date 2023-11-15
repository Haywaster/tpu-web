import Post from '../models/Post.js';
import FileService from '../services/FileService.js';

class PostService {
	create(post, image) {
		const fileName = FileService.saveFile(image)
		return Post.create({ ...post, image: fileName });
	}

	getAll(category, search) {
		if (category || search) {
			const query = {};
			if (category) {
				query.category = category;
			}
			if (search) {
				const isNumeric = !isNaN(search);
				if (isNumeric) {
					const price = parseFloat(search);
					query.price = {
						$gte: price,          // Больше или равно введенной цене
						$lt: price + 1        // Меньше чем следующее значение
					};
				} else {
					query.name = { $regex: search, $options: 'i' };
				}
			}
			return Post.find(query);
		}
		else return Post.find();
	}

	getOne(postId) {
		if (!postId) {
			throw new Error('Id не указан');
		}
		return Post.findById(postId);
	}

	update(post) {
		if (!post._id) {
			throw new Error('Id не указан');
		}
		return Post.findByIdAndUpdate(post._id, post, { new: true });
	}

	delete(postId) {
		if (!postId) {
			throw new Error('Id не указан');
		}
		return Post.findByIdAndDelete(postId);
	}

	deleteAll() {
		return Post.deleteMany();
	}
}

export default new PostService;