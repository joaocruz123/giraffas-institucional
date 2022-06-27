import { combineReducers } from "redux";
import ui from './ui'
import stores from './stores'
import menu from './menu'
import auth from './auth'
import promotions from './promotions'

export default combineReducers({ auth, ui, stores, menu, promotions });
