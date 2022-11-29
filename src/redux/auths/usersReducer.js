const user = JSON.parse(localStorage.getItem('user')) || null;

const usersReducer = (state = user, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;
