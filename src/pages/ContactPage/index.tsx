import Layout from '@components/Layout';
import { socialLinks } from '@assets/consts';

import styles from './ContactPage.module.scss';
import { ILogData } from '@/@types';
import { getLogData } from '@utils/libs/getLogData';
import { addLog } from '@redux/slices/logSlice';
import { useDispatch } from 'react-redux';

const ContactsPage = () => {
	const dispatch = useDispatch();
	
	const downloadHandler = (name: string) => {
		const action: string = `Clicked on "${ name }" contact link"`;
		const logData: ILogData = getLogData(action);
		dispatch(addLog(logData));
	};
	
	return (
		<Layout>
			<h2>There are our contact links</h2>
			<ul className={ styles.socialWrapper }>
				{ socialLinks.map(el => (
					<li key={ el.name } onClick={ () => downloadHandler(el.name) }>
						<a href={ el.href } target='_blank' rel='noreferrer'>
							<figure>
								<img src={ `${ window.location.origin }/images/${ el.imageSrc }` } alt={ el.name }/>
								<figcaption>{ el.name }</figcaption>
							</figure>
						</a>
					</li>
				)) }
			</ul>
		</Layout>
	);
};

export default ContactsPage;