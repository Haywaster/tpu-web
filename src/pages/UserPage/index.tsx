import useSearchMessages from '@utils/hooks/useSearchMessages';
import Message from '@components/Message';
import Layout from '@components/Layout';

import styles from './UserPage.module.scss';

const UserPage = () => {
	const { isSuccess, isError, isLoading, messages } = useSearchMessages();
	
	return (
		<Layout isLoading={ isLoading } isSuccess={ isSuccess } isError={ isError }>
				<div className={ styles.messages }>
					{ messages?.map(message => (
						<Message key={ message.id } { ...message }/>
					)) }
				</div>
		</Layout>
	);
};

export default UserPage;