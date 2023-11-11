import { ComponentType } from 'react';
import useAllPosts from '@utils/hooks/useAllPosts';
import styles from '@pages/MainPage/MainPage.module.scss';
import Loader from '@components/Loader';
import { AppNotification } from '@assets/enums';
import appStyles from '@/App.module.scss';
import CardItem from '@components/CardItem';

const CardItems: ComponentType = () => {
	const { cards, isError, isLoading } = useAllPosts();
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
				{ cards.map((message) => <CardItem key={ message._id } { ...message } />) }
			</div>
	);
};

export default CardItems;