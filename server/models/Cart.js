import { model, Schema } from 'mongoose';

const Cart = new Schema({
	items: [{ type: Object, required: true }]
});

export default model('Cart', Cart);
