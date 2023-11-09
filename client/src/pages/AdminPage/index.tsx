import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserFunctions from '@utils/hooks/useUserFunctions';
import useAdminFunctions from '@utils/hooks/useAdminFunctions';

import CardItem from '@components/CardItem';
import Layout from '@components/Layout';

import appStyles from '@/App.module.scss';
import styles from './AdminPage.module.scss';
import { AppNotification } from '@assets/enums';

const AdminPage: FC = () => {
	const { isError, cards } = useUserFunctions();
	const { register, handleSubmit, onSubmit } = useAdminFunctions();
	// const { isToken } = useFindRole();
	const navigate = useNavigate();
	
	// if (!isToken) {
	// 	navigate('/authorization');
	// }
	
	return (
		<Layout>
			<section className={ styles.adminWrapper }>
				{/*{ isLoading && <div className={ styles.loaderWrapper }><Loader/></div> }*/ }
				{ isError && <p>{ AppNotification.ERROR_MESSAGE }</p> }
				<div className={ appStyles.cards }>
					{ cards?.map(message => (
						<CardItem key={ message._id } { ...message }/>
					)) }
				</div>
				{ cards?.length === 0 && <p className={ styles.emptyCart }>{ AppNotification.NO_MESSAGE }</p> }
				<form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
					<h3>Create post</h3>
					{/*<input required placeholder='Title' className={ styles.input } { ...register('title') } />*/ }
					{/*<input required placeholder='Description' className={ styles.input } { ...register('desc') } />*/ }
					{/*<input required placeholder='Keywords' className={ styles.input } { ...register('keywords') } />*/ }
					<input className={ styles.btn } type='submit'/>
				</form>
			</section>
		</Layout>
	);
};

export default AdminPage;