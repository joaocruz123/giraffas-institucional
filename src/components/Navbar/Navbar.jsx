import { AppBar, BottomNavigation, BottomNavigationAction, Paper, Toolbar, Typography } from '@mui/material'
import Link from '@mui/material/Link';
import React, { useState } from 'react'
import Logo from './../../assets/logo_giraffas.png'
import { Icon } from './../Common'
import {
	Nav,
	CustomButton,
	CustomIcon,
} from './styles'

export function Navbar() {
	const [value, setValue] = useState(0);

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
							Peça Já
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
					</Nav>
					<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
					</Typography>
					<CustomButton>
						Faça Seu Pedido
						<CustomIcon>
							<Icon width={"25px"} height={"25px"} name={"appGiraffas"} stroke={"primary"} />
						</CustomIcon>
					</CustomButton>
				</Toolbar>
			</AppBar>
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={3}>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				>
					<BottomNavigationAction label="PEÇA JÁ" icon={
						<Icon width={"24px"} height={"24px"} name={"menuPeca"} stroke={"textPrimary"} />
					} />
					<BottomNavigationAction label="CUPONS" icon={
						<Icon width={"24px"} height={"24px"} name={"menuCupons"} stroke={"textPrimary"} />
					} />
					<BottomNavigationAction label="CARDÁPIO" icon={
						<Icon width={"36px"} height={"36px"} name={"menuCardapio"} stroke={"textPrimary"} />
					} />
					<BottomNavigationAction label="LOJAS" icon={
						<Icon width={"24px"} height={"24px"} name={"menuLojas"} stroke={"textPrimary"} />
					} />
				</BottomNavigation>
			</Paper>
		</>

	)
}
