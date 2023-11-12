export const setLoading = () => (dispatch) => {
  return dispatch({ type: 'LOADING' });
};

export const setUnload = () => (dispatch) => {
  return dispatch({ type: 'UNLOAD' });
};

export const resetLoading = () => (dispatch) => {
  return dispatch({ type: 'RESET_LOADING' });
};
