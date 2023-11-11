import { ComponentType } from 'react';
import Layout from '@components/Layout';
import { BsCart2 } from 'react-icons/bs';
import CartItems from '@components/CartItems';

const CartPage: ComponentType = () => {
	return (
		<Layout>
			<h1>Your cart <BsCart2/></h1>
			<CartItems/>
		</Layout>
	);
};

export default CartPage;