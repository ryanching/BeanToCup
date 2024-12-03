import { createStore } from 'redux';
import reducer from './reducers';

const sampleBeans = [
  { id: '1', beanName: 'Ethiopian Yirgacheffe', origin: 'Ethiopia', processing: "Washed", beanNotes: "Good bean with lots of berry notes", elevation: "4000", cost: "7.40", tastingNotes: "Blueberry", beanRating: "4.0" },
  { id: '2', beanName: 'Colombian Supremo', origin: 'Colombia', processing: "Natural", elevation: "1530", cost: "5.50", beanNotes: "Sweet apple", beanRating: "4.9" },
  { id: '3', beanName: 'Guatemalan Antigua', origin: 'Guatemala', processing: "Honey", elevation: "1120", cost: "4.30", beanNotes: "Caramel, oak", beanRating: "4.5" },
  { id: '10', beanName: 'Colombian Double Ferment', origin: 'Colombia', processing: "Natural", elevation: "1700", cost: "6.50", beanNotes: "Fruit, grape jam", beanRating: "4.5" },
  { id: 'a27', beanName: 'Ethiopian Guji', origin: 'Ethiopia', processing: "Natural", elevation: "3000", cost: "6.50", beanNotes: "Fruit, grape jam", beanRating: "4.5" },
];

const sampleRoasts = [
  { id: '4', roastName: 'Morning Roast', beanName: 'Ethiopian Yirgacheffe', beanId: '1', roastLevel: 'Medium', roastNotes: "good medium roast for espresso", firstCracksTime: '10:30', secondCracksTime: '12:00', endRoastTime: '15:00', roastRating: "3.9", roastDate: '2024-12-03' },
  { id: '5', roastName: 'Afternoon Delight', beanName: 'Colombian Supremo', beanId: '2', roastLevel: 'Dark', firstCracksTime: '11:00', secondCracksTime: '13:00', endRoastTime: '16:00', roastRating: "3.3", roastDate: '2024-11-15' },
  { id: '6', roastName: 'Evening Bliss', beanName: 'Guatemalan Antigua', beanId: '3', roastLevel: 'Light', firstCracksTime: '09:59', secondCracksTime: '11:00', endRoastTime: '14:00', roastRating: "3.5", roastDate: '2024-10-20' },
  { id: '11', roastName: 'Coldo Ferm 11/20', beanName: 'Colombian Double Ferment', beanId: '10', roastLevel: 'Light', firstCracksTime: '09:30', secondCracksTime: '00:00', endRoastTime: '10:35', roastRating: "4.0", roastDate: '2024-09-10' },
  { id: 'a26', roastName: 'Medlight Eth Guji', beanName: 'Colombian Double Ferment', beanId: 'a27', roastLevel: 'Light', firstCracksTime: '09:15', secondCracksTime: '00:00', endRoastTime: '10:15', roastRating: "4.0", roastDate: '2024-08-05' },
];

const sampleCups = [
  { id: '7', roastName: 'Morning Roast', roastId: '4', brewMethod: "AeroPress", cupNotes: "yummy cup", timeOfDay: '2024-12-03 08:00 AM', brewTime: '04:00', cupRating: "4.75" },
  { id: '8', roastName: 'Evening Bliss', roastId: '6', brewMethod: "French Press", cupNotes: "pretty good cup but not as good as the morning roast cup was", timeOfDay: '2024-11-20 02:30 PM', brewTime: '03:30', cupRating: "4.25" },
  { id: '9', roastName: 'Afternoon Delight', roastId: '5', brewMethod: "Pour Over", cupNotes: "okay cup", timeOfDay: '2024-11-15 07:00 PM', brewTime: '05:00', cupRating: "3.5" },
  { id: '12', roastName: 'Coldo Ferm 11/20', roastId: '11', brewMethod: "Pour Over", cupNotes: "Great cup", timeOfDay: '2024-10-30 08:30 AM', brewTime: '03:30', cupRating: "4.9" },
  { id: '13', roastName: 'Coldo Ferm 11/20', roastId: '11', brewMethod: "Pour Over", cupNotes: "Excellend cup", timeOfDay: '2024-10-25 07:45 AM', brewTime: '03:50', cupRating: "5.0" },
  { id: '14', roastName: 'Coldo Ferm 11/20', roastId: '11', brewMethod: "Pour Over", cupNotes: "Pretty Good cup", timeOfDay: '2024-10-20 09:00 AM', brewTime: '04:05', cupRating: "4.25" },
  { id: '15', roastName: 'Morning Roast', roastId: '4', brewMethod: "AeroPress", cupNotes: "Nice and fruity", timeOfDay: '2024-09-15 07:30 AM', brewTime: '04:10', cupRating: "4.5" },
  { id: '16', roastName: 'Evening Bliss', roastId: '6', brewMethod: "French Press", cupNotes: "Smooth and balanced", timeOfDay: '2024-09-10 03:45 PM', brewTime: '03:45', cupRating: "4.0" },
  { id: '17', roastName: 'Afternoon Delight', roastId: '5', brewMethod: "Pour Over", cupNotes: "Rich and bold", timeOfDay: '2024-08-25 06:30 PM', brewTime: '04:50', cupRating: "3.8" },
  { id: '18', roastName: 'Coldo Ferm 11/20', roastId: '11', brewMethod: "Pour Over", cupNotes: "Complex flavors", timeOfDay: '2024-08-20 09:15 AM', brewTime: '03:40', cupRating: "4.7" },
  { id: '19', roastName: 'Morning Roast', roastId: '4', brewMethod: "AeroPress", cupNotes: "Bright and lively", timeOfDay: '2024-08-15 08:15 AM', brewTime: '04:20', cupRating: "4.6" },
  { id: '20', roastName: 'Evening Bliss', roastId: '6', brewMethod: "French Press", cupNotes: "Deep and rich", timeOfDay: '2024-08-10 04:00 PM', brewTime: '03:35', cupRating: "4.3" },
  { id: '21', roastName: 'Afternoon Delight', roastId: '5', brewMethod: "Pour Over", cupNotes: "Smooth and mellow", timeOfDay: '2024-07-30 05:45 PM', brewTime: '04:30', cupRating: "3.9" },
  { id: '22', roastName: 'Coldo Ferm 11/20', roastId: '11', brewMethod: "Pour Over", cupNotes: "Fruity and sweet", timeOfDay: '2024-07-25 08:45 AM', brewTime: '03:55', cupRating: "4.8" },
  { id: '23', roastName: 'Morning Roast', roastId: '4', brewMethod: "AeroPress", cupNotes: "Crisp and clean", timeOfDay: '2024-07-20 07:45 AM', brewTime: '04:15', cupRating: "4.4" },
  { id: '24', roastName: 'Evening Bliss', roastId: '6', brewMethod: "French Press", cupNotes: "Rich and smooth", timeOfDay: '2024-07-15 03:50 PM', brewTime: '03:50', cupRating: "4.2" },
  { id: 'a25', roastName: 'Medlight Eth Guji', roastId: 'a26', brewMethod: "v60", cupNotes: "Sweet, berries and cream", timeOfDay: '2024-07-10 08:00 AM', brewTime: '03:05', cupRating: "5.0" },
];

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return {
        roasts: sampleRoasts,
        beans: sampleBeans,
        cups: sampleCups,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      roasts: sampleRoasts,
      beans: sampleBeans,
      cups: sampleCups,
    };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;