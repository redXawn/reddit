export const Types = {
  SET_THREAD: 'SET_THREAD',
  RESET_THREAD: 'RESET_THREAD',
};

export const setThread = (data) => ({
  type: Types.SET_THREAD,
  payload: data,
});

export const resetThread = () => ({
  type: Types.RESET_THREAD,
});

const initialState = {
  main: null,
  comment: null,
};

const forum = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_THREAD:
      const main = action.payload[0].data.children[0];
      const comment = action.payload[1] ? action.payload[1] : null;
      return {
        ...state,
        main,
        comment,
      };
    case Types.RESET_THREAD:
      return {
        ...state,
        main: null,
        comment: null,
      };
    default:
      return state;
  }
};

export default forum;
