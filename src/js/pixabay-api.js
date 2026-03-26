// pixabay-api.js
import axios from 'axios';

const API_KEY = '55187145-d3b914f8bfc13386f944f455c';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15, 
    },
  });

  return response.data;
}