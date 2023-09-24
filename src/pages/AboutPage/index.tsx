import Layout from '@components/Layout';
import { aboutPageText } from '@assets/consts';
import styles from './AboutPage.module.scss';
import { AboutInfo } from '@/@types/enums';

const AboutPage = () => {
	return (
		<Layout>
			<div className={ styles.aboutWrapper }>
				<h2>{ AboutInfo.header }</h2>
				<p>{ AboutInfo.welcome }</p>
				<p>{ AboutInfo.expectations }</p>
				<ol>{ aboutPageText.map((text, index) => <li key={ index }>{ text }</li>) }</ol>
				<p>{ AboutInfo.mission }</p>
				<p>{ AboutInfo.conclusion }</p>
			</div>
		</Layout>
	);
};

export default AboutPage;