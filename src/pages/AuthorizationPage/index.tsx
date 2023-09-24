import Layout from '@components/Layout';
import adminStyles from '@pages/AdminPage/AdminPage.module.scss';
import UseAdminFunctions from '@utils/hooks/useAdminFunctions';

const AuthorizationPage = () => {
	const { register, handleSubmit, onSubmit } = UseAdminFunctions();
	
	return (
		<Layout>
			<form className={ adminStyles.authorizationForm } onSubmit={ handleSubmit(onSubmit) }>
				<h3>Login admin</h3>
				<input required placeholder='Login' className={ adminStyles.input } { ...register('login') } />
				<input required placeholder='Password' className={ adminStyles.input } { ...register('password') } />
				<input className={ adminStyles.btn } type='submit' value='Login'/>
			</form>
		</Layout>
	);
};

export default AuthorizationPage;