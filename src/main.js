import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

// 🔎 Пошук
form.addEventListener('submit', async e => {
  e.preventDefault();

  query = e.target.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  loadMoreBtn.style.display = 'none';

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query.',
      });
      return;
    }

    createGallery(data.hits);

    // показ кнопки
    if (totalHits > 15) {
      loadMoreBtn.style.display = 'block';
    }

  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  } finally {
    hideLoader();
  }
});

// ➕ Load more
loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    // 🔥 перевірка кінця колекції
    const totalLoaded = page * 15;

    if (totalLoaded >= totalHits) {
      loadMoreBtn.style.display = 'none';

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    // 🔽 плавний скрол
    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

  } catch (error) {
    iziToast.error({ message: 'Error loading more images' });
  } finally {
    hideLoader();
  }
});