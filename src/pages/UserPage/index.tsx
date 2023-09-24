import useUserFunctions from '@utils/hooks/useUserFunctions';
import Message from '@components/Message';
import Layout from '@components/Layout';

import appStyles from '@/App.module.scss';
import styles from './UserPage.module.scss';
import Loader from '@components/Loader';
import useLogData from '@utils/hooks/useLogData';

const UserPage = () => {
	const { searchHandler, search, isSuccess, isError, isLoading, messages, debounceSearch } = useUserFunctions();
	const {downloadLogs} = useLogData(debounceSearch)
	
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
				<button onClick={ downloadLogs }>Download Logs</button>
				
			</section>
		</Layout>
	);
};

export default UserPage;