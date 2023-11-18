import Router from 'express';
import PostController from '../controllers/PostController.js';
import CartController from '../controllers/CartController.js';

const router = new Router();

//all items
router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getOne);
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.delete);
router.delete('/posts', PostController.deleteAll);

//cart items
router.post('/cart', CartController.addToCart);
router.get('/cart', CartController.getCart);
router.delete('/cart/:id', CartController.delete);
router.delete('/cart', CartController.deleteAll);

export default router;