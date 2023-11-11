import styles from '@pages/AdminPage/AdminPage.module.scss';
import { filterItems } from '@assets/consts';
import useCreatePost from '@utils/hooks/useCreatePost';

const SendItemForm = () => {
	const { register, handleSubmit, onSubmit, watch } = useCreatePost();
	const categoryItems = filterItems.filter(item => item !== 'All');
	
	return (
		<form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
			<h3>Add new watch</h3>
			
			<input
				required
				placeholder='Title'
				className={ styles.input }
				{ ...register('name') }
			/>
			
			<textarea
				required
				placeholder='Description'
				className={ styles.textarea }
				{ ...register('description') }
			/>
			
			<input
				required
				placeholder='Price'
				type='number'
				className={ styles.input }
				{ ...register('price') }
			/>
			
			<select className={ styles.select } { ...register('category') }>
				{ categoryItems.map(item => <option key={ item } value={ item }>{ item }</option>) }
			</select>
			
			<fieldset className={ styles.fileInput }>
				<input
					id='image'
					required
					type='file'
					accept='image/*'
					{ ...register('image') }
				/>
				<label htmlFor='image'>
					{ !watch('image') || watch('image').length === 0 ? 'Select file...' :
						watch('image')[0].name }
				</label>
			</fieldset>
			
			<input value='Create' className={ styles.btn } type='submit'/>
		</form>
	);
};

export default SendItemForm;
