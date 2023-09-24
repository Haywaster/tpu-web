import Layout from '@components/Layout';
import { socialLinks } from '@assets/consts';

import styles from './ContactPage.module.scss'

const ContactsPage = () => {
	return (
		<Layout>
			<h2>There are our contact links</h2>
			<ul className={styles.socialWrapper}>
				{socialLinks.map(el => (
					<li key={el.name}>
						<a href={el.href} target='_blank' rel="noreferrer">
							<figure>
								<img src={`${window.location.origin}/images/${el.imageSrc}`} alt={el.name}/>
								<figcaption>{el.name}</figcaption>
							</figure>
						</a>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export default ContactsPage;