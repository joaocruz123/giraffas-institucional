import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { connect } from 'react-redux';
import Highlights from '../components/Highlights';
import { fetchGroupsHighlights } from '../redux/actions/ui';
import { useDeviceLayout } from '../components/utilities/useCustomLayout';
import styled from 'styled-components';
import { fetchProductsPromotionals } from '../redux/actions/promotions';
import { setRequiredAuth } from '../redux/actions/auth';
import Promotions from '../components/Promotions';

const WrapperBackground = styled.div`
	background-color: ${props => props.theme.colors.backgroundMain};
`

const Promocoes = (props) => {
	const {
		setRequiredAuth,
		fetchProductsPromotionals,
		fetchGroupsHighlights,
		accessToken
	} = props;

	const isMobile = useDeviceLayout({
		isMobile: true
	})
	useEffect(() => {
		const typePlatform = isMobile ? 4 : 3
		fetchGroupsHighlights(typePlatform)
	}, [
		isMobile,
		fetchGroupsHighlights
	])
	useEffect(() => {
		// if (!accessToken) {
		// 	setRequiredAuth(true)
		// } else {
		// 	fetchProductsPromotionals()
		// }
		fetchProductsPromotionals()
	}, [
		fetchProductsPromotionals
	])

	return (
		<>
			<React.Fragment>
				<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
				<CssBaseline />
				<Highlights />
				<WrapperBackground>
					<Promotions isMobile={isMobile} />
				</WrapperBackground>
			</React.Fragment>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		accessToken: state.auth.auth && state.auth.auth.accessToken
	};
}

export default connect(
	mapStateToProps, {
	setRequiredAuth,
	fetchProductsPromotionals,
	fetchGroupsHighlights
})(Promocoes);
