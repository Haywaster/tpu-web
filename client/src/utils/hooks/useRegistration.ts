import { useForm } from 'react-hook-form';
import { ILoginFormData } from '@types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '@/services/LoginService';
import { AppRoutes } from '@assets/enums';
import { AxiosError } from 'axios';

interface ICustomError {
	message: string;
}

const useRegistration = () => {
	const { register, handleSubmit, formState: { errors }, setError } = useForm<ILoginFormData>();
	const navigate = useNavigate();
	
	const { mutate: postRegisterData, isLoading: isLoadingRegister } = useMutation(
		['registration'],
		(body: ILoginFormData) => LoginService.registration(body),
		{
			onSuccess(token) {
				localStorage.setItem('token', token);
				navigate(AppRoutes.MAIN);
			},
			onError(error: AxiosError<ICustomError>) {
				setError('root.registrationError', {
					message: error.response?.data.message
				});
			}
		});
	
	const { mutate: postLoginData, isLoading: isLoadingLogin } = useMutation(
		['authorization'],
		(body: ILoginFormData) => LoginService.authorization(body),
		{
			onSuccess(token) {
				localStorage.setItem('token', token);
				navigate(AppRoutes.MAIN);
			}
		});
	
	return { handleSubmit, register, postRegisterData, postLoginData, isLoadingRegister, isLoadingLogin, errors };
};

export default useRegistration;