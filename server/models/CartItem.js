import mongoose from 'mongoose';

const CartItem = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	image: { type: String }
});

export default mongoose.model('CartItem', CartItem);