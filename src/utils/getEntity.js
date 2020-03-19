import axios from 'axios';

export const getEntity = (url, data, cb) => {
  axios.post(url, data)
    .then(({ data: response }) => cb(response))
    .catch((err) => console.log(err));
};
