import { ComponentType } from 'react';
import Layout from '@components/Layout';
import styles from './AdminPage.module.scss';
import CardItems from '@components/CardItems';
import SendItemForm from '@components/SendItemForm';

const AdminPage: ComponentType = () => {
	return (
		<Layout>
			<section className={ styles.adminWrapper }>
				<SendItemForm/>
				<CardItems/>
			</section>
		</Layout>
	);
};

export default AdminPage;