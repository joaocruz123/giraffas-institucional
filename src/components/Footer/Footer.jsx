import React from 'react'
import {
    Title,
    SubTitle,
    Wrapper,
    Session,
    SessionTwo,
    TitleTwo,
    SubTitleTwo
} from './styles'
import { connect } from 'react-redux'
import { Grid } from '@mui/material'
import QRCode from './../../assets/qrcode.png'
import Arrow from './../../assets/arrow.png'

function Footer() {
    return (
        <>
            <Wrapper>
                <Grid container spacing={1} sx={{ zIndex: 1 }}>
                    <Grid item xs={12} md={5}>
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
                    <Grid item xs={12} md={2}>
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
                            <img src={Arrow} alt="acesso ao app" width="100" style={{ margin: "0 20px" }} />
                        </SessionTwo>
                    </Grid>
                </Grid>
            </Wrapper>

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