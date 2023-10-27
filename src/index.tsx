import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

import UserPage from '@pages/UserPage';
import AdminPage from '@pages/AdminPage';
import AuthorizationPage from '@pages/AuthorizationPage';
import ErrorPage from '@pages/ErrorPage';
import AboutPage from '@pages/AboutPage';
import ContactsPage from '@pages/ContactPage';
import CartPage from '@pages/CartPage';
import LendingPage from '@pages/LendingPage';

import { AppRoutes } from '@assets/enums';

import './index.css';
import RegistrationPage from '@pages/RegistrationPage';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const routes = (
	<>
		{/* Главные */}
		<Route path={AppRoutes.MAIN} element={<UserPage />} />
		<Route path={AppRoutes.LENDING} element={<LendingPage />} />
		{/* Регистрация, авторизация */}
		<Route path={AppRoutes.AUTHORIZATION} element={<AuthorizationPage />} />
		<Route path={AppRoutes.REGISTRATION} element={<RegistrationPage />} />
		{/* Для пользователя */}
		<Route path={AppRoutes.ABOUT} element={<AboutPage />} />
		<Route path={AppRoutes.CART} element={<CartPage />} />
		{/* Для админа */}
		<Route path={AppRoutes.CONTACTS} element={<ContactsPage />} />
		<Route path={AppRoutes.ADMIN} element={<AdminPage />} />
		{/* Остальные */}
		<Route path={AppRoutes.ERROR} element={<ErrorPage />} />
	</>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

root.render(
	<Provider store={ store }>
		<QueryClientProvider client={ queryClient }>
			<RouterProvider router={ router }/>
		</QueryClientProvider>
	</Provider>
);
