import { ComponentType, MouseEvent, useEffect, useState } from 'react';
import { ICardData } from '@types';

import appStyles from '@/App.module.scss';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '@redux/slices/cartSlice';

const CardItem: ComponentType<ICardData> = ({ image, name, description, price, category, id }) => {
	const [isBackSide, setIsBackSide] = useState(false);
	const [isItemInCart, setIsItemInCart] = useState(false);
	const dispatch = useDispatch();
	
	const onChangeCardSide = () => setIsBackSide(prev => !prev);
	
	const isItemInCartHandler = (e: MouseEvent) => {
		e.stopPropagation(); // Предотвращаем распространение события вверх по DOM иерархии
		setIsItemInCart(prev => !prev);
	};
	
	useEffect(() => {
		if (isItemInCart) {
			dispatch(addItem({ image, name, description, price, category, id }));
		} else {
			dispatch(removeItem(id));
		}
	}, [isItemInCart]);
	
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
					src='https://watch-planet.ru/upload/iblock/588/x2ja7jcw2h7u21yz2b965806exjt2bhs/SEM_2597.jpg'
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