import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container'
import Highlights from '../components/Highlights';
import { Navbar } from '../components/Navbar';
import Feed from './../components/Feed';
import { fetchFeedHighlights, fetchGroupsHighlights } from '../redux/actions/ui';
import useFetch from '../utils/useFetch';
import { connect, useDispatch } from 'react-redux';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: [
            'Cool stuff',
            'Random feature',
            'Team feature',
            'Developer stuff',
            'Another one',
        ],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];
const dataCarousel = [
    {
        label: "",
        image: "https://gkpb.com.br/wp-content/uploads/2021/11/giraffas-sanduiches-de-frango.jpg"
    },
    {
        label: "",
        image: "https://pbs.twimg.com/media/EwJdbkHWQAQM-2E?format=jpg&name=medium"
    }
]

function HomeContent(props) {
    const { fetchFeedHighlights, fetchGroupsHighlights } = props;
    React.useEffect(() => {
        fetchFeedHighlights()
        fetchGroupsHighlights()
    }, [])
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Navbar />
            <Highlights />
            <Feed />
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 2,
                    py: [3, 6],
                }}
            >
                <Grid container spacing={4} justifyContent="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="text.secondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
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