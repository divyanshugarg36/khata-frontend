import axios from 'axios';

export const addEntity = (url, data, entity, cb) => {
  axios.post(url, data)
    .then(({ data }) => {
      window.alert(`${entity} added!`);
      cb(data);
    }).catch((err) => {
        window.alert(err.response ? err.response.data.info : `${entity} not added!`);
    });
};
