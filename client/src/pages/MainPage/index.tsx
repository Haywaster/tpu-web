import Layout from '@components/Layout';
import styles from './MainPage.module.scss';
import SearchWrapper from '@components/SearchWrapper';
import CardItems from '@components/CardItems';
import { ComponentType } from 'react';

const MainPage: ComponentType = () => {
	return (
		<Layout>
			<h1>Welcome to <span>ClockClick</span>!</h1>
			<section className={ styles.userMessageWrapper }>
				<SearchWrapper/>
				<CardItems/>
			</section>
		</Layout>
	);
};

export default MainPage;