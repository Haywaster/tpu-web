import Layout from '@components/Layout';
import adminStyles from '@pages/AdminPage/AdminPage.module.scss';
import useRegistration from '@utils/hooks/useRegistration';
import { SubmitHandler } from 'react-hook-form';
import { ILoginFormData } from '@/@types';
import Loader from '@components/Loader';
import { ErrorMessage } from '@hookform/error-message';

interface IErrors {
	root: {
		registrationError: {
			message: string;
		};
	};
}

const RegistrationPage = () => {
	const { register, handleSubmit, postRegisterData, isLoadingRegister, errors } = useRegistration();
	
	const onSubmit: SubmitHandler<ILoginFormData> = data => {
		postRegisterData(data);
	};
	
	return (
		<Layout>
			<form className={ adminStyles.authorizationForm } onSubmit={ handleSubmit(onSubmit) }>
				<h3>Registration</h3>
				<input required placeholder='Login' className={ adminStyles.input } { ...register('username') } />
				<input required type='password' placeholder='Password' className={ adminStyles.input } { ...register('password') } />
				<ErrorMessage errors={errors as IErrors} name={'root.registrationError'}/>
				{isLoadingRegister ? <Loader/> :<input className={ adminStyles.btn } type='submit' value='Registration'/>}
			</form>
		</Layout>
	);
};

export default RegistrationPage;