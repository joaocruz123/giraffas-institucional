import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { connect } from 'react-redux';
import Highlights from '../components/Highlights';
import { fetchMenuStore } from '../redux/actions/menu';
import { STORE_ID } from '../config';
import Menu from '../components/Menu';
import { fetchGroupsHighlights } from '../redux/actions/ui';
import { useDeviceLayout } from '../components/utilities/useCustomLayout';
import styled from 'styled-components';

const WrapperBackground = styled.div`
	background-color: ${props => props.theme.colors.backgroundMain};
`

const Cardapio = (props) => {
	const { fetchMenuStore, fetchGroupsHighlights } = props;
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
		const storeId = STORE_ID
		fetchMenuStore(storeId)
	}, [
		fetchMenuStore
	])

	return (
		<>
			<React.Fragment>
				<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
				<CssBaseline />
				<Highlights />
				<WrapperBackground>
					<Menu isMobile={isMobile} />
				</WrapperBackground>
			</React.Fragment>
		</>
	);
}

const mapStateToProps = (state) => {
	return {

	};
}

export default connect(
	mapStateToProps, {
	fetchMenuStore,
	fetchGroupsHighlights
})(Cardapio);
