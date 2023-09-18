import { SubmitHandler, useForm } from 'react-hook-form';
import { IMessagePost, IMessageSend } from '@/@types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageService } from '@service/MessageService';

const UseAdminFunctions = () => {
	const { register, handleSubmit, reset } = useForm<IMessageSend>();
	const queryClient = useQueryClient();
	
	const { mutate } = useMutation(['create message'], (body: IMessagePost) => MessageService.post(body), {
		onSuccess() {
			queryClient.invalidateQueries(['get all messages']);
		}
	});
	
	const onSubmit: SubmitHandler<IMessageSend> = data => {
		const newKeyWords = data.keywords.split(', ');
		
		reset();
		mutate({ ...data, keywords: newKeyWords });
	};
	
	const { mutate: deleteMutate } = useMutation(['delete message'], (id: string) => MessageService.delete(id), {
		onSuccess() {
			queryClient.invalidateQueries(['get all messages']);
		}
	});
	
	return { onSubmit, handleSubmit, register, deleteMutate };
};

export default UseAdminFunctions;