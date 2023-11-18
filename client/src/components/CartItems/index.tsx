import styles from '@pages/CartPage/CartPage.module.scss';
import Loader from '@components/Loader';
import { AppNotification } from '@assets/enums';
import useCartData from '@utils/hooks/useCartData';
import { ICardData } from '@types';
import CartItem from '@components/CartItem';
import { ComponentType } from 'react';

const CartItems: ComponentType = () => {
	const { cart, isLoading, isError, deleteItemFromCart } = useCartData();
	const cartItems = cart?.items
	const onDeleteItem = (id: string) => deleteItemFromCart(id);
	
	const calculateTotalPrice = (cart?: ICardData[]): number => (
		cart ? Number(cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)) : 0
	);
	
	const totalPrice = calculateTotalPrice(cartItems);
	
	const cartContent = cartItems?.length === 0
		? <p className={ styles.emptyCart }>{ AppNotification.CART_EMPTY }</p>
		: cartItems?.map(item => <CartItem key={ item._id } item={ item } onDelete={ onDeleteItem }/>);
	
	if (isLoading) {
		return (
			<div className={ styles.cartWrapper }>
				<div className={ styles.loaderWrapper }><Loader/></div>
			</div>
		);
	}
	
	if (isError) {
		return (
			<div className={ styles.cartWrapper }>
				<p>{ AppNotification.ERROR_MESSAGE }</p>;
			</div>
		);
	}
	
	return (
		<div className={ styles.cartWrapper }>
			{ cartContent }
			{ cartItems && cartItems.length !== 0 &&
				<p className={ styles.result }>Total count:
					<span> { cartItems.length }</span> by price <span>{ totalPrice }</span>
				</p> }
		</div>
	);
};

export default CartItems;