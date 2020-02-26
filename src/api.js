const { REACT_APP_API_URL: HOST } = process.env;

export const API = {
  // Authentication
  login: `${HOST}login`,
  verifyPassword: `${HOST}verifypassword`,

  // User
  addMember: `${HOST}user/add`,
  register: `${HOST}register`,
  update: `${HOST}user/update`,
  fetchUsers: `${HOST}user/all`,

  // Project
  addProject: `${HOST}project/add`,
  viewProject: `${HOST}project/view`,
  updateProject: `${HOST}project/update`,
  removeProject: `${HOST}project/remove`,
  fetchProjects: `${HOST}project/all`,
  assignMember: `${HOST}project/member/add`,
  removeMember: `${HOST}project/member/remove`,

  // History
  history: `${HOST}history`,
};
