import React, { ComponentType } from 'react';
import Layout from '@components/Layout';
import { BsCart2 } from 'react-icons/bs';
import styles from './CartPage.module.scss';
import useCartData from '@utils/hooks/useCartData';
import Loader from '@components/Loader';
import { url } from '@service/PostService';
import { ImCross } from 'react-icons/im';
import { AppNotification } from '@assets/enums';
import { ICardData } from '@/@types';

interface ICartItemProps {
	item: ICardData,
	onDelete: (id: string) => void
}

const CartItem: ComponentType<ICartItemProps> = ({ item, onDelete }) => (
	<div key={ item._id } className={ styles.cartItem }>
		<img src={ url + item.image } alt={ item.name }/>
		<p>{ item.name }</p>
		<p>{ item.price }</p>
		<p>{ item.category }</p>
		<ImCross className={ styles.deleteCross } onClick={ () => onDelete(item._id) }/>
	</div>
);

const CartPage: ComponentType = () => {
	const { cart, isLoading, isError, deleteItem } = useCartData();
	
	const onDeleteItem = (id: string) => deleteItem(id);
	
	const calculateTotalPrice = (cart?: ICardData[]): number => {
		if (cart) return Number(cart.reduce((acc, item) => acc + item.price, 0).toFixed(2));
		
		return 0;
	};
	
	const totalPrice = calculateTotalPrice(cart);
	
	const cartContent = cart?.length === 0
		? <p className={ styles.emptyCart }>{ AppNotification.CART_EMPTY }</p>
		: cart?.map(item => <CartItem key={ item._id } item={ item } onDelete={ onDeleteItem } />);
	
	return (
		<Layout>
			<h1>Your cart <BsCart2/></h1>
			<div className={ styles.cartWrapper }>
				{ isLoading && <div className={ styles.loaderWrapper }><Loader/></div> }
				{ isError && <p>{ AppNotification.ERROR_MESSAGE }</p> }
				{ cartContent }
				{ cart?.length ? <p className={styles.result}>Total count: <span>{ cart.length }</span> by price <span>{ totalPrice + 1 }</span></p> : null}
			</div>
		</Layout>
	);
};

export default CartPage;