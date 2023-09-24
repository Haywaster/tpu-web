import { useEffect, useState } from 'react';

const useToken = () => {
	const [token, setToken] = useState<string>('');
	
	useEffect(() => {
		const storageToken = window.localStorage.getItem('authorizationData');
		
		if (storageToken) {
			setToken(storageToken);
		}
	}, []);
	
	return { isToken: !!token };
};

export default useToken;