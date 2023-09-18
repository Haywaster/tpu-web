import React, { ComponentType, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import useUserFunctions from '@utils/hooks/useUserFunctions';

import Loader from '@components/Loader';
import UseAdminFunctions from '@utils/hooks/useAdminFunctions';

import styles from './Layout.module.scss';
import appStyles from '@/App.module.scss';
import adminStyles from '@pages/AdminPage/AdminPage.module.scss';

interface IProps {
	children: ReactNode;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
}

const Layout: ComponentType<IProps> = ({ children, isLoading, isError, isSuccess }) => {
	const { searchHandler, search } = useUserFunctions();
	const { register, handleSubmit, onSubmit } = UseAdminFunctions();
	
	const { pathname } = useLocation();
	const isUserPage = pathname === '/';
	const isAdminPage = !isUserPage;
	
	return (
		<div className={ styles.layout }>
			{ isUserPage && <h1>Welcome to our WebMessage!</h1> }
			<div className={ isUserPage ? styles.userWrapper : styles.adminWrapper }>
				{ isUserPage && (
					<input className={ appStyles.input }
						placeholder='Search...'
						type='search'
						value={ search }
						onChange={ searchHandler }/>
				) }
				
				{ isLoading && <Loader/> }
				{ isError && <p>An error has occurred</p> }
				{ isSuccess && (
					<>
						{ children }
					</>
				) }
				
				{ isAdminPage && (
					<form className={ adminStyles.form } onSubmit={ handleSubmit(onSubmit) }>
						<h3>Create post</h3>
						<input required placeholder='Title' className={ adminStyles.input } { ...register('title') } />
						<input required placeholder='Description' className={ adminStyles.input } { ...register('desc') } />
						<input required placeholder='Keywords' className={ adminStyles.input } { ...register('keywords') } />
						<input className={ adminStyles.btn } type='submit'/>
					</form>
				) }
			</div>
		</div>
	);
};

export default Layout;