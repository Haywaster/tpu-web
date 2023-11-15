import { model, Schema } from 'mongoose';

const CartItem = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	image: { type: String }
});

export default model('CartItem', CartItem);