import axios from 'axios';

export const deleteEntity = (url, data, history, entity) => {
  axios.post(url, data)
    .then(() => {
      const { push } = history;
      push(`/${entity.toLowerCase()}/all`);
      window.alert(`${entity} removed!`);
    })
    .catch((err) => {
      if (err.response) {
        window.alert(err.response.data.info);
      } else {
        window.alert(`${entity} not removed!`);
      }
    });
};
