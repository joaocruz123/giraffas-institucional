import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Navbar } from '../components/Navbar';
import { fetchFeedHighlights, fetchGroupsHighlights } from '../redux/actions/ui';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import Feed from './../components/Feed';
import Highlights from '../components/Highlights';
import Stores from '../components/Stores/Stores';
import SocialMedia from '../components/SocialMedia';
import Footer from '../components/Footer';

function HomeContent(props) {
    const { fetchFeedHighlights, fetchGroupsHighlights } = props;
    useEffect(() => {
        fetchFeedHighlights()
        fetchGroupsHighlights()
    }, [
        fetchFeedHighlights,
        fetchGroupsHighlights
    ])

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Navbar />
            <Highlights />
            <Feed />
            <Cards />
            <Stores />
            <SocialMedia />
            <Footer /> 
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        groups: state.ui.groups
    };
}

export default connect(
    mapStateToProps, {
    fetchFeedHighlights,
    fetchGroupsHighlights
})(HomeContent);