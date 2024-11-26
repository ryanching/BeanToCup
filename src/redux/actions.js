export const SAVE_ROAST = 'SAVE_ROAST';
export const SAVE_BEAN = 'SAVE_BEAN';
export const SAVE_CUP = 'SAVE_CUP';
export const REMOVE_CUP = 'REMOVE_CUP';
export const REMOVE_BEAN = 'REMOVE_BEAN';
export const REMOVE_ROAST = 'REMOVE_ROAST';

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

export const removeBean = (index) => ({
  type: 'REMOVE_BEAN',
  payload: index,
});

export const removeRoast = (index) => ({
  type: 'REMOVE_ROAST',
  payload: index,
});
