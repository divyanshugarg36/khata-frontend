import axios from 'axios';

export const deleteEntity = (url, data, history, entity) => {
  axios.post(url, data)
    .then(() => {
      const { push } = history;
      push(`/${entity.toLowerCase()}/all`);
      window.alert(`${entity} removed!`);
    })
    .catch((err) => console.log(err));
};
