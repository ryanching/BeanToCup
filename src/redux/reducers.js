import { SAVE_ROAST, SAVE_BEAN, SAVE_CUP, REMOVE_CUP, REMOVE_BEAN, REMOVE_ROAST, IMPORT_DATA, } from './actions';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  roasts: [],
  beans: [],
  cups: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_DATA:
      return {
        ...state,
        beans: [...state.beans, ...action.payload.beans],
        roasts: [...state.roasts, ...action.payload.roasts],
        cups: [...state.cups, ...action.payload.cups],
      };
    case SAVE_ROAST:
      const bean = state.beans.find((bean) => bean.id.toString() === action.payload.beanId || bean.id.toString() === action.payload.beanName || bean.beanName === action.payload.beanName);
      action.payload.beanName = bean.beanName;
      const existingRoastIndex = state.roasts.findIndex(roast => roast.id === action.payload.id);
      if (action.payload.id && existingRoastIndex > -1) {
        // Update existing roast
        const updatedRoasts = [...state.roasts];
        updatedRoasts[existingRoastIndex] = action.payload;
        return {
          ...state,
          roasts: updatedRoasts,
        };
      }
      return {
        ...state,
        roasts: [...state.roasts, { ...action.payload, beanId: bean.id, id: uuidv4() }]
      };
    case SAVE_BEAN:
      const existingBeanIndex = state.beans.findIndex(bean => bean.id === action.payload.id);
      if (action.payload.id && existingBeanIndex > -1) {
        // Update existing bean
        const updatedBeans = [...state.beans];
        updatedBeans[existingBeanIndex] = action.payload;
        return {
          ...state,
          beans: updatedBeans,
        };
      }
      return {
        ...state,
        beans: [...state.beans, { ...action.payload, id: uuidv4() }]
      };
    case SAVE_CUP:
      const roast = state.roasts.find((roast) => roast.id.toString() === action.payload.roastId || roast.id.toString() === action.payload.roastName || roast.roastName === action.payload.roastName);
      action.payload.roastName = roast.roastName;
      const existingCupIndex = state.cups.findIndex(cup => cup.id === action.payload.id);
      if (action.payload.id && existingCupIndex > -1) {
        // Update existing cup
        const updatedCups = [...state.cups];
        updatedCups[existingCupIndex] = action.payload;
        return {
          ...state,
          cups: updatedCups,
        };
      }
      return {
        ...state,
        cups: [...state.cups, { ...action.payload, roastId: roast.id, id: uuidv4() }]
      };
    case REMOVE_CUP:
    return {
      ...state,
      cups: state.cups.filter((_, i) => i !== action.payload),
    };
    case REMOVE_BEAN:
    return {
      ...state,
      beans: state.beans.filter((_, i) => i !== action.payload),
    };
    case REMOVE_ROAST:
    return {
      ...state,
      roasts: state.roasts.filter((_, i) => i !== action.payload),
    };
    default:
      return state;
  }
};

export default reducer;