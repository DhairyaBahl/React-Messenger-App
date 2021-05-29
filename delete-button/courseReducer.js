const coursesReducer = (state, action) => {
    switch(action.type) {
      case 'SET_COURSES':
        return action.payload;
      case 'REMOVE_COURSE':
        return state.filter(
          course => action.payload.id !== course.id
        );
      default: 
        throw new Error();
    }
  };