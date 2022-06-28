import { AppBar, Dialog, Paper, Toolbar, Typography } from '@mui/material'
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Logo from './../../assets/logo_giraffas.png'
import { Icon } from './../Common'
import { FixedHeader } from './FixedHeader/FixedHeader';
import { FixedHeaderMobile } from './FixedHeaderMobile/FixedHeader';
import {
	Nav,
	CustomButton,
	CustomIcon,
	ItemMenu,
	Menu,
	CustomIconMenu
} from './styles'

export function Navbar({ ...propsAuth }) {
	const {
		visibleSignIn,
		setVisibleSignIn,
		startDialogSignin,
		handleCloseDialogSignIn,
		visibleSignUp,
		setVisibleSignUp,
		startDialogSignup,
		handleCloseDialogSignUp
	} = propsAuth;

	const handleSite = () => {
		window.open(`https://giraffasdelivery.voceqpad.com.br`, '_blank');
	};

	return (
		<>
			<AppBar
				position="absolute"
				color="default"
				elevation={0}
				sx={{ zIndex: 1, backgroundColor: "#f5f5f50d", display: { md: 'block', xs: 'none' } }}
			>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
					<Link
						href="/"
					>
						<img src={Logo} width="150" alt="Logo principal" />
					</Link>
					<Nav>
						<Link
							variant="button"
							href="https://giraffasdelivery.voceqpad.com.br"
							underline="none"
							sx={{
								my: 1, mx: 1.5, color: "#fff",
								'&:hover': {
									color: "#fff",
									textDecoration: "none"
								},
							}}
						>
							Peça Já
						</Link>
						<Link
							variant="button"
							href="/promocoes"
							underline="none"
							sx={{
								my: 1, mx: 1.5, color: "#fff",
								'&:hover': {
									color: "#fff",
									textDecoration: "none"
								},
							}}
						>
							Promoção
						</Link>
						<Link
							variant="button"
							href="/cardapio"
							underline="none"
							sx={{
								my: 1, mx: 1.5, color: "#fff",
								'&:hover': {
									color: "#fff",
									textDecoration: "none"
								},
							}}
						>
							Cardápio
						</Link>
						<Link
							variant="button"
							href="#"
							underline="none"
							sx={{
								my: 1, mx: 1.5, color: "#fff",
								'&:hover': {
									color: "#fff",
									textDecoration: "none"
								},
							}}
						>
							Lojas
						</Link>
						{/* <Link
							variant="button"
							href="#"
							onClick={() => startDialogSignin()}
							underline="none"
							sx={{
								my: 1, mx: 1.5, color: "#fff",
								'&:hover': {
									color: "#fff",
									textDecoration: "none"
								},
							}}
						>
							Login
						</Link>
						<Link
							variant="button"
							href="#"
							onClick={() => startDialogSignup()}
							underline="none"
							sx={{
								my: 1, mx: 1.5, color: "#fff",
								'&:hover': {
									color: "#fff",
									textDecoration: "none"
								},
							}}
						>
							Signup
						</Link> */}
					</Nav>
					<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
					</Typography>
					<CustomButton onClick={() => handleSite()}>
						Faça Seu Pedido
						<CustomIcon>
							<Icon width={"25px"} height={"25px"} name={"appGiraffas"} stroke={"primary"} />
						</CustomIcon>
					</CustomButton>
				</Toolbar>
			</AppBar>
			<FixedHeader handleSite={handleSite} />
			<AppBar
				position="fixed"
				color="default"
				elevation={0}
				sx={{ zIndex: 2, backgroundColor: "#f5f5f529", display: { md: 'none', xs: 'block' } }}
			>
				<Toolbar sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<Link
						href="/"
					>
						<img src={Logo} width="150" alt="Logo principal" />
					</Link>
				</Toolbar>
			</AppBar>
			<FixedHeaderMobile />
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1, display: { md: 'none', xs: 'block' } }} elevation={3}>
				<Menu>
					<ItemMenu href='/'>
						<CustomIconMenu>
							<Icon width={"24px"} height={"24px"} name={"menuPeca"} stroke={"textPrimary"} />
						</CustomIconMenu>
						<p>Peça Já</p>
					</ItemMenu>
					<ItemMenu href='/promocoes'>
						<CustomIconMenu>
							<Icon width={"24px"} height={"24px"} name={"menuCupons"} stroke={"textPrimary"} />
						</CustomIconMenu>
						<p>Cupons</p>
					</ItemMenu>
					<ItemMenu href='/cardapio'>
						<CustomIconMenu>
							<Icon width={"24px"} height={"24px"} name={"menuCardapio"} stroke={"textPrimary"} />
						</CustomIconMenu>
						<p>Cardápio</p>
					</ItemMenu>
					<ItemMenu>
						<CustomIconMenu>
							<Icon width={"24px"} height={"24px"} name={"menuLojas"} stroke={"textPrimary"} />
						</CustomIconMenu>
						<p>Lojas</p>
					</ItemMenu>
					<ItemMenu>
						<CustomIconMenu>
							<Icon width={"24px"} height={"24px"} name={"menu"} stroke={"textPrimary"} />
						</CustomIconMenu>
						<p>Menu</p>
					</ItemMenu>
				</Menu>
			</Paper>
			<Dialog
				onClose={() => handleCloseDialogSignIn()}
				className='login'
				aria-labelledby='login-dialog'
				open={visibleSignIn}
				fullWidth={false}
				fullScreen={false}
				PaperProps={{
					style: {
						maxWidth: '21rem',
						borderRadius: '.75rem'
					}
				}}
			>
				<SignIn
					setVisibleSignUp={setVisibleSignUp}
					setVisibleSignIn={setVisibleSignIn}
					close={() => { setVisibleSignIn(false) }}
				/>
			</Dialog>

			<Dialog
				onClose={() => handleCloseDialogSignUp()}
				aria-labelledby='signUp-dialog'
				open={visibleSignUp}
				maxWidth={'xs'}
				fullWidth={false}
				fullScreen={false}
				PaperProps={{
					style: {
						maxWidth: '21rem',
						borderRadius: '.75rem'
					}
				}}
			>
				<SignUp
					setVisibleSignUp={setVisibleSignUp}
					setVisibleSignIn={setVisibleSignIn}
					close={() => { setVisibleSignUp(false) }}
				>
				</SignUp>
			</Dialog>
		</>

	)
}
