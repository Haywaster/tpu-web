import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserFunctions from '@utils/hooks/useUserFunctions';
import useAdminFunctions from '@utils/hooks/useAdminFunctions';
import useToken from '@utils/hooks/useToken';

import CardItem from '@components/CardItem';
import Loader from '@components/Loader';
import Layout from '@components/Layout';

import appStyles from '@/App.module.scss';
import styles from './AdminPage.module.scss';

const AdminPage: FC = () => {
	const { isError, isLoading, cards } = useUserFunctions();
	const { register, handleSubmit, onSubmit } = useAdminFunctions();
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
				{ cards && (
					<div className={ appStyles.cards }>
						{ cards.length === 0 && <p className={ appStyles.noCardsError }>There are no messages :(</p> }
						{ cards.map(message => (
							<CardItem key={ message._id } { ...message }/>
						)) }
					</div>
				) }
				<form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
					<h3>Create post</h3>
					{/*<input required placeholder='Title' className={ styles.input } { ...register('title') } />*/}
					{/*<input required placeholder='Description' className={ styles.input } { ...register('desc') } />*/}
					{/*<input required placeholder='Keywords' className={ styles.input } { ...register('keywords') } />*/}
					<input className={ styles.btn } type='submit'/>
				</form>
			</section>
		</Layout>
	);
};

export default AdminPage;