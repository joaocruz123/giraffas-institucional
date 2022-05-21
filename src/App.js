import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './redux/store'
import GlobalStyle from './components/utilities/GlobalStyle';

import MainApp from './MainApp'

class App extends Component {

  render() {
    return (  
      <Provider store={store}>
          <GlobalStyle />
          <MainApp />
      </Provider>
    );
  }
}

export default App;
