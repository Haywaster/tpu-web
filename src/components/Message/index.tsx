import React from 'react';
import { IMessage } from '@types';

import appStyles from '@/App.module.scss';
import { useLocation } from 'react-router-dom';
import useAdminFunctions from '@utils/hooks/useAdminFunctions';

const Message = ({ id, title, keywords, desc }: IMessage) => {
	const { deleteMutate } = useAdminFunctions();
	
	const { pathname } = useLocation();
	const isAdmin = pathname === '/admin';
	
	const deleteHandler = (id: string) => {
		deleteMutate(id);
	};
	
	return (
		<div key={ id } className={ appStyles.message }>
			<div className={ appStyles.titleWrapper }>
				<h2>{ title }</h2>
				<div className={ appStyles.keywords }>
					{ keywords.map((keyword, index) => (
						<h3 key={ index }>{ keyword }</h3>
					)) }
				</div>
				{ isAdmin && <button onClick={ () => deleteHandler(id) } className={ appStyles.closeBnt }>✖</button> }
			</div>
			<p>{ desc }</p>
		</div>
	);
};

export default Message;