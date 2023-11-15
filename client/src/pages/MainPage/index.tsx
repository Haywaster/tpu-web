import Layout from '@components/Layout';
import styles from './MainPage.module.scss';
import SearchWrapper from '@components/SearchWrapper';
import CardItems from '@components/CardItems';
import { ComponentType, useEffect } from 'react';
import LendingPage from '@pages/LendingPage';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';

const MainPage: ComponentType = () => {
	const { userData, isLending } = useSelector((state: RootState) => state.workspace);
	
	if (isLending && !userData._id) {
		return <LendingPage/>;
	}
	
	return (
		<Layout>
			<h1>Welcome to <span>ClockClick</span>!</h1>
			<section className={ styles.userMessageWrapper }>
				<SearchWrapper/>
				<CardItems/>
			</section>
			<Toaster
				position='bottom-right'
				reverseOrder={ false }
			/>
		</Layout>
	);
};

export default MainPage;