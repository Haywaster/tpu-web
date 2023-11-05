import { ComponentType, MouseEvent, useEffect, useState } from 'react';
import { ICardData } from '@types';

import appStyles from '@/App.module.scss';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { url } from '@service/PostService';
import useCartData from '@utils/hooks/useCartData';

const CardItem: ComponentType<ICardData> = ({ image, name, description, price, category, _id }) => {
	const { cart, addItem, deleteItem } = useCartData();
	const [isBackSide, setIsBackSide] = useState(false);
	const [isItemInCart, setIsItemInCart] = useState(false);
	
	const onChangeCardSide = () => setIsBackSide(prev => !prev);
	
	const isItemInCartHandler = (e: MouseEvent) => {
		e.stopPropagation();
		setIsItemInCart(prev => {
			!prev ? addItem(_id) : deleteItem(_id);
			return !prev;
		});
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
				{ !isItemInCart ?
					<AiOutlineHeart onClick={ isItemInCartHandler } className={ appStyles.heart }/> :
					<AiFillHeart onClick={ isItemInCartHandler } className={ appStyles.heart }/> }
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