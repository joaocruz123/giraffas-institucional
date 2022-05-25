import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { connect } from 'react-redux';
import Highlights from '../components/Highlights';
import { fetchMenuStore } from '../redux/actions/menu';
import { STORE_ID } from '../config';
import Menu from '../components/Menu';
import { fetchGroupsHighlights } from '../redux/actions/ui';

const Cardapio = (props) => {
    const { fetchMenuStore, fetchGroupsHighlights } = props;
    useEffect(() => {
        fetchGroupsHighlights()
    }, [
        fetchGroupsHighlights
    ])
    useEffect(() => {
        const storeId = STORE_ID
        fetchMenuStore(storeId)
    }, [])

    return (
        <>
            <React.Fragment>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <Highlights />
                <Menu />
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
