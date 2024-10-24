export const SAVE_ROAST = 'SAVE_ROAST';
export const SAVE_BEAN = 'SAVE_BEAN';
export const SAVE_CUP = 'SAVE_CUP';
export const REMOVE_CUP = 'REMOVE_CUP';
export const UPDATE_CUP = 'UPDATE_CUP';

export const saveRoast = (roast) => ({
  type: SAVE_ROAST,
  payload: roast
});

export const saveBean = (bean) => ({
  type: SAVE_BEAN,
  payload: bean
});

export const saveCup = (cup) => ({
  type: SAVE_CUP,
  payload: cup
});

export const removeCup = (index) => ({
  type: 'REMOVE_CUP',
  payload: index,
});

export const updateCup = (index, updatedCup) => ({
  type: 'UPDATE_CUP',
  payload: { index, updatedCup },
});