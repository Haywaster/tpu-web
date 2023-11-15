import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartService } from '@/services/CartService';
import useActions from '@utils/hooks/useActions';
import { useEffect } from 'react';

const useCartData = () => {
	const { setCartItemCounter} = useActions()
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
	
	useEffect(() => {
		if (cart) {
			setCartItemCounter(cart.length)
		}
	}, [cart]);
	
	return { isLoading, isError, cart, addItemInCart, deleteItemFromCart };
};

export default useCartData;