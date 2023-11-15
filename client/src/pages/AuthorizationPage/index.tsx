import Layout from '@components/Layout';
import adminStyles from '@pages/AdminPage/AdminPage.module.scss';
import useRegistration from '@utils/hooks/useRegistration';
import { SubmitHandler } from 'react-hook-form';
import { ILoginFormData } from '@/@types';

const AuthorizationPage = () => {
	const {register, postLoginData, handleSubmit} = useRegistration()
	
	const onSubmit: SubmitHandler<ILoginFormData> = data => {
		postLoginData(data);
	};
	
	return (
		<Layout>
			<form className={ adminStyles.authorizationForm } onSubmit={ handleSubmit(onSubmit) }>
				<h3>Authorization</h3>
				<input required placeholder='Login' className={ adminStyles.input } { ...register('username') } />
				<input required type='password' placeholder='Password' className={ adminStyles.input } { ...register('password') } />
				<input className={ adminStyles.btn } type='submit' value='Login'/>
			</form>
		</Layout>
	);
};

export default AuthorizationPage;