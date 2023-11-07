import useUserFunctions from '@utils/hooks/useUserFunctions';
import CardItem from '@components/CardItem';
import Layout from '@components/Layout';

import appStyles from '@/App.module.scss';
import styles from './UserPage.module.scss';
import Loader from '@components/Loader';
import { getLogData } from '@utils/libs/getLogData';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLog } from '@redux/slices/logSlice';
import { ILogData } from '@types';
import SearchWrapper from '@components/SearchWrapper';
import { AppNotification } from '@assets/enums';

const UserPage = () => {
	const { isError, isLoading, cards, debounceSearch } = useUserFunctions();
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (debounceSearch) {
			const action: string = `Moved to this URL: "${ debounceSearch }"`;
			const logData: ILogData = getLogData(action);
			dispatch(addLog(logData));
		}
	}, [debounceSearch, dispatch]);
	
	return (
		<Layout>
			<h1>Welcome to <span style={ { color: 'yellow' } }>ClockClick</span>!</h1>
			<section className={ styles.userMessageWrapper }>
				<SearchWrapper/>
				{ isLoading && <div className={ styles.loaderWrapper }><Loader/></div> }
				{ isError && <p>{AppNotification.ERROR_MESSAGE}</p> }
				{ cards && (
					cards.length === 0 && <p className={ appStyles.noCardsError }>{ AppNotification.NO_MESSAGE }</p> ||
					<div className={ appStyles.cards }>
						{ cards.map(message => <CardItem key={ message._id } { ...message }/>) }
					</div>
				) }
			
			</section>
		</Layout>
	);
};

export default UserPage;