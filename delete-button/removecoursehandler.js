const handleRemoveCourse = course => {
    dispatchCourses({
      type: 'REMOVE_COURSE',
      payload: course
    });
  }