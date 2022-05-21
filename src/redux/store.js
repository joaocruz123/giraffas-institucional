import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from 'redux-thunk';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import { API_URL, PLATFORM_ID, PLATFORM, APP_ID } from '../config'

const api = axios.create({ //all axios can be used, shown in axios documentation
    responseType: 'json',
    baseURL: API_URL,
    headers: {
      "Content-Type":"application/json",
      "TipoAmbienteId": PLATFORM_ID,
      "Plataforma": PLATFORM,
      "AplicativoId": APP_ID,
    }
});

const store = createStore(
    reducers, 
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(api))
    ),
);

export default store;