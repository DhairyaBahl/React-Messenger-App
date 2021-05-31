const initialState = {
    isLoading: false,
    repos: []
  }

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actions.repo.FETCH_BY_USERNAME:
      return {
        ...state,
        isLoading: true
      };
    case actions.repo.FETCH_BY_USERNAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        repos: action.repos
      };
      case actions.repo.FETCH_BY_USERNAME_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}