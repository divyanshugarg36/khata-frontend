const { REACT_APP_API_URL: HOST } = process.env;

export const API = {
  // Authentication
  login: `${HOST}login`,
  verifyPassword: `${HOST}verifypassword`,

  // User
  register: `${HOST}register`,
  update: `${HOST}user/update`,

  // Project
  addProject: `${HOST}project/add`,
  viewProject: `${HOST}project/view`,
  updateProject: `${HOST}project/update`,
  removeProject: `${HOST}project/remove`,
  fetchProjects: `${HOST}project/all`,

  // Assignments
  addMember: `${HOST}project/member/add`,
};
