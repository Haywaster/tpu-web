import Layout from '@components/Layout';
import { aboutPageText } from '@assets/consts';
import styles from './AboutPage.module.scss';
import { AboutInfo } from '@assets/enums';
import { ComponentType } from 'react';

const AboutPage: ComponentType = () => {
	return (
		<Layout>
			<div className={ styles.aboutWrapper }>
				<h2>{ AboutInfo.HEADER }</h2>
				
				<strong>{ AboutInfo.WELCOME }</strong>
				<p>{ AboutInfo.WELCOME_DESC }</p>
				
				<strong>{ AboutInfo.COLLECTION }</strong>
				<p>{ AboutInfo.COLLECTION_DESC }</p>
				
				<strong>{ AboutInfo.DISCOVER }</strong>
				<p>{ AboutInfo.DISCOVER_DESC }</p>
				
				<strong>{ AboutInfo.QUALITY }</strong>
				<p>{ AboutInfo.QUALITY_DESC }</p>
			</div>
		</Layout>
	);
};

export default AboutPage;