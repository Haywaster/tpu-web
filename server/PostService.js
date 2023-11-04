import Post from './Post.js';
import FileService from './FileService.js';

class PostService {
	create(post, image) {
		const fileName = FileService.saveFile(image)
		return Post.create({ ...post, image: fileName });
	}

	getAll() {
		return Post.find();
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