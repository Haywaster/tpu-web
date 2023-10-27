import styles from './LendingPage.module.scss';
import lendingVideo from '@assets/video/lending.mp4';
import Layout from '@components/Layout';

const LendingPage = () => {
	return (
		<Layout>
			<video className={styles.bgVideo} loop={true} muted={true} autoPlay={true} src={lendingVideo}/>
			<h1>Clock-click</h1>
		</Layout>
	);
};

export default LendingPage;