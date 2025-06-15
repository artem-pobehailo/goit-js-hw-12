import axios from 'axios';

const API_key = '50778756-9b90a508e8c3632d721faa58e';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = new URLSearchParams({
    key: API_key,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
