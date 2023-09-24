import React, { FC } from 'react';
import useUserFunctions from '@utils/hooks/useUserFunctions';
import Layout from '@components/Layout';
import appStyles from '@/App.module.scss';
import Message from '@components/Message';
import UseAdminFunctions from '@utils/hooks/useAdminFunctions';
import styles from './AdminPage.module.scss';
import Loader from '@components/Loader';
import { useNavigate } from 'react-router-dom';
import useToken from '@utils/hooks/useToken';

const AdminPage: FC = () => {
	const { isSuccess, isError, isLoading, messages } = useUserFunctions();
	const { register, handleSubmit, onSubmit } = UseAdminFunctions();
	const { isToken } = useToken();
	const navigate = useNavigate();
	
	if (!isToken) {
		navigate('/authorization');
	}
	
	return (
		<Layout>
			<section className={ styles.adminWrapper }>
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
				<form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
					<h3>Create post</h3>
					<input required placeholder='Title' className={ styles.input } { ...register('title') } />
					<input required placeholder='Description' className={ styles.input } { ...register('desc') } />
					<input required placeholder='Keywords' className={ styles.input } { ...register('keywords') } />
					<input className={ styles.btn } type='submit'/>
				</form>
			</section>
		</Layout>
	);
};

export default AdminPage;