export const SAVE_ROAST = 'SAVE_ROAST';
export const SAVE_BEAN = 'SAVE_BEAN';
export const SAVE_CUP = 'SAVE_CUP';

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