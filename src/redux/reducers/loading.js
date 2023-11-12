export const Types = {
  SET_LOADING: 'SET_LOADING',
  SET_UNLOAD: 'SET_UNLOAD',
};

export const setLoading = () => ({
  type: Types.SET_LOADING,
});

export const setUnload = () => ({
  type: Types.SET_UNLOAD,
});

const initialState = {
  globalLoading: 0,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_LOADING:
      return {
        ...state,
        globalLoading: state.globalLoading + 1,
      };
    case Types.SET_UNLOAD:
      return {
        ...state,
        globalLoading: state.globalLoading - 1,
      };
    default:
      return state;
  }
};

export default loading;
