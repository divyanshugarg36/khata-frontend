import axios from 'axios';

export const addEntity = (url, data, entity, cb) => {
  axios.post(url, data)
    .then(({ data }) => {
      window.alert(`${entity} added!`);
      cb(data);
    }).catch((err) => {
      if (err.response) {
        window.alert(err.response.data.info || `${entity} not added!`);
      }
    });
};
