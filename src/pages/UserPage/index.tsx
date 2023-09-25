import useUserFunctions from '@utils/hooks/useUserFunctions';
import Message from '@components/Message';
import Layout from '@components/Layout';

import appStyles from '@/App.module.scss';
import styles from './UserPage.module.scss';
import Loader from '@components/Loader';
import { getLogData } from '@utils/libs/getLogData';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLog } from '@redux/slices/logSlice';
import { ILogData } from '@/@types';

const UserPage = () => {
	const { searchHandler, search, isSuccess, isError, isLoading, messages, debounceSearch } = useUserFunctions();
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
			<h1>Welcome to our WebMessage!</h1>
			<section className={ styles.userMessageWrapper }>
				<input className={ appStyles.input }
					placeholder='Search...'
					type='search'
					value={ search }
					onChange={ searchHandler }/>
				
				{ isLoading && <div className={ styles.loaderWrapper }><Loader/></div> }
				{ isError && <p>An error has occurred</p> }
				{ isSuccess && (
					<div className={ appStyles.messages }>
						{ messages?.length === 0 && <p className={ appStyles.noMessagesError }>There are no messages :(</p> }
						{ messages?.map(message => (
							<Message key={ message.id } { ...message }/>
						)) }
					</div>
				) }
			</section>
		</Layout>
	);
};

export default UserPage;