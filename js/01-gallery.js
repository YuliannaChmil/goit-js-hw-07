import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const itemsMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", itemsMarkup);
galleryContainer.addEventListener("click", onImageClick);

const instance = basicLightbox.create(
  `
    <img src=" " width = "1280" height = "auto" >`,
  {
    onShow: (instance) => {
      window.addEventListener("keydown", closeOnEsc);
    },
    onClose: (instance) => {
      window.removeEventListener("keydown", closeOnEsc);
    },
  }
);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join("");
}

function onImageClick(event) {
  event.preventDefault();
  const datasetSource = event.target.dataset.source;
  if (!datasetSource) return;
  instance.element().querySelector("img").src = datasetSource;
  instance.show();
}

function closeOnEsc(event) {
  if (event.code === "Escape") {
    instance.close();
  }
}
