import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');

const galleryItemsMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<a class="gallery__item" href="${original}">
        <img class="gallery__image"
        src="${preview}"
        alt="${description}"/>
      </a>`
  )
  .join('');

galleryRef.insertAdjacentHTML('afterbegin', galleryItemsMarkup);

const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
