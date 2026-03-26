import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

// Пошук
form.addEventListener('submit', async e => {
  e.preventDefault();

  query = e.target.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();

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

    // ВАЖЛИВО: якщо ВСІ результати вже показані
    if (totalHits <= PER_PAGE) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    // показати кнопку
    showLoadMoreButton();

  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  } finally {
    hideLoader();
  }
});

// ➕ Load more
document.querySelector('.load-more').addEventListener('click', async () => {
  page += 1;

  // Ховаємо кнопку під час запиту
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    const totalLoaded = page * PER_PAGE;

    // КІНЕЦЬ КОЛЕКЦІЇ
    if (totalLoaded >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    // якщо ще є — показати кнопку назад
    showLoadMoreButton();

    // плавний скрол
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