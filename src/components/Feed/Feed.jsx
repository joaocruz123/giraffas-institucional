import { Avatar, Container, Stack } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux';

import {
    Div
} from './styles'
import { useDispatch } from 'react-redux';

function Feed(props) {
    const { groups } = props;

    return (
        <Container disableGutters component="main" sx={{ pt: 4, pb: 4 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                {groups && groups.map((acc) => {
                    return <Div>
                        <Avatar alt="Remy Sharp" src={acc.imgUrl} sx={{ width: 66, height: 66 }} />
                        <p>{acc.name}</p>
                    </Div>
                })}
            </Stack>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        groups: state.ui.groups
    };
}

export default connect(
    mapStateToProps, {   
})(Feed);