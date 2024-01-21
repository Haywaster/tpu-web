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
	const [actions, setActions] = useState<{ date: string; time: string; action: string }[]>([]);
	const [isVisibleTable, setIsVisibleTable] = useState<boolean>(false);
	
	const logAction = (action: string) => {
		const now = new Date();
		const date = now.toLocaleDateString();
		const time = now.toLocaleTimeString();
		
		const logEntry = { date, time, action };
		
		setActions(prevActions => [...prevActions, logEntry]);
	};
	
	const downloadLogs = () => {
		const logData = actions.map((action) => {
			return `Date: ${ action.date }, Time: ${ action.time }, Action: ${ action.action }`;
		}).join('\n');
		
		const blob = new Blob([logData], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		
		const a = document.createElement('a');
		a.href = url;
		a.download = 'user_actions.txt';
		a.click();
		
		URL.revokeObjectURL(url);
	};
	
	const textHandler = (value: SingleValue<{ value: string, label: string } | false>): void => {
		if (value) {
			const action = `Selected ${ value.label }`;
			logAction(action);
			setIsClear(false);
			setText(value.label);
		}
	};
	
	const clearHandler = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const action = 'Clear button clicked';
		logAction(action);
		setIsClear(true);
		setText(defaultValueText);
	};
	
	return (
		<div className='app'>
			<div className='wrapper'>
				<h1 style={{textAlign: 'center'}}>Это лабораторная работа №1 по дисциплине "Облачные технологии"</h1>
				<p className='header'>{ !isClear ? `This is "${ text }"` : text }</p>
				<form className='form'>
					<Select className='select'
						options={ options }
						onChange={ textHandler }
						value={ !isClear && { value: text, label: text } }/>
					<button className='btn' onClick={ clearHandler }>Clear</button>
				</form>
			</div>
			
			<div className='btn-wrapper'>
				<button className='btn' onClick={ downloadLogs }>Download Logs</button>
				<button className='btn' onClick={ () => setIsVisibleTable(prev => !prev) }>Show logs</button>
			</div>
			
			{ isVisibleTable && (
				<div className='container'>
					<div className='table-container'>
						<table className='table'>
							<thead>
							<tr>
								<th>Date</th>
								<th>Time</th>
								<th>Action</th>
							</tr>
							</thead>
							<tbody>
							{ actions.map((action, index) => (
								<tr key={ index }>
									<td>{ action.date }</td>
									<td>{ action.time }</td>
									<td>{ action.action }</td>
								</tr>
							)) }
							</tbody>
						</table>
					</div>
				</div>
			) }
		</div>
	);
};

export default App;
