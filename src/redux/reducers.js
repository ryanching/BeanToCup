import { SAVE_ROAST, SAVE_BEAN, SAVE_CUP } from './actions';

const initialState = {
  roasts: [],
  beans: [],
  cups: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ROAST:
      return {
        ...state,
        roasts: [...state.roasts, action.payload]
      };
    case SAVE_BEAN:
      return {
        ...state,
        beans: [...state.beans, action.payload]
      };
    case SAVE_CUP:
      return {
        ...state,
        cups: [...state.cups, action.payload]
      };
    default:
      return state;
  }
};

export default reducer;