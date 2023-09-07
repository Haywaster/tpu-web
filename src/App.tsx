import { FC, MouseEvent, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import './App.css';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];

const defaultValueText: string = 'Please, choice the item...';

const App: FC = () => {
	const [text, setText] = useState<string>(defaultValueText);
	const [isClear, setIsClear] = useState<boolean>(true);
	
	const textHandler = (value: SingleValue<{ value: string, label: string } | false>): void => {
		if (value) {
			setText(value.label);
			setIsClear(false);
		}
	};
	
	const clearHandler = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setText(defaultValueText);
		setIsClear(true);
	};
	
	return (
		<div className='app'>
			<div className='wrapper'>
				<p className='header'>{ !isClear ? `This is "${ text }"` : text }</p>
				<form className='form'>
					<Select className='select'
						options={ options }
						onChange={ textHandler }
						value={ !isClear && { value: text, label: text } }/>
					<button className='clearBtn' onClick={ clearHandler }>Clear</button>
				</form>
			</div>
		</div>
	);
};

export default App;
