import CardItem from '@components/CardItem';
import Layout from '@components/Layout';

import appStyles from '@/App.module.scss';
import styles from './UserPage.module.scss';
import Loader from '@components/Loader';
import SearchWrapper from '@components/SearchWrapper';
import { AppNotification } from '@assets/enums';
import useAllPosts from '@utils/hooks/useAllPosts';


const MainPage = () => {
	const { cards, isFetching, isError } = useAllPosts();
	const hasCards = cards && cards.length > 0;
	
	return (
		<Layout>
			<h1>Welcome to <span style={ { color: 'yellow' } }>ClockClick</span>!</h1>
			<section className={ styles.userMessageWrapper }>
				<SearchWrapper/>
				{ isFetching ? (
					<div className={ styles.loaderWrapper }><Loader/></div>
				) : isError ? (
					<p>{ AppNotification.ERROR_MESSAGE }</p>
				) : !hasCards ? (
					<p className={ appStyles.noCardsError }>{ AppNotification.NO_MESSAGE }</p>
				) : (
					<div className={ appStyles.cards }>
						{ cards.map((message) => (
							<CardItem key={ message._id } { ...message } />
						)) }
					</div>
				) }
			</section>
		</Layout>
	);
};

export default MainPage;