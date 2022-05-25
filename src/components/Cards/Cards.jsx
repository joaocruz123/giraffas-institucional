import { Container, Grid } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux';

function Cards(props) {
    const { feed } = props;

    return (
        <Container component="main" sx={{ pt: 1, pb: 4 }}>
            <Grid container spacing={2}>
                {feed && feed.map((item, index) => {
                    const key = `card-image-${index}`

                    return <Grid item xs={12} md={4} key={key}>
                        <img key={key} src={item.image} width="100%"/>
                    </Grid>
                })}

            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        feed: state.ui.feed
    };
}

export default connect(
    mapStateToProps, {
})(Cards);
