const initialRoom = null;

const roomsReducer = (state = initialRoom, action) => {
  switch (action.type) {
    case 'GET_ROOM/fulfilled':
      return action.payload;
    default:
      return state;
  }
};

export default roomsReducer;
