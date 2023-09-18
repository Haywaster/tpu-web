import { FC } from 'react';
import useUserFunctions from '@utils/hooks/useUserFunctions';
import Layout from '@components/Layout';
import appStyles from '@/App.module.scss';
import Message from '@components/Message';

const AdminPage: FC = () => {
	const { isSuccess, isError, isLoading, messages } = useUserFunctions();
	
	return (
		<Layout isLoading={ isLoading } isSuccess={ isSuccess } isError={ isError }>
			<div className={ appStyles.messages }>
				{ messages?.length === 0 && <p className={ appStyles.noMessagesError }>There are no messages :(</p> }
				{ messages?.map(message => (
					<Message key={ message.id } { ...message }/>
				)) }
			</div>
		</Layout>
	);
};

export default AdminPage;