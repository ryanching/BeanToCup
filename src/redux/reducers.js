import { SAVE_ROAST, SAVE_BEAN, SAVE_CUP, REMOVE_CUP } from './actions';
import { v4 as uuidv4 } from 'uuid';

// sampleData.js
export const sampleBeans = [
  { id: 1, beanName: 'Ethiopian Yirgacheffe', origin: 'Ethiopia', processing: "Washed", beanNotes: "Good bean with lots of berry notes", elevation: "4000", cost: "7.40", tastingNotes: "Blueberry", beanRating: "4.0" },
  { id: 2, beanName: 'Colombian Supremo', origin: 'Colombia', processing: "Natural", elevation: "1530", cost: "5.50", tastingNotes: "Sweet apple", beanRating: "4.9" },
  { id: 3, beanName: 'Guatemalan Antigua', origin: 'Guatemala', processing: "Honey", elevation: "1120", cost: "4.30", tastingNotes: "Caramel, oak", beanRating: "4.5" },
  { id: 10, beanName: 'Colombian Double Ferment', origin: 'Colombia', processing: "Natural", elevation: "1700", cost: "6.50", tastingNotes: "Fruit, grape jam", beanRating: "4.5" },
];

export const sampleRoasts = [
  { id: 4, roastName: 'Morning Roast', beanName: 'Ethiopian Yirgacheffe', beanId: 1, roastLevel: 'Medium', roastNotes: "good medium roast for espresso", firstCracksTime: '10:30', secondCracksTime: '12:00', endRoastTime: '15:00', roastRating: "3.9"},
  { id: 5, roastName: 'Afternoon Delight', beanName: 'Colombian Supremo', beanId: 2, roastLevel: 'Dark', firstCracksTime: '11:00', secondCracksTime: '13:00', endRoastTime: '16:00', roastRating: "3.3"},
  { id: 6, roastName: 'Evening Bliss', beanName: 'Guatemalan Antigua', beanId: 3, roastLevel: 'Light', firstCracksTime: '09:59', secondCracksTime: '11:00', endRoastTime: '14:00', roastRating: "3.5"},
  { id: 11, roastName: 'Coldo Ferm 11/20', beanName: 'Colombian Double Ferment', beanId: 10, roastLevel: 'Light', firstCracksTime: '09:30', secondCracksTime: '00:00', endRoastTime: '10:35', roastRating: "4.0"},
];

export const sampleCups = [
  { id: 7, roastName: 'Morning Roast', roastId: 4, brewMethod: "AeroPress", cupNotes: "yummy cup", timeOfDay: '08:00', brewTime: '04:00', cupRating: "4.75" },
  { id: 8, roastName: 'Evening Bliss', roastId: 6, brewMethod: "French Press", cupNotes: "pretty good cup but not as good as the morning roast cup was", timeOfDay: '14:00', brewTime: '03:30', cupRating: "4.25" },
  { id: 9, roastName: 'Afternoon Delight', roastId: 5, brewMethod: "Pour Over", cupNotes: "okay cup", timeOfDay: '19:00', brewTime: '05:00', cupRating: "3.5" },
  { id: 12, roastName: 'Coldo Ferm 11/20', roastId: 11, brewMethod: "Pour Over", cupNotes: "Great cup", timeOfDay: '08:30', brewTime: '03:30', cupRating: "4.9" },
  { id: 13, roastName: 'Coldo Ferm 11/20', roastId: 11, brewMethod: "Pour Over", cupNotes: "Excellend cup", timeOfDay: '07:45', brewTime: '03:50', cupRating: "5.0" },
  { id: 14, roastName: 'Coldo Ferm 11/20', roastId: 11, brewMethod: "Pour Over", cupNotes: "Pretty Good cup", timeOfDay: '09:00', brewTime: '04:05', cupRating: "4.25" },
  { id: 15, roastName: 'Morning Roast', roastId: 4, brewMethod: "AeroPress", cupNotes: "Nice and fruity", timeOfDay: '07:30', brewTime: '04:10', cupRating: "4.5" },
  { id: 16, roastName: 'Evening Bliss', roastId: 6, brewMethod: "French Press", cupNotes: "Smooth and balanced", timeOfDay: '15:00', brewTime: '03:45', cupRating: "4.0" },
  { id: 17, roastName: 'Afternoon Delight', roastId: 5, brewMethod: "Pour Over", cupNotes: "Rich and bold", timeOfDay: '18:30', brewTime: '04:50', cupRating: "3.8" },
  { id: 18, roastName: 'Coldo Ferm 11/20', roastId: 11, brewMethod: "Pour Over", cupNotes: "Complex flavors", timeOfDay: '09:15', brewTime: '03:40', cupRating: "4.7" },
  { id: 19, roastName: 'Morning Roast', roastId: 4, brewMethod: "AeroPress", cupNotes: "Bright and lively", timeOfDay: '08:15', brewTime: '04:20', cupRating: "4.6" },
  { id: 20, roastName: 'Evening Bliss', roastId: 6, brewMethod: "French Press", cupNotes: "Deep and rich", timeOfDay: '16:00', brewTime: '03:35', cupRating: "4.3" },
  { id: 21, roastName: 'Afternoon Delight', roastId: 5, brewMethod: "Pour Over", cupNotes: "Smooth and mellow", timeOfDay: '17:45', brewTime: '04:30', cupRating: "3.9" },
  { id: 22, roastName: 'Coldo Ferm 11/20', roastId: 11, brewMethod: "Pour Over", cupNotes: "Fruity and sweet", timeOfDay: '08:45', brewTime: '03:55', cupRating: "4.8" },
  { id: 23, roastName: 'Morning Roast', roastId: 4, brewMethod: "AeroPress", cupNotes: "Crisp and clean", timeOfDay: '07:45', brewTime: '04:15', cupRating: "4.4" },
  { id: 24, roastName: 'Evening Bliss', roastId: 6, brewMethod: "French Press", cupNotes: "Rich and smooth", timeOfDay: '15:30', brewTime: '03:50', cupRating: "4.2" },
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