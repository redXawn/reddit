export const Types = {
  SET_FORUM_LIST: 'SET_FORUM_LIST',
  RESET_FORUM_LIST: 'RESET_FORUM_LIST',
  SET_CARD_VARIANT: 'SET_CARD_VARIANT',
  SET_SORT_FORUM: 'SET_SORT_FORUM',
  SET_VOTE: 'SET_VOTE',
};

export const setForumList = (data) => ({
  type: Types.SET_FORUM_LIST,
  payload: data,
});

export const resetForumList = () => ({
  type: Types.RESET_FORUM_LIST,
});

export const setCardVariant = (data) => ({
  type: Types.SET_CARD_VARIANT,
  payload: data,
});

export const setSortForum = (data) => ({
  type: Types.SET_SORT_FORUM,
  payload: data,
});

export const setVote = (data) => ({
  type: Types.SET_VOTE,
  payload: data,
});

const initialState = {
  forum: [],
  after: null,
  cardVariant: 'card',
  sort: 'hot',
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
    case Types.RESET_FORUM_LIST:
      return {
        ...state,
        forum: [],
        after: null,
      };
    case Types.SET_CARD_VARIANT:
      return {
        ...state,
        cardVariant: action.payload,
      };
    case Types.SET_SORT_FORUM:
      return {
        ...state,
        sort: action.payload,
        forum: [],
      };
    case Types.SET_VOTE:
      const newForumData = state.forum.map((item) => {
        if (item.data.id === action.payload.id) {
          if (action.payload.type === 'up') {
            const handleUpsVote = () => {
              if (item.data.hates) {
                return item.data.ups + 2;
              } else if (item.data.likes) {
                return item.data.ups - 1;
              } else {
                return item.data.ups + 1;
              }
            };
            return {
              ...item,
              data: {
                ...item.data,
                ups: handleUpsVote(),
                likes: item.data.likes ? false : true,
                hates: false,
              },
            };
          } else {
            const handleDownsVote = () => {
              if (item.data.likes) {
                return item.data.ups - 2;
              } else if (item.data.hates) {
                return item.data.ups + 1;
              } else {
                return item.data.ups - 1;
              }
            };
            return {
              ...item,
              data: {
                ...item.data,
                ups: handleDownsVote(),
                hates: item.data.hates ? false : true,
                likes: false,
              },
            };
          }
        }

        return item;
      });

      return {
        ...state,
        forum: newForumData,
      };
    default:
      return state;
  }
};

export default forum;
