import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch } from 'react-redux'
import ReactLoading from "react-loading";

import { THEME } from './config'
import Routes from './Routes'
import { Navbar } from './components/Navbar'
import { useDeviceLayout } from './components/utilities/useCustomLayout'

const Wrapper = styled.div`
  background: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center
`
const MainApp = (props) => {
	const { accessToken, requiredAuth } = props
	const dispatch = useDispatch()
	const localAccess = localStorage.getItem('auth') ? localStorage.getItem('auth') : null
	const logout = localStorage.getItem('logout') ? localStorage.getItem('logout') : null
	const [loading, setLoading] = useState(true)
	const [visibleSignIn, setVisibleSignIn] = useState(false);
	const [visibleSignUp, setVisibleSignUp] = useState(false);

	const isMobile = useDeviceLayout({
		isMobile: true
	})

	useEffect(() => {
		if (!accessToken && requiredAuth) {
			setVisibleSignIn(true);
		}

		setTimeout(() => {
			setLoading(false);
		}, 3000)
	}, [
		requiredAuth,
		accessToken,
		logout,
		localAccess,
		dispatch
	])

	const combineThemes = () => {
		const newTheme = JSON.parse(JSON.stringify(THEME))
		return newTheme
	};

	const startDialogSignin = () => {
		setVisibleSignIn(true);
	};

	const handleCloseDialogSignIn = () => {
		setVisibleSignIn(false)
	};

	const startDialogSignup = () => {
		setVisibleSignUp(true);
	};

	const handleCloseDialogSignUp = () => {
		setVisibleSignUp(false)
	};

	const propsAuth = {
		visibleSignIn,
		visibleSignUp,
		setVisibleSignIn,
		startDialogSignin,
		setVisibleSignUp,
		handleCloseDialogSignIn,
		startDialogSignup,
		handleCloseDialogSignUp
	}

	if (loading) {
		return (
			<Wrapper>
				<ReactLoading
					type="spin"
					color="#ED8B26"
					height={isMobile ? '10%' : '3%'}
					width={isMobile ? '10%' : '3%'}
				/>
			</Wrapper>
		)
	} else {
		return (
			<ThemeProvider theme={combineThemes()}>
				<Helmet>
					<title>{process.env.REACT_APP_TITLE}</title>
				</Helmet>
				<Navbar {...propsAuth} />
				<Routes />
			</ThemeProvider>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		storeInfo: state && state.storeInfo,
		accessToken: state.auth.auth && state.auth.auth.accessToken || null,
		requiredAuth: state.auth && state.auth.requiredAuth
	}
}

export default connect(mapStateToProps, {})(MainApp)
