import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostService } from '@service/PostService';

const useDeletePost = () => {
	const queryClient = useQueryClient();
	
	const { mutate: deleteItemInProject } = useMutation(
		['deletePost'],
		(id: string) => PostService.delete(id),
		{
			onSuccess() {
				queryClient.invalidateQueries(['getAllPosts']);
			}
		});
	
	return { deleteItemInProject };
};

export default useDeletePost;