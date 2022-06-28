import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './redux/store'
import GlobalStyle from './components/utilities/GlobalStyle';
import SnackbarProvider from 'react-simple-snackbar'

import MainApp from './MainApp'

class App extends Component {

	render() {
		return (
			<SnackbarProvider>
				<Provider store={store}>
					<GlobalStyle />
					<MainApp />
				</Provider>
			</SnackbarProvider>
		);
	}
}

export default App;
