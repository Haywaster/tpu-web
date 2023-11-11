import { ComponentType } from 'react';
import styles from '@pages/CartPage/CartPage.module.scss';
import { url } from '@service/PostService';
import { ImCross } from 'react-icons/im';
import { ICardData } from '@types';

interface IProps {
	item: ICardData,
	onDelete: (id: string) => void
}

const CartItem: ComponentType<IProps> = ({ item, onDelete }) => (
	<div key={ item._id } className={ styles.cartItem }>
		<img src={ url + item.image } alt={ item.name }/>
		<p>{ item.name }</p>
		<p>{ item.price }</p>
		<p>{ item.category }</p>
		<ImCross className={ styles.deleteCross } onClick={ () => onDelete(item._id) }/>
	</div>
);

export default CartItem;