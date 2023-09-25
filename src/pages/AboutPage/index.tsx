import Layout from '@components/Layout';
import { aboutPageText } from '@assets/consts';
import styles from './AboutPage.module.scss';
import { AboutInfo } from '@/@types/enums';

const AboutPage = () => {
	return (
		<Layout>
			<div className={ styles.aboutWrapper }>
				<h2>{ AboutInfo.HEADER }</h2>
				<p>{ AboutInfo.WELCOME }</p>
				<p>{ AboutInfo.EXPECTATION }</p>
				<ol>{ aboutPageText.map((text, index) => <li key={ index }>{ text }</li>) }</ol>
				<p>{ AboutInfo.MISSION }</p>
				<p>{ AboutInfo.CONCLUSION }</p>
			</div>
		</Layout>
	);
};

export default AboutPage;