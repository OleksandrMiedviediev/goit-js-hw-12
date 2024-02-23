import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function showLoader(container) {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  container.append(loader);
}

export function hideLoader(loader) {
  if (loader) {
    loader.remove();
  }
}

export function renderGallery(data, gallery) {
  if (data.hits.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  } else {
    const markup = data.hits
      .map(item => {
        return `<li class="gallery-item"><a href="${item.largeImageURL}">
          <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}"></a>
          <p><b>Likes: </b>${item.likes}</p>
          <p><b>Views: </b>${item.views}</p>
          <p><b>Comments: </b>${item.comments}</p>
          <p><b>Downloads: </b>${item.downloads}</p>
        </li>`;
      })
      .join('');
    gallery.insertAdjacentHTML('afterbegin', markup);

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
      animation: 250,
    });

    lightbox.refresh();
  }
}

export function hideEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}

export function showEndMessage() {
  const endMessage = document.createElement('div');
  endMessage.classList.add('end-message');
  endMessage.textContent =
    "We're sorry, but you've reached the end of search results.";
  document.body.appendChild(endMessage);
}

export function scrollToNextGroup() {
  const cardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
