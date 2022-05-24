import { actionTypes } from "../actions/menu";

let menu = JSON.parse(localStorage.getItem('menu'))

const initialState = {
    categories: null,
}

const MenuReducer = (state = menu || initialState, action) => {
    let newState = state;
    switch (action.type) {
        case actionTypes.SET_MENU_STORE: {
            newState = {
                ...state,
                categories: action.payload,
            };
            break;
        }
        default: {
            newState = state;
            break;
        }
    }
    if (newState) {
        localStorage.setItem('menu', JSON.stringify(newState));
    } else {
        localStorage.removeItem('menu')
    }
    return newState
};

export default MenuReducer;