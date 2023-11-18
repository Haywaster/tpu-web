import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartService } from '@/services/CartService';
import useActions from '@utils/hooks/useActions';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '@assets/enums';

const useCartData = () => {
	const token = localStorage.getItem('token');
	const location = useLocation();
	const isCartPage = location.pathname === AppRoutes.CART;
	const { setCartItemCounter, addCartItemCounter, removeCartItemCounter } = useActions();
	const queryClient = useQueryClient();
	
	const { isLoading, isError, data: cart } = useQuery(
		['getAllCards'],
		() => CartService.getAll(),
		{ select: ({ data }) => data, enabled: !!token, refetchOnWindowFocus: false }
	);
	
	const { mutate: addItemInCart } = useMutation(
		['addInCart'],
		(id: string) => CartService.addToCart(id),
		{
			onSuccess: () => {
				addCartItemCounter();
			}
		}
	);
	
	const { mutate: deleteItemFromCart } = useMutation(
		['deleteItem'],
		(id: string) => CartService.delete(id), {
			onSuccess: () => {
				if (isCartPage) {
					queryClient.invalidateQueries(['getAllCards']);
				}
				removeCartItemCounter();
			}
		}
	);
	
	useEffect(() => {
		if (cart && cart.items) {
			setCartItemCounter(cart.items.length);
		}
	}, [cart]);
	
	return { isLoading, isError, cart, addItemInCart, deleteItemFromCart };
};

export default useCartData;