import { ComponentType } from 'react';
import useAllPosts from '@utils/hooks/useAllPosts';
import styles from '@pages/MainPage/MainPage.module.scss';
import Loader from '@components/Loader';
import { AppNotification } from '@assets/enums';
import appStyles from '@/App.module.scss';
import CardItem from '@components/CardItem';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import useCartData from '@utils/hooks/useCartData';

const CardItems: ComponentType = () => {
	const { userData } = useSelector((state: RootState) => state.workspace);
	const isAdmin = userData?.roles?.[0] === 'ADMIN';
	const { cards, isError, isLoading } = useAllPosts();
	const { cart, addItemInCart, deleteItemFromCart } = useCartData();
	const hasCards = cards && cards.length > 0;
	
	if (isLoading) {
		return <div className={ styles.loaderWrapper }><Loader/></div>;
	}
	
	if (isError) {
		return <p>{ AppNotification.ERROR_MESSAGE }</p>;
	}
	
	return (
		!hasCards ?
			<p className={ appStyles.noCardsError }>{ AppNotification.NO_MESSAGE }</p> :
			<div className={ appStyles.cards }>
				{ cards.map(message =>
					<CardItem
						alreadyInCart={ !!(cart && cart.items.length && cart.items.some(item => item._id === message._id)) }
						addItemInCart={ addItemInCart }
						deleteItemFromCart={ deleteItemFromCart }
						isAdmin={ isAdmin }
						key={ message._id } { ...message } />) }
			</div>
	);
};

export default CardItems;