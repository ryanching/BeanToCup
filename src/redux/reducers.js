import { SAVE_ROAST, SAVE_BEAN, SAVE_CUP, REMOVE_CUP } from './actions';
import { v4 as uuidv4 } from 'uuid';

// sampleData.js
export const sampleBeans = [
  { id: 1, beanName: 'Ethiopian Yirgacheffe', origin: 'Ethiopia', processing: "Washed", elevation: "4000", cost: "7.40", tastingNotes: "Blueberry", beanRating: "4.0" },
  { id: 2, beanName: 'Colombian Supremo', origin: 'Colombia', roastLevel: 'Dark', processing: "Natural", elevation: "1530", cost: "5.50", tastingNotes: "Sweet apple", beanRating: "4.9" },
  { id: 3, beanName: 'Guatemalan Antigua', origin: 'Guatemala', roastLevel: 'Light', processing: "Honey", elevation: "1120", cost: "4.30", tastingNotes: "Caramel, oak", beanRating: "4.5" },
];

export const sampleRoasts = [
  { id: 4, roastName: 'Morning Roast', beanName: 'Ethiopian Yirgacheffe', beanId: 1, roastLevel: 'Medium', firstCracksTime: '10:30', secondCracksTime: '12:00', endRoastTime: '15:00', roastRating: "3.9"},
  { id: 5, roastName: 'Afternoon Delight', beanName: 'Colombian Supremo', beanId: 2, roastLevel: 'Dark', firstCracksTime: '11:00', secondCracksTime: '13:00', endRoastTime: '16:00', roastRating: "3.3"},
  { id: 6, roastName: 'Evening Bliss', beanName: 'Guatemalan Antigua', beanId: 3, roastLevel: 'Light', firstCracksTime: '09:30', secondCracksTime: '11:00', endRoastTime: '14:00', roastRating: "3.5"},
];

export const sampleCups = [
  { id: 7, roastName: 'Morning Roast', roastId: 4, brewMethod: "AeroPress", timeOfDay: '08:00', brewTime: '04:00', cupRating: "4.75" },
  { id: 8, roastName: 'Evening Bliss', roastId: 6, brewMethod: "French Press", timeOfDay: '14:00', brewTime: '03:30', cupRating: "4.25" },
  { id: 9, roastName: 'Afternoon Delight', roastId: 5, brewMethod: "Pour Over", timeOfDay: '19:00', brewTime: '05:00', cupRating: "3.5" },
];
const initialState = {
  roasts: sampleRoasts,
  beans: sampleBeans,
  cups: sampleCups
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ROAST:
      const bean = state.beans.find((bean) => parseInt(bean.id) === parseInt(action.payload.beanName));
      action.payload.beanName = bean.beanName;
      return {
        ...state,
        roasts: [...state.roasts, { ...action.payload, beanId: bean.id, id: uuidv4() }]
      };
    case SAVE_BEAN:
      return {
        ...state,
        beans: [...state.beans, { ...action.payload, id: uuidv4() }]
      };
    case SAVE_CUP:
      const roast = state.roasts.find((roast) => parseInt(roast.id) === parseInt(action.payload.roastName));
      action.payload.roastName = roast.roastName;
      return {
        ...state,
        cups: [...state.cups, { ...action.payload, roastId: roast.id, cupId: uuidv4() }]
      };
    case REMOVE_CUP:
    return {
      ...state,
      cups: state.cups.filter((_, i) => i !== action.payload),
    };
    default:
      return state;
  }
};

export default reducer;