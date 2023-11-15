import styles from './LendingPage.module.scss';
import lendingVideo from '@assets/video/lending.mp4';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@assets/enums';
import useActions from '@utils/hooks/useActions';

const LendingPage = () => {
	const { setIsLending } = useActions();
	
	const handleLending = () => {
		setIsLending(false);
	};
	
	return (
		<main className={ styles.lendingPage }>
			<video className={ styles.bgVideo } loop={ true } muted={ true } autoPlay={ true } src={ lendingVideo }/>
			<div className={ styles.welcome }>
				<h1>DESIGN IN MOTION</h1>
				<p>The <span>"Clock-click"</span> celebrates the power of self-expression with a variety of colours, materials
					and sizes catering to all styles, tastes and wrists.</p>
				<div className={ styles.btnWrapper }>
					<Link to={ AppRoutes.REGISTRATION } className={ styles.btn }>Registration</Link>
					<Link to={ AppRoutes.AUTHORIZATION } className={ styles.btn }>Authorization</Link>
					<button onClick={ handleLending } className={ styles.btn }>Get to watches!</button>
				</div>
			</div>
		</main>
	);
};

export default LendingPage;