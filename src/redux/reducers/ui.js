import { actionTypes } from "../actions/ui";

let ui = JSON.parse(localStorage.getItem('ui'))

const initialState = {
  groups: null,
  feed: null
}

const UiReducer = (state = ui || initialState, action) => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_GROUPS_HIGHLIGHTS: {
      newState = {
        ...state,
        groups: action.payload,
      };
      break;
    }
    case actionTypes.GET_FEED_HIGHLIGHTS: {
      newState = {
        ...state,
        feed: action.payload,
      };
      break;
    }
    default: {
      newState = state;
      break;
    }
  }
  if (newState) {
    localStorage.setItem('ui', JSON.stringify(newState));
  } else {
    localStorage.removeItem('ui')
  }
  return newState
};

export default UiReducer;