import React, { ComponentType } from 'react';
import Layout from '@components/Layout';
import { BsCart2 } from 'react-icons/bs';
import styles from './CartPage.module.scss';
import useCartData from '@utils/hooks/useCartData';
import Loader from '@components/Loader';
import { url } from '@service/PostService';
import { ImCross } from 'react-icons/im';


const CartPage: ComponentType = () => {
	const { cart, isLoading, isError, deleteItem } = useCartData();
	
	const onDeleteItem = (id: string) => deleteItem(id);
	
	return (
		<Layout>
			<h1>Your cart <BsCart2/></h1>
			<div className={ styles.cartWrapper }>
				{ isLoading && <div className={ styles.loaderWrapper }><Loader/></div> }
				{ isError && <p>An error has occurred</p> }
				{ cart && (
					cart.length === 0 && <p className={ styles.emptyCart }>Your cart is empty :(</p> ||
					cart.map(item => (
						<div key={ item._id } className={ styles.cartItem }>
							<img src={ url + item.image } alt={ item.name }/>
							<p>{ item.name }</p>
							<p>{ item.price }</p>
							<p>{ item.category }</p>
							<ImCross className={ styles.deleteCross } onClick={ () => onDeleteItem(item._id) }/>
						</div>
					))
				) }
			</div>
		</Layout>
	);
};

export default CartPage;