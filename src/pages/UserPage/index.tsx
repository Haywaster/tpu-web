import useUserFunctions from '@utils/hooks/useUserFunctions';
import Message from '@components/Message';
import Layout from '@components/Layout';

import appStyles from '@/App.module.scss'

const UserPage = () => {
	const { isSuccess, isError, isLoading, messages } = useUserFunctions();
	
	return (
		<Layout isLoading={ isLoading } isSuccess={ isSuccess } isError={ isError }>
				<div className={ appStyles.messages }>
					{ messages?.length === 0 && <p className={appStyles.noMessagesError}>There are no messages :(</p> }
					{ messages?.map(message => (
						<Message key={ message.id } { ...message }/>
					)) }
				</div>
		</Layout>
	);
};

export default UserPage;