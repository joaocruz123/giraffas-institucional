import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactLoading from "react-loading";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomePage from './pages/HomePage'

import { THEME } from './config'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

const Wrapper = styled.div`
  background: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center
`

const MainContainer = styled.div`
  display: flex
  flex-direction: row
`

const Content = styled.div`
  position: absolute;
  top: ${props => props.theme.dimensions.headerHeightDesktop}px;
  left: ${props => props.theme.dimensions.navBarWidth}px;
  width: calc(100% - ${props => props.theme.dimensions.navBarWidth}px);
  overflow-y: auto;
  overflow-x: hidden;
`

const MainApp = ({ storeInfo }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const localAccess = localStorage.getItem('auth') ? localStorage.getItem('auth') : null
  const logout = localStorage.getItem('logout') ? localStorage.getItem('logout') : null
  const [loading, setLoading] = useState(true)
  const [ value, setValue] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, [logout, localAccess, dispatch])

  const combineThemes = () => {
    const newTheme = JSON.parse(JSON.stringify(THEME))
    return newTheme
  }
  if (loading) {
    return (
      <Wrapper>
        <ReactLoading type="spin" color="#ED8B26" height={'3%'} width={'3%'} />
      </Wrapper>
    )
  } else {
    return (
      <ThemeProvider theme={combineThemes()}>
        <Helmet>
          <title>{process.env.REACT_APP_TITLE}</title>
        </Helmet>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" component={HomePage} />
            </Switch>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none', xs: 'block' }  }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Archive" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </Paper>
          </div>
        </Router>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeInfo: state && state.storeInfo
  }
}

export default connect(mapStateToProps, {})(MainApp)
