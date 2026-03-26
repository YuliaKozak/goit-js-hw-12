import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

// ДОДАВАННЯ (а не перезапис)
export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p>Likes: ${likes}</p>
          <p>Views: ${views}</p>
          <p>Comments: ${comments}</p>
          <p>Downloads: ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}