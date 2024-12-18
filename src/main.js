import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderMarkup, createGalleryMarkup } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    spinner: document.querySelector('.spinner'),
    loadMore: document.querySelector('.load-more-button'),
  };

  let currentPage = 1;
  let query = '';

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  const toggleLoading = isLoading => {
    refs.spinner.classList.toggle('loading', isLoading);
  };

  const toggleLoadMore = isVisible => {
    refs.loadMore.classList.toggle('active', isVisible);
  };

  const showError = (
    message = 'Sorry, there are no images matching your search query. Please try again!'
  ) => {
    iziToast.error({
      message,
      position: 'topRight',
    });
  };

  const renderImages = images => {
    renderMarkup({
      ref: refs.gallery,
      markup: createGalleryMarkup(images),
    });
    lightbox.refresh();
  };

  const fetchAndRenderImages = async (isLoadMore = false) => {
    try {
      const { images, pages } = await fetchImages({ query, page: currentPage });
      if (images.length) {
        renderImages(images);
        toggleLoadMore(pages > currentPage);

        if (isLoadMore && pages <= currentPage) {
          iziToast.info({
            message:
              "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
        }
      } else {
        showError();
      }
    } catch (error) {
      showError(
        'An error occurred while fetching the images. Please try again later.'
      );
    } finally {
      toggleLoading(false);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    query = refs.form.query.value.trim();

    if (!query) {
      showError('Please enter a valid search query.');
      return;
    }

    refs.gallery.innerHTML = '';
    currentPage = 1;
    toggleLoading(true);
    toggleLoadMore(false);

    await fetchAndRenderImages();
  };

  const onLoadMore = async () => {
    currentPage++;
    toggleLoading(true);
    toggleLoadMore(false);

    await fetchAndRenderImages(true);

    const galleryItem = document.querySelector('.gallery li');
    if (galleryItem) {
      const scrollHeight = galleryItem.getBoundingClientRect().height * 2;
      window.scrollBy(0, scrollHeight);
    }
  };

  refs.form.addEventListener('submit', onSubmit);
  refs.loadMore.addEventListener('click', onLoadMore);
});
