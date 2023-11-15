import { SubmitHandler, useForm } from 'react-hook-form';
import { IMessagePost, IMessagePostForBack } from '@types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostService } from '@/services/PostService';

const useCreatePost = () => {
	const { register, handleSubmit, reset, watch } = useForm<IMessagePost>();
	const queryClient = useQueryClient();
	
	const { mutate } = useMutation(
		['createPost'],
		(body: IMessagePostForBack) => PostService.post(body),
		{
			onSuccess() {
				queryClient.invalidateQueries(['getAllPosts']);
			}
		});
	
	const onSubmit: SubmitHandler<IMessagePost> = data => {
		const postData = { ...data, image: data.image[0] };
		mutate(postData);
		reset();
	};
	
	return { onSubmit, handleSubmit, register, watch };
};

export default useCreatePost;