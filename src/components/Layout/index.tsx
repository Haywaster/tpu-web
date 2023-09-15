import React, { ComponentType, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import useSearchMessages from '@utils/hooks/useSearchMessages';

import styles from './Layout.module.scss';

interface IProps {
	children: ReactNode;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
}

const Layout: ComponentType<IProps> = ({ children, isLoading, isError, isSuccess }) => {
	const { searchHandler, search } = useSearchMessages();
	const { pathname } = useLocation();
	const isUserPage = pathname === '/';
	
	return (
		<div className={ styles.layout }>
			<div className={ styles.wrapper }>
				{ isUserPage && (
					<input className={ styles.input }
						placeholder='Search...'
						type='search'
						value={ search }
						onChange={ searchHandler }/>
				) }
				
				{ isLoading && <p>Loading...</p> }
				{ isError && <p>An error has occurred</p> }
				{ isSuccess && (
					<>
						{ children }
					</>
				) }
			</div>
		</div>
	);
};

export default Layout;