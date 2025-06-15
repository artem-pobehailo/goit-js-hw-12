import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
const loadMore = document.querySelector('.load-more');
let page = 1;
let query = '';
let limit = 15;
let pages = 0;

loadMore.addEventListener('click', handleLoadMore);

// fetchPostsBtn.addEventListener('click', async () => {
//   if (page > totalPages) {
//     return iziToast.error({
//       position: 'topRight',
//       message: "We're sorry, there are no more posts to load",
//     });
// //   }

//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//     // Increase the group number
//     page += 1;

//     // Replace button text after first request
//     if (page > 1) {
//       fetchPostsBtn.textContent = 'Fetch more posts';
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

const form = document.querySelector('.form');

form.addEventListener('submit', handlsubmit);
async function handlsubmit(event) {
  event.preventDefault();

  query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }
  query = query;
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  // await getImagesByQuery(query, page)
  //     .then(data => {
  //       if (data.hits.length === 0) {
  //         iziToast.info({
  //           title: 'No results',
  //           message:
  //             'Sorry, there are no images matching your search query. Please try again!',
  //           position: 'topRight',
  //         });
  //         return;
  //       }

  //       createGallery(data.hits);
  //     })
  //     if (page < totalPages) {
  //       showLoadMoreButton();
  //     } else {
  //       iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
  //     }
  //     .catch(error => {
  //       iziToast.error({
  //         title: 'Error',
  //         message: `Something went wrong: ${error.message}`,
  //         position: 'topRight',
  //       });
  //     })
  //     .finally(() => {
  //       hideLoader();
  //     });
  // }
  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'No images found. Try another search!',
        position: 'topRight',
      });
      return;
    }
    pages = Math.ceil(data.totalHits / limit);
    createGallery(data.hits);

    if (page < pages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    smoothScroll();

    if (page >= pages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery li');
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2 + 24,
    behavior: 'smooth',
  });
}
