import { SubmitHandler, useForm } from 'react-hook-form';
import { IAdminFormData, IMessagePost, IMessageSend } from '@types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageService } from '@service/MessageService';
import { useNavigate } from 'react-router-dom';

const UseAdminFunctions = () => {
	const { register, handleSubmit, reset } = useForm<IMessageSend | IAdminFormData>();
	const queryClient = useQueryClient();
	const navigate = useNavigate()
	
	const { mutate } = useMutation(['create message'], (body: IMessagePost) => MessageService.post(body), {
		onSuccess() {
			queryClient.invalidateQueries(['get all messages']);
		}
	});
	
	const onSubmit: SubmitHandler<IMessageSend | IAdminFormData> = data => {
		if ('login' in data) {
			const authorizationData: IAdminFormData = data as IAdminFormData;
			localStorage.setItem('authorizationData', JSON.stringify(authorizationData))
			navigate('/admin')
		} else {
			const newKeyWords = data.keywords.split(', ');
			mutate({ ...data, keywords: newKeyWords });
		}
		
		reset();
	};
	
	const { mutate: deleteMutate } = useMutation(['delete message'], (id: string) => MessageService.delete(id), {
		onSuccess() {
			queryClient.invalidateQueries(['get all messages']);
		}
	});
	
	return { onSubmit, handleSubmit, register, deleteMutate };
};

export default UseAdminFunctions;