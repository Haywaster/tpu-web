import { BsCart2 } from 'react-icons/bs';

export enum AboutInfo {
	HEADER = 'About Our Site',
	WELCOME = 'Welcome to ClickClock – Your Ultimate Watch Destination',
	WELCOME_DESC = 'At ClickClock, we redefine timekeeping with our exquisite collection of watches that blend precision, style, and functionality. Explore a world where time is not just measured but celebrated through our curated selection of timepieces.',
	DISCOVER = 'Discover Timeless Elegance',
	DISCOVER_DESC = 'Indulge in sophistication with our diverse range of watches designed to complement every style and occasion. From classic designs to contemporary marvels, ClickClock offers a watch for every wrist.',
	QUALITY = 'Unmatched Quality and Craftsmanship',
	QUALITY_DESC = 'Each watch at ClickClock is a testament to exceptional craftsmanship and enduring quality. Our timepieces are meticulously crafted using premium materials, ensuring longevity and reliability.',
	COLLECTION = 'Explore Our Collections',
	COLLECTION_DESC = 'Dive into our collections to find the perfect watch that resonates with your personality. Whether you seek sleek minimalism, sporty functionality, or luxurious statement pieces, ClickClock has you covered.'
}

export enum AppRoutes {
	MAIN = '/',
	REGISTRATION = '/registration',
	AUTHORIZATION = '/authorization',
	ABOUT = '/about',
	CONTACTS = '/contacts',
	CART = '/cart',
	ADMIN = '/admin',
	ERROR = '/*',
}

export const CART_ICON = BsCart2;

export enum AppRouteNames {
	MAIN = 'ClockClick',
	REGISTRATION = 'Registration',
	AUTHORIZATION = 'Authorization',
	ABOUT = 'About',
	CONTACTS = 'Contacts',
	ADMIN = 'Admin func',
	LOGOUT = 'Logout',
}

export const enum AppNotification {
	NO_MESSAGE = 'There are no items :(',
	CART_EMPTY = 'Your cart is empty :(',
	ERROR_MESSAGE = 'An error has occurred'
}