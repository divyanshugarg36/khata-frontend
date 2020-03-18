const { REACT_APP_API_URL: HOST } = process.env;

export const API = {
  // Authentication
  login: `${HOST}login`,
  verifyPassword: `${HOST}verifypassword`,

  // User
  addMember: `${HOST}user/add`,
  deleteMember: `${HOST}user/remove`,
  register: `${HOST}register`,
  update: `${HOST}user/update`,
  updatePassword: `${HOST}user/update/password`,
  fetchUsers: `${HOST}user/all`,
  fetchUser: `${HOST}user/fetch`,

  // Project
  addProject: `${HOST}project/add`,
  viewProject: `${HOST}project/view`,
  updateProject: `${HOST}project/update`,
  removeProject: `${HOST}project/remove`,
  fetchProjects: `${HOST}project/all`,
  assignMember: `${HOST}project/member/add`,
  removeMember: `${HOST}project/member/remove`,

  // History
  history: `${HOST}history/get`,

  // Invoice
  createInvoice: `${HOST}invoice/create`,
  saveInvoice: `${HOST}invoice/save`,
  getInvoices: `${HOST}invoice/all`,
  viewInvoice: `${HOST}invoice/view`,
};
