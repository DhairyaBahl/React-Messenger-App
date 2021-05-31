const initialState = {
    isLoading: false,
    users: [],
    user: null
  }

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actions.user.FETCH_ALL:
      return {
        ...state,
        isLoading: true
      };
    case actions.user.FETCH_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.users
      };
      case actions.user.FETCH_ALL_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case actions.user.FETCH_BY_USERNAME:
      return {
        ...state,
        isLoading: true
      };
    case actions.user.FETCH_BY_USERNAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.user
      };
    case actions.user.FETCH_BY_USERNAME_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}