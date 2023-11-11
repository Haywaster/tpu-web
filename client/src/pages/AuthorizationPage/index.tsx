import Layout from '@components/Layout';
import adminStyles from '@pages/AdminPage/AdminPage.module.scss';

const AuthorizationPage = () => {
	return (
		<Layout>
			{/*<form className={ adminStyles.authorizationForm } onSubmit={ handleSubmit(onSubmit) }>*/ }
			<h3>Authorization</h3>
			{/*<input required placeholder='Login' className={ adminStyles.input } { ...register('login') } />*/ }
			{/*<input required placeholder='Password' className={ adminStyles.input } { ...register('password') } />*/ }
			<input className={ adminStyles.btn } type='submit' value='Login'/>
			{/*</form>*/ }
		</Layout>
	);
};

export default AuthorizationPage;