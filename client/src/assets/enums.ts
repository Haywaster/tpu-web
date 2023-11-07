import { BsCart2 } from 'react-icons/bs';

export enum AboutInfo {
	HEADER = 'About Our Site',
	WELCOME = 'Welcome to our incredible platform! Our website is your gateway to a world of endless possibilities for viewing and discovering various messages.',
	EXPECTATION = 'What We Offer:',
	MISSION = 'Our Mission: We aim to make your exploration of the information world engaging and productive. Our site is here to bring curious minds together, granting access to invaluable information and inspiring new discoveries.',
	CONCLUSION = 'Thank you for choosing us. We hope you\'ll find everything you\'re looking for and more on our site. Welcome to our world!',
}

export enum AppRoutes {
	MAIN = '/',
	LENDING = '/lending',
	REGISTRATION = '/registration',
	AUTHORIZATION = '/authorization',
	ABOUT = '/about',
	CONTACTS = '/contacts',
	CART = '/cart',
	ADMIN = '/admin',
	ERROR = '/*',
}

export const CART_ICON = BsCart2

export enum AppRouteNames {
	MAIN = 'ClockClick',
	REGISTRATION = 'Registration',
	AUTHORIZATION = 'Authorization',
	ABOUT = 'About',
	CONTACTS = 'Contacts',
	ADMIN = 'Admin func',
}

export const enum AppNotification {
	NO_MESSAGE = 'There are no items :(',
	CART_EMPTY = 'Your cart is empty :(',
	ERROR_MESSAGE = 'An error has occurred'
}