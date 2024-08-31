import iziToast from 'izitoast';
import { gethPhotos } from './js/pixabay-api';
import { createGalleryElement } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import errorMessage from './img/error-massage.svg';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery-list');
const loaderBox = document.querySelector('.loader-box');
const loadMoreButton = document.getElementById('load-more');
const endMessage = document.getElementById('end-message');

let currentPage = 1;
let totalPages = 1; // Initialize with 1 or adjust as per your API

const simpleLightbox = new SimpleLightbox('.gallery-list a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();

  const searchInputValue = form.elements.search.value.trim();
  if (searchInputValue === '') return;

  currentPage = 1;
  gallery.innerHTML = '';
  loaderBox.classList.add('loader-box-active');
  loadMoreButton.style.display = 'none';
  endMessage.style.display = 'none';

  gethPhotos(searchInputValue, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
          backgroundColor: '#ef4040',
          titleColor: '#fff',
          titleSize: '16px',
          messageColor: '#fff',
          messageSize: '16px',
          iconUrl: errorMessage,
          maxWidth: '385px',
          timeout: 5000,
        });
        form.reset();
        form.elements.search.focus();
        return;
      }

      totalPages = Math.ceil(data.totalHits / 15); // Assuming 15 items per page
      displayImages(data);
      form.reset();
      form.elements.search.focus();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loaderBox.classList.remove('loader-box-active');
    });
}

function onLoadMore() {
  if (currentPage >= totalPages) return;

  currentPage++;
  const searchInputValue = form.elements.search.value.trim();
  loaderBox.classList.add('loader-box-active');

  gethPhotos(searchInputValue, currentPage)
    .then(data => {
      displayImages(data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loaderBox.classList.remove('loader-box-active');
    });
}

function displayImages(data) {
  if (data.hits.length === 0 || currentPage >= totalPages) {
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'block';
    return;
  }

  const galleryCardsTemplate = data.hits
    .map(imgInfo => createGalleryElement(imgInfo))
    .join('');
  gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);
  simpleLightbox.refresh();

  if (currentPage < totalPages) {
    loadMoreButton.style.display = 'block';
  }
}
