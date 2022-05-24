import React from 'react'
import {
    Title,
    SubTitle,
    Wrapper,
    WrapperTow,
    Session,
    SessionTwo,
    TitleTwo,
    SubTitleTwo,
    Imagens,
    Input,
    H1,
    H2,
    SessionTree
} from './styles'
import { connect } from 'react-redux'
import { Grid, Link, Typography } from '@mui/material'
import QRCode from './../../assets/qrcode.png'
import Arrow from './../../assets/arrow.png'
import Stores from './../../assets/stores.png'

const footer1 = [
    {
        title: '',
        description: ['Peça Já', 'Cupons', 'Cardápio', 'Lojas'],
    },
];

const footer2 = [
    {
        title: '',
        description: [
            'Sobre nós',
            'Imprensa',
            'Seja um franqueado',
            'trabalhe conosco',
        ],
    }
]
function Footer() {
    return (
        <>
            <Wrapper>
                <Grid container spacing={1} sx={{ zIndex: 1 }}>
                    <Grid item xs={12} md={5} sx={{ display: { md: 'block', xs: 'none' } }}>
                        <Session>
                            <Title>
                                Baixe nosso APP! 
                            </Title>
                            <SubTitle>
                                Peça Delivery e receba onde estiver ou <br />
                                Retire na loja, sem pegar filas!
                            </SubTitle>
                        </Session>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{ display: { md: 'block', xs: 'none' } }}>
                        <img src={QRCode} alt="acesso ao app" width="100%" />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <SessionTwo>
                            <TitleTwo>
                                Escanei o QR Code e aproveite!
                            </TitleTwo>
                            <SubTitleTwo>
                                Mais barato, rápido e seguro
                            </SubTitleTwo>
                            <Imagens>
                                <img src={Arrow} alt="acesso ao app" width="100" style={{ margin: "0 20px" }} />
                                <img src={Stores} alt="acesso ao app" width="280" height="40" style={{ margin: "2rem 0 0 0" }} />
                            </Imagens>
                        </SessionTwo>
                    </Grid>
                </Grid>
            </Wrapper>
            <WrapperTow>
                <Grid container spacing={3} sx={{ zIndex: 1 }}>
                    <Grid item xs={12} md={4}>
                        <Session>
                            <H2>Receba nossas</H2>
                            <H1>Promoções por e-mail</H1>
                            <Input placeholder='Insira seu e-mail' />
                        </Session>
                    </Grid>
                    <Grid item xs={6} sm={1}>
                        <Session>
                            {footer1.map((footer) => (
                                <ul>
                                    {footer.description.map((item) => (
                                        <li key={item}>
                                            <Link variant="button" href="#" underline="none" sx={{ fontWeight: 300, color: "#fff", '&:hover': { color: "#fff", textDecoration: "none" }, }}>
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </Session>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Session>
                            {footer2.map((footer) => (
                                <ul>
                                    {footer.description.map((item) => (
                                        <li key={item}>
                                            <Link variant="button" href="#" underline="none" sx={{ fontWeight: 300, color: "#fff", '&:hover': { color: "#fff", textDecoration: "none" }, }}>
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </Session>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <SessionTree>
                            <p>Giraffas © 2022 - Todos os direitos reservados</p>
                            <p>Loja online operada por VoceqPad</p>
                            <p>Av. Mofarrej, 825 - G01 - Vila Leopodina - São Paulo - SP - 05311-00</p>
                        </SessionTree>
                    </Grid>
                </Grid>
            </WrapperTow>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        groups: state.ui.groups
    };
}

export default connect(
    mapStateToProps, {
})(Footer);
