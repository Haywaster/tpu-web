import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';

const useLogData = () => {
	const { actions } = useSelector((state: RootState) => state.log);
	
	const downloadLogs = () => {
		const logData = actions?.map((action) => {
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
	
	return { downloadLogs };
};

export default useLogData;