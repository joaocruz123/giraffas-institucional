import { combineReducers } from "redux";
import ui from './ui'
import stores from './stores'
import menu from './menu'

export default combineReducers({ ui, stores, menu });
