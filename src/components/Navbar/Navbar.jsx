import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Link from '@mui/material/Link';
import React from 'react'
import { fetchGroupsHighlights } from '../../redux/actions/ui';
import Logo from './../../assets/logo_giraffas.png'
import { Icon } from './../Common'
import {
    Nav,
    CustomButton,
    CustomIcon
} from './styles'

export function Navbar() {
    return (
        <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{ zIndex: 1, backgroundColor: "#f5f5f50d", display: { md: 'block', xs: 'none' } }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <img src={Logo} width="150" />
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
    )
}