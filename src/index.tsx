import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UserPage from '@pages/UserPage';
import AdminPage from '@pages/AdminPage';
import AuthorizationPage from '@pages/AuthorizationPage';
import ErrorPage from '@pages/ErrorPage';
import AboutPage from '@pages/AboutPage';
import ContactsPage from '@pages/ContactPage';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={ <UserPage/> }/>
			<Route path='/about' element={ <AboutPage/> }/>
			<Route path='/contacts' element={ <ContactsPage/> }/>
			<Route path='/admin' element={ <AdminPage/> }/>
			<Route path='/authorization' element={ <AuthorizationPage/> }/>
			<Route path='/*' element={ <ErrorPage/> }/>
		</>
	));

root.render(
	<QueryClientProvider client={ queryClient }>
		<RouterProvider router={ router }/>
	</QueryClientProvider>
);
