import { useForm } from 'react-hook-form';
import { ILoginFormData } from '@types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '@/services/LoginService';
import { AppRoutes } from '@assets/enums';

const useRegistration = () => {
	const { register, handleSubmit } = useForm<ILoginFormData>();
	const navigate = useNavigate();
	
	const { mutate: postRegisterData } = useMutation(
		['registration'],
		(body: ILoginFormData) => LoginService.registration(body),
		{
			onSuccess() {
				navigate(AppRoutes.AUTHORIZATION);
			}
		});
	
	const { mutate: postLoginData } = useMutation(
		['authorization'],
		(body: ILoginFormData) => LoginService.authorization(body),
		{
			onSuccess(token) {
				localStorage.setItem('token', token);
				navigate(AppRoutes.MAIN);
			}
		});
	
	return { handleSubmit, register, postRegisterData, postLoginData };
};

export default useRegistration;