import { Avatar, Box, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import { CategorieName, Product, ProductName } from './styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: "10.375rem",
    maxHeight: "10.375rem",
    color: theme.palette.text.secondary,
    'img': {
        marginTop: "-30px",
        width: "100%"
    }
}));

function Feed(props) {
    const { categories } = props;
    return (
        <Container disableGutters component="main" sx={{ pt: 4, pb: 2, pl: 2, pr: 2 }}>
            {categories && categories.map((categorie) => {
                return (
                    <>
                        <CategorieName>
                            {categorie.name}
                        </CategorieName>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {categorie && categorie?.products.map((product) => {
                                return (
                                    <>
                                        <Grid item xs={6} md={2}>
                                            <Item>
                                                <img src={product.image} />
                                                <Product>
                                                    <ProductName>{product.name}</ProductName>
                                                </Product>
                                            </Item>
                                        </Grid>
                                    </>
                                )
                            })}
                        </Grid>
                    </>
                )
            })}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.menu.categories || []
    };
}

export default connect(
    mapStateToProps, {
})(Feed);