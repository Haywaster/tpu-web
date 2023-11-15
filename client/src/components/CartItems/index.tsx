import styles from '@pages/CartPage/CartPage.module.scss';
import Loader from '@components/Loader';
import { AppNotification } from '@assets/enums';
import useCartData from '@utils/hooks/useCartData';
import { ICardData } from '@types';
import CartItem from '@components/CartItem';
import { logActions } from '@redux/slices/logSlice';
import useActions from '@utils/hooks/useActions';

const CartItems = () => {
	const { cart, isLoading, isError, deleteItemFromCart } = useCartData();
	const {removeCartItemCounter} = useActions()
	const onDeleteItem = (id: string) => {
		deleteItemFromCart(id);
		removeCartItemCounter()
	};
	
	const calculateTotalPrice = (cart?: ICardData[]): number => (
		cart ? Number(cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)) : 0
	);
	
	const totalPrice = calculateTotalPrice(cart);
	
	const cartContent = cart?.length === 0
		? <p className={ styles.emptyCart }>{ AppNotification.CART_EMPTY }</p>
		: cart?.map(item => <CartItem key={ item._id } item={ item } onDelete={ onDeleteItem }/>);
	
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
			{ cart && cart.length !== 0 &&
				<p className={ styles.result }>Total count:
					<span> { cart.length }</span> by price <span>{ totalPrice }</span>
				</p> }
		</div>
	);
};

export default CartItems;