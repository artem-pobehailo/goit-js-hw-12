// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:

// getImagesByQuery(query). Ця функція повинна приймати один параметр query (пошукове слово, яке є рядком), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.
// import
// Описаний у документації

import axios from 'axios';

const API_key = '50778756-9b90a508e8c3632d721faa58e';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const params = new URLSearchParams({
    key: API_key,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return axios.get(`${BASE_URL}?${params}`).then(response => response.data);
}
