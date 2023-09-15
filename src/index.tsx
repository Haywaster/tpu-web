import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UserPage from '@pages/UserPage';
import AdminPage from '@pages/AdminPage';
import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={ <UserPage/> }/>
			<Route path='/admin' element={ <AdminPage/> }/>
		</>
	));

root.render(
	<QueryClientProvider client={ queryClient }>
		<RouterProvider router={ router }/>
	</QueryClientProvider>
);
