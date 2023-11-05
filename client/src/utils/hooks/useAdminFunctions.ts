import { SubmitHandler, useForm } from 'react-hook-form';
import { IAdminFormData, ILogData, IMessagePost, IMessageSend } from '@types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostService } from '@service/PostService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLogData } from '@utils/libs/getLogData';
import { addLog } from '@redux/slices/logSlice';

const useAdminFunctions = () => {
	const { register, handleSubmit, reset } = useForm<IMessageSend | IAdminFormData>();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const { mutate } = useMutation(['create message'], (body: IMessagePost) => PostService.post(body), {
		onSuccess() {
			queryClient.invalidateQueries(['get all messages']);
			const action: string = `The message wes created"`;
			const logData: ILogData = getLogData(action);
			dispatch(addLog(logData));
		}
	});
	
	const onSubmit: SubmitHandler<IMessageSend | IAdminFormData> = data => {
		if ('login' in data) {
			const authorizationData: IAdminFormData = data as IAdminFormData;
			localStorage.setItem('authorizationData', JSON.stringify(authorizationData));
			
			const action: string = `The user logged in as administrator and was redirected to "/admin"`;
			const logData: ILogData = getLogData(action);
			dispatch(addLog(logData));
			
			navigate('/admin');
		} else {
			const newKeyWords = data.keywords.split(', ');
			// mutate({ ...data, keywords: newKeyWords });
		}
		
		reset();
	};
	
	const { mutate: deleteMutate } = useMutation(['delete message'], (id: string) => PostService.delete(id), {
		onSuccess() {
			queryClient.invalidateQueries(['get all messages']);
			const action: string = `The message wes deleted"`;
			const logData: ILogData = getLogData(action);
			dispatch(addLog(logData));
		}
	});
	
	return { onSubmit, handleSubmit, register, deleteMutate };
};

export default useAdminFunctions;