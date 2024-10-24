import { copyWithStructuralSharing } from '@reduxjs/toolkit/query';
import { SAVE_ROAST, SAVE_BEAN, SAVE_CUP, REMOVE_CUP } from './actions';
// sampleData.js
export const sampleBeans = [
  { id: 1, name: 'Ethiopian Yirgacheffe', origin: 'Ethiopia', processing: "Washed", elevation: "4000", cost: "7.40", tastingNotes: "Blueberry" },
  { id: 2, name: 'Colombian Supremo', origin: 'Colombia', roastLevel: 'Dark', processing: "Natural", elevation: "1530", cost: "5.50", tastingNotes: "Sweet apple" },
  { id: 3, name: 'Guatemalan Antigua', origin: 'Guatemala', roastLevel: 'Light', processing: "Honey", elevation: "1120", cost: "4.30", tastingNotes: "Caramel, oak" },
];

export const sampleRoasts = [
  { id: 1, name: 'Morning Roast', beanType: 'Ethiopian Yirgacheffe', roastLevel: 'Medium', firstCracksTime: '10:30', secondCracksTime: '12:00', endRoastTime: '15:00' },
  { id: 2, name: 'Afternoon Delight', beanType: 'Colombian Supremo', roastLevel: 'Dark', firstCracksTime: '11:00', secondCracksTime: '13:00', endRoastTime: '16:00' },
  { id: 3, name: 'Evening Bliss', beanType: 'Guatemalan Antigua', roastLevel: 'Light', firstCracksTime: '09:30', secondCracksTime: '11:00', endRoastTime: '14:00' },
];

export const sampleCups = [
  { id: 1, name: 'Morning Cup', roast: 'Morning Roast', brewMethod: "AeroPress", timeOfDay: '08:00', brewTime: '04:00', cupRating: "4.75" },
  { id: 2, name: 'Afternoon Cup', roast: 'Evening Bliss', brewMethod: "French Press", timeOfDay: '14:00', brewTime: '03:30', cupRating: "4.25" },
  { id: 3, name: 'Evening Cup', roast: 'Afternoon Delight', brewMethod: "Pour Over", timeOfDay: '19:00', brewTime: '05:00', cupRating: "3.5" },
];
const initialState = {
  roasts: sampleRoasts,
  beans: sampleBeans,
  cups: sampleCups
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