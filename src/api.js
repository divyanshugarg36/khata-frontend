const { REACT_APP_API_URL: HOST } = process.env;

export const API = {
  history: {
    get: `${HOST}history/get`,
  },

  invoice: {
    all: `${HOST}invoice/all`,
    create: `${HOST}invoice/create`,
    get: `${HOST}invoice/view`,
    save: `${HOST}invoice/save`,
  },

  login: `${HOST}login`,

  project: {
    add: `${HOST}project/add`,
    all: `${HOST}project/all`,
    assign: `${HOST}project/member/add`,
    get: `${HOST}project/view`,
    remove: `${HOST}project/remove`,
    unassign: `${HOST}project/member/remove`,
    update: `${HOST}project/update`,
  },

  toggl: {
    details: 'https://toggl.com/reports/api/v2/details',
  },

  user: {
    add: `${HOST}user/add`,
    all: `${HOST}user/all`,
    delete: `${HOST}user/remove`,
    get: `${HOST}user/fetch`,
    register: `${HOST}register`,
    update: {
      password: `${HOST}user/update/password`,
      profile: `${HOST}user/update`,
    },
  },

  verify: `${HOST}verifypassword`,
};
