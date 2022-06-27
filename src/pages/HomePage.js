import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { fetchFeedHighlights, fetchGroupsHighlights } from '../redux/actions/ui';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import Feed from './../components/Feed';
import Highlights from '../components/Highlights';
import Stores from '../components/Stores/Stores';
import SocialMedia from '../components/SocialMedia';
import Footer from '../components/Footer';
import { useDeviceLayout } from '../components/utilities/useCustomLayout';
import { setRequiredAuth } from '../redux/actions/auth';

const HomeContent = (props) => {
	const { fetchFeedHighlights, fetchGroupsHighlights, setRequiredAuth } = props;

	const isMobile = useDeviceLayout({
		isMobile: true
	})

	useEffect(() => {
		const typePlatform = isMobile ? 4 : 3
		fetchFeedHighlights()
		fetchGroupsHighlights(typePlatform)
		setRequiredAuth(false)
	}, [
		isMobile,
		fetchFeedHighlights,
		fetchGroupsHighlights,
		setRequiredAuth
	])

	return (
		<React.Fragment>
			<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
			<CssBaseline />
			<Highlights />
			<Feed />
			<Cards />
			<Stores isMobile={isMobile} />
			<SocialMedia />
			<Footer />
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		groups: state.ui.groups
	};
}

export default connect(
	mapStateToProps, {
	fetchFeedHighlights,
	fetchGroupsHighlights,
	setRequiredAuth
})(HomeContent);
