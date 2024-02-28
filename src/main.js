import iziToast from 'izitoast';
import { searchImages } from './js/pixabay-api';
import {
  showLoader,
  hideLoader,
  renderGallery,
} from './js/render-functions.js';
window.iziToast = iziToast;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const inputData = document.querySelector('input');
const loader = document.querySelector('.loader');

let currentPage = 1;
let userRequest = '';
const imagesPerPage = 15;
loadMoreButton.style.display = 'none';

form.addEventListener('submit', async e => {
  e.preventDefault();
  userRequest = inputData.value.trim();
  currentPage = 1;

  if (!userRequest) {
    iziToast.error({
      message: 'Please enter a valid search query.',
      position: 'topRight',
    });
    loadMoreButton.style.display = 'none';
    gallery.innerHTML = '';
    return;
  }

  showLoader(loader);
  gallery.innerHTML = '';

  try {
    const data = await searchImages(userRequest, currentPage, imagesPerPage);
    const currentScrollY = window.scrollY;
    renderGallery(data, gallery);

    if (data.totalHits > currentPage * imagesPerPage) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
      showEndMessage();
    }
  } catch (error) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader(loader);
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;

  try {
    showLoader(loader);
    const data = await searchImages(userRequest, currentPage, imagesPerPage);
    const currentScrollY = window.scrollY;
    renderGallery(data, gallery);

    if (data.totalHits > currentPage * imagesPerPage) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
      showEndMessage();
    }

    window.scrollTo({
      top: currentScrollY + gallery.lastElementChild.clientHeight,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } finally {
    hideLoader(loader);
  }
});
