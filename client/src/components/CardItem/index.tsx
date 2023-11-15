import { ComponentType, MouseEvent, useEffect, useState } from 'react';
import { ICardData } from '@types';

import appStyles from '@/App.module.scss';
import { API_URL as url } from '@services/http';
import useCartData from '@utils/hooks/useCartData';
import useDeletePost from '@utils/hooks/useDeletePost';
import { ImCross } from 'react-icons/im';
import { BsCart, BsCartCheck } from 'react-icons/bs';
import useActions from '@utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { toast } from 'react-hot-toast';

interface IProps extends ICardData {
	isAdmin?: boolean;
}

const CardItem: ComponentType<IProps> = ({ image, name, description, price, category, _id, isAdmin }) => {
	const token = localStorage.getItem('token');
	const { isFirstItemInCartNotice } = useSelector((state: RootState) => state.workspace);
	const { setFirstItemInCartNotice,addCartItemCounter, removeCartItemCounter } = useActions();
	const { cart, addItemInCart, deleteItemFromCart } = useCartData();
	const { deleteItemInProject } = useDeletePost();
	const [isBackSide, setIsBackSide] = useState(false);
	const [isItemInCart, setIsItemInCart] = useState(false);
	
	const onChangeCardSide = () => setIsBackSide(prev => !prev);
	
	const addItemInCartHandler = (id: string) => {
		if (isFirstItemInCartNotice && cart?.length === 0) {
			toast.success('The product has been added to your cart!', {
				duration: 2000
			});
			setFirstItemInCartNotice(false);
		}
		addItemInCart(id);
		addCartItemCounter();
	};
	
	const deleteItemFromCartHandler = (id: string) => {
		if (isFirstItemInCartNotice) {
			setFirstItemInCartNotice(false);
		}
		deleteItemFromCart(id);
		removeCartItemCounter();
	}
	
	const isItemInCartHandler = (e: MouseEvent) => {
		e.stopPropagation();
		setIsItemInCart(prev => {
			!prev ? addItemInCartHandler(_id) : deleteItemFromCartHandler(_id);
			return !prev;
		});
	};
	
	const deleteItemHandler = (e: MouseEvent) => {
		e.stopPropagation();
		deleteItemInProject(_id);
	};
	
	useEffect(() => {
		if (cart?.find(item => item.name === name)) {
			setIsItemInCart(true);
		}
	}, [cart]);
	
	return (
		<div
			className={ `${ appStyles.card } ${ isBackSide ? appStyles.flipped : '' }` }
			key={ name }
			onClick={ onChangeCardSide }>
			
			<div className={ appStyles.frontSide }>
				{ token && (
					<div className={ appStyles.icons } style={ { background: isItemInCart ? '#51D75184' : '' } }>
						{ !isItemInCart ?
							<BsCart onClick={ isItemInCartHandler } className={ appStyles.heart }/> :
							<BsCartCheck onClick={ isItemInCartHandler } className={ appStyles.heart }/> }
						{ isAdmin && <ImCross onClick={ deleteItemHandler } className={ appStyles.cross }/> }
					</div>
				) }
				<img className={ appStyles.image }
					src={ url + image }
					alt={ name }/>
				<div className={ appStyles.titleWrapper }>
					<h2>{ name }</h2>
					<p>{ price } $</p>
				</div>
			</div>
			<div className={ appStyles.backSide }>
				<h3>{ category }</h3>
				<p>{ description }</p>
			</div>
		</div>
	);
};

export default CardItem;