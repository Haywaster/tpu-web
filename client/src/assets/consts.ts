import { ILinkConfig, ILinks } from '@/@types';
import { AppRoutes } from '@assets/enums';
import { BsCart2 } from 'react-icons/bs';

export const socialLinks: ILinks[] = [
	{ name: 'VK', imageSrc: 'vk.png', href: 'https://vk.com/haywaster02' },
	{ name: 'Telegram', imageSrc: 'tg.png', href: 'https://t.me/vlstrashko' },
	{ name: 'GitHub', imageSrc: 'gh.png', href: 'https://github.com/Haywaster' }
];

export const aboutPageText: string[] = [
	'Diverse Categories: Explore a wide range of categories, each filled with messages on various topics. Whatever your interests, there\'s something for everyone.',
	'Limitless Search: Our powerful search tool makes finding messages a breeze. Simply enter keywords and embark on a journey through the world of information.',
	'Share Your Messages: We provide a space not only for viewing but also for contributing your own creative messages. Share your insights and connect with the world.',
	'Community of Like-minded Individuals: Connect with people who share your interests. Discuss topics, exchange opinions, and make new friends.',
	'User-Friendly Experience: We\'ve designed our site with your comfort in mind. Navigation is intuitive, and you\'ll feel right at home.'
];

export const linksConfig: ILinkConfig[] = [
	{ label: 'ClockClick', path: AppRoutes.MAIN, whereIsVisible: 'always' },
	{ label: 'Authorization', path: AppRoutes.AUTHORIZATION, whereIsVisible: 'lending' },
	{ label: 'Registration', path: AppRoutes.REGISTRATION, whereIsVisible: 'lending' },
	{ label: 'About', path: AppRoutes.ABOUT, whereIsVisible: 'mainContent' },
	{ label: 'Contacts', path: AppRoutes.CONTACTS, whereIsVisible: 'mainContent' },
	{ label: BsCart2, path: AppRoutes.CART, whereIsVisible: 'mainContent' }
];

export const filterItems: string[] = [
	'All', 'Quartz', 'Wristwatch', 'Desk', 'Wall', 'Floor', 'Smartwatches'
];