// У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

// createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const loadMore = document.querySelector('.load-more');
const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        likes,
        tags,
        views,
        comments,
        downloads,
      }) => `
      <li>
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" />
          </a>
          <p>Likes: ${likes}, Views: ${views}, Comments: ${comments}, Downloads: ${downloads}</p>
        </li>`
    )
    .join('');

  list.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  list.innerHTML = '';
}

export function showLoader() {
  if (loader) {
    loader.classList.add('visible');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.remove('visible');
  }
}

export function showLoadMoreButton() {
  loadMore.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMore.classList.add('hidden');
}
