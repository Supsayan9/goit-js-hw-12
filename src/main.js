import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './js/pixabay-api';
import { createGalleryElement } from './js/render-functions';
import errorMessage from './img/error-massage.svg';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery-list');
const loaderBox = document.querySelector('.loader-box');
const loadMoreButton = document.getElementById('load-more');
const endMessage = document.getElementById('end-message');

let currentPage = 1;
let totalPages = 1;
let searchInputValue = '';

const simpleLightbox = new SimpleLightbox('.gallery-list a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();

  searchInputValue = form.elements.search.value.trim();
  if (searchInputValue === '') return;

  currentPage = 1;
  gallery.innerHTML = '';
  loaderBox.classList.add('loader-box-active');
  loadMoreButton.style.display = 'none';
  endMessage.style.display = 'none';

  try {
    const data = await getPhotos(searchInputValue, currentPage);
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

    totalPages = Math.ceil(data.totalHits / 15);
    displayImages(data);
  } catch (error) {
    console.log(error);
  } finally {
    loaderBox.classList.remove('loader-box-active');
  }
}

async function onLoadMore() {
  if (currentPage >= totalPages) return;

  currentPage++;
  loaderBox.classList.add('loader-box-active');

  try {
    const data = await getPhotos(searchInputValue, currentPage);
    displayImages(data);
  } catch (error) {
    console.log(error);
  } finally {
    loaderBox.classList.remove('loader-box-active');
  }
}

function displayImages(data) {
  const galleryCardsTemplate = data.hits
    .map(imgInfo => createGalleryElement(imgInfo))
    .join('');
  gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);
  simpleLightbox.refresh();

  if (currentPage >= totalPages) {
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'block';
  }

  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
