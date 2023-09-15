import React from 'react';
import { IMessage } from '@types';

import styles from '@pages/UserPage/UserPage.module.scss';

const Message = ({ id, title, keywords, desc }: IMessage) => {
	return (
		<div key={ id } className={ styles.message }>
			<div className={ styles.titleWrapper }>
				<h2>{ title }</h2>
				<div className={ styles.keywords }>
					{ keywords.map((keyword, index) => (
						<h3 key={ index }>{ keyword }</h3>
					)) }
				</div>
			</div>
			<p>{ desc }</p>
		</div>
	);
};

export default Message;