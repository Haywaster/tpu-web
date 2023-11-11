import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartService } from '@service/CartService';

const useCartData = () => {
	const queryClient = useQueryClient();
	
	const { isLoading, isError, data: cart } = useQuery(
		['getAllCards'],
		() => CartService.getAll(),
		{ select: ({ data }) => data }
	);
	
	const { mutate: addItemInCart } = useMutation(
		['addInCart'],
		(id: string) => CartService.addToCart(id)
	);
	
	const { mutate: deleteItemFromCart } = useMutation(
		['deleteItem'],
		(id: string) => CartService.delete(id), {
			onSuccess: () => {
				queryClient.invalidateQueries(['getAllCards']);
			}
		}
	);
	
	return { isLoading, isError, cart, addItemInCart, deleteItemFromCart };
};

export default useCartData;