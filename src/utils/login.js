export const login = (token) => {
  localStorage.setItem('access_token', token);
};
