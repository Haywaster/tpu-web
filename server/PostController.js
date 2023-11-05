import PostService from './PostService.js';

class PostController {
	async createPost(req, res) {
		try {
			const post = await PostService.create(req.body, req.files.image);
			return res.json(post);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async getAll(req, res) {
		try {
			const { category, search } = req.query;
			const posts = await PostService.getAll(category, search);
			return res.json(posts);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async getOne(req, res) {
		try {
			const post = await PostService.getOne(req.params.id);
			return res.json(post);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async update(req, res) {
		try {
			const updatedPost = await PostService.update(req.body);
			return res.json(updatedPost);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async delete(req, res) {
		try {
			const post = await PostService.delete(req.params.id);
			return res.json(post);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async deleteAll(req, res) {
		try {
			const posts = await PostService.deleteAll();
			return res.json(posts);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}

export default new PostController;