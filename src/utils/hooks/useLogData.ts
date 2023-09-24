import { useEffect, useState } from 'react';
import { ILogData } from '@/@types';

const useLogData = (value?: string) => {
	const [actions, setActions] = useState<ILogData[]>([]);
	
	const logAction = (action: string) => {
		const now = new Date();
		const date = now.toLocaleDateString();
		const time = now.toLocaleTimeString();
		
		const logEntry = { date, time, action };
		setActions(prevActions => [...prevActions, logEntry]);
	};
	
	useEffect(() => {
		if (value) {
			logAction(value)
		}
	}, [value]);
	
	const downloadLogs = () => {
		if (actions.length) {
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
		}
	};
	
	return {downloadLogs};
};

export default useLogData;