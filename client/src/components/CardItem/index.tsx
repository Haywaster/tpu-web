import { ComponentType, MouseEvent, useState } from 'react';
import { ICardData } from '@types';

import appStyles from '@/App.module.scss';
import { API_URL as url } from '@services/http';
import useDeletePost from '@utils/hooks/useDeletePost';
import { ImCross } from 'react-icons/im';
import { BsCart, BsCartCheck } from 'react-icons/bs';
import useActions from '@utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { toast } from 'react-hot-toast';

interface IProps extends ICardData {
	isAdmin?: boolean;
	alreadyInCart: boolean;
	addItemInCart: (id: string) => void;
	deleteItemFromCart: (id: string) => void;
}

const CardItem: ComponentType<IProps> = ({
	image,
	name,
	description,
	price,
	category,
	_id,
	isAdmin,
	addItemInCart,
	deleteItemFromCart,
	alreadyInCart
}) => {
	const token = localStorage.getItem('token');
	const { isFirstItemInCartNotice } = useSelector((state: RootState) => state.workspace);
	const { setFirstItemInCartNotice } = useActions();
	const { deleteItemInProject } = useDeletePost();
	const [isBackSide, setIsBackSide] = useState(false);
	const [isItemInCart, setIsItemInCart] = useState(alreadyInCart || false);
	
	const onChangeCardSide = () => setIsBackSide(prev => !prev);
	const cartStyles = [appStyles.icons, isItemInCart ? appStyles.inCart : ''].join(' ');
	
	const isItemInCartHandler = (e: MouseEvent) => {
		e.stopPropagation();
		setIsItemInCart(prev => !prev);
		!isItemInCart ? addItemInCartHandler(_id) : deleteItemFromCartHandler(_id);
	};
	
	const addItemInCartHandler = (id: string) => {
		if (isFirstItemInCartNotice) {
			toast.success('Товар добавлен в корзину!', {
				duration: 2000
			});
			setFirstItemInCartNotice(false);
		}
		addItemInCart(id);
	};
	
	const deleteItemFromCartHandler = (id: string) => {
		if (isFirstItemInCartNotice) {
			setFirstItemInCartNotice(false);
		}
		deleteItemFromCart(id);
	};
	
	const deleteItemHandler = (e: MouseEvent) => {
		e.stopPropagation();
		deleteItemInProject(_id);
	};
	
	return (
		<div
			className={`${appStyles.card} ${isBackSide ? appStyles.flipped : ''}`}
			key={name}
			onClick={onChangeCardSide}
		>
			<div className={appStyles.frontSide}>
				{token && (
					<div className={cartStyles}>
						{!isItemInCart ?
							<BsCart onClick={isItemInCartHandler} className={appStyles.heart} /> :
							<BsCartCheck onClick={isItemInCartHandler} className={appStyles.heart} />
						}
						{isAdmin && <ImCross onClick={deleteItemHandler} className={appStyles.cross} />}
					</div>
				)}
				<img className={appStyles.image}
					src={url + image}
					alt={name}
				/>
				<div className={appStyles.titleWrapper}>
					<h2>{name}</h2>
					<p>{price} $</p>
				</div>
			</div>
			<div className={appStyles.backSide}>
				<h3>{category}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default CardItem;