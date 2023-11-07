import { useEffect, useState } from 'react';

const useFindRole = () => {
	const [token, setToken] = useState<string>('');
	
	useEffect(() => {
		const storageToken = window.localStorage.getItem('authorizationData');
		
		if (storageToken) {
			setToken(storageToken);
		}
	}, []);
	
	return { role: 'admin' };
};

export default useFindRole