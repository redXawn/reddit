export const Types = {
  SET_FORUM_LIST: 'SET_FORUM_LIST',
};

export const setForumList = (data) => ({
  type: Types.SET_FORUM_LIST,
  payload: data,
});

const initialState = {
  forum: [],
  after: null,
};

const forum = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_FORUM_LIST:
      const data = action.payload;
      return {
        ...state,
        forum: [...state.forum, ...data.children],
        after: data.after,
      };
    default:
      return state;
  }
};

export default forum;
