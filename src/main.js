import { getPhotos } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let searchQuery = '';
let totalHits = 0;
let lightbox;

const form = document.querySelector('.form');
const loadMoreButton = document.getElementById('load-more');
const endMessage = document.getElementById('end-message');
const loaderBox = document.querySelector('.loader-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchQuery = e.target.elements.search.value.trim();
  currentPage = 1;
  totalHits = 0;
  document.querySelector('.gallery-list').innerHTML = '';
  loadMoreButton.style.display = 'none';
  endMessage.style.display = 'none';
  loaderBox.classList.add('loader-box-active');

  try {
    const data = await getPhotos(searchQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      endMessage.style.display = 'block';
      endMessage.textContent = 'No images found. Please try a different search term.';
      return;
    }

    renderGallery(data.hits);

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery-list a', { captionsData: 'alt', captionDelay: 250 });
    } else {
      lightbox.refresh();
    }

    const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;

    if (totalHits > currentPage * 15) {
      loadMoreButton.style.display = 'block';
    } else {
      endMessage.style.display = 'block';
    }

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });

  } catch (error) {
    console.error(error);
  } finally {
    loaderBox.classList.remove('loader-box-active');
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  loaderBox.classList.add('loader-box-active');

  try {
    const data = await getPhotos(searchQuery, currentPage);
    renderGallery(data.hits);

    if (lightbox) {
      lightbox.refresh();
    }

    const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;

    if (totalHits <= currentPage * 15) {
      loadMoreButton.style.display = 'none';
      endMessage.style.display = 'block';
    }

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });

  } catch (error) {
    console.error(error);
  } finally {
    loaderBox.classList.remove('loader-box-active');
  }
});