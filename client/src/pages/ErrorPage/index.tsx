import Layout from '@components/Layout';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
	return (
		<Layout>
			<code className={ styles.code }>
				Sorry, this page doesn't exist :(
				<br/>
				Please, redirect to back
			</code>
		</Layout>
	);
};

export default ErrorPage;