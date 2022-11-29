const GET_USER = 'GET_USER';

const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export default getUser;
