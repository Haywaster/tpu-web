import Layout from '@components/Layout';
import adminStyles from '@pages/AdminPage/AdminPage.module.scss';
import useCreatePost from '@utils/hooks/useCreatePost';

const RegistrationPage = () => {
	const { register, handleSubmit, onSubmit } = useCreatePost();
	
	return (
		<Layout>
			<form className={ adminStyles.authorizationForm } onSubmit={ handleSubmit(onSubmit) }>
				<h3>Registration</h3>
				{/*<input required placeholder='Login' className={ adminStyles.input } { ...register('login') } />*/ }
				{/*<input required placeholder='Password' className={ adminStyles.input } { ...register('password') } />*/ }
				{/*<input required placeholder='Repeat password' className={ adminStyles.input } { ...register('password') } />*/ }
				<input className={ adminStyles.btn } type='submit' value='Registration'/>
			</form>
		</Layout>
	);
};

export default RegistrationPage;