import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartService } from '@/services/CartService';
import useActions from '@utils/hooks/useActions';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '@assets/enums';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const useCartData = () => {
	const queryClient = useQueryClient();
	const token = localStorage.getItem('token');
	const {userData} = useSelector((state: RootState) => state.workspace);
	const { setCartItemCounter, addCartItemCounter, removeCartItemCounter } = useActions();
	const {pathname} = useLocation();
	const isCartPage = pathname === AppRoutes.CART;
	
	const { isLoading, isError, data: cart } = useQuery(
		['getAllCards', userData?.username],
		() => CartService.getAll(),
		{ select: ({ data }) => data, enabled: !!token && !!userData.username, refetchOnWindowFocus: false }
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