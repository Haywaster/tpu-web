import React, { ComponentType } from 'react';
import Layout from '@components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { BsCart2 } from 'react-icons/bs';
import styles from './CartPage.module.scss';

const CartPage: ComponentType = () => {
	const {items} = useSelector((state: RootState) => state.cart)

	return (
		<Layout>
			<h1>Your cart <BsCart2/></h1>
			<div className={styles.cartWrapper}>
				{items.map(item => (
					<div className={styles.cartItem}>
						<img src={item.image} alt={item.name}/>
						<p>{item.name}</p>
						<p>{item.price}</p>
						<p>{item.category}</p>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default CartPage;