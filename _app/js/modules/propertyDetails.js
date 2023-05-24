import { sanity } from '../sanity.js';

export default async function propertyDetails() {
   const urlParams = new URLSearchParams(window.location.search);
   const listingId = urlParams.get('id');
   const PropertyContainer = document.querySelector('.main__properties-detailed');

   let property = null;

   async function fetchPropertyById() {
      const query = `*[_type == 'propertyListing' && _id == '${listingId}'] {
         _id,
         'images': images[].asset->url,
         'title': title,
      }[0]`;

      property = await sanity.fetch(query);
   }

   function createPropertyDOM() {
      const container = document.createElement('div');
      const image = document.createElement('img');
      const title = document.createElement('h2');
      const nextButton = document.createElement('button');
      const previousButton = document.createElement('button');
      const imageCounter = document.createElement('p');

      container.className = 'main__properties-detailed-container';
      image.className = 'main__properties-detailed-image';
      title.className = 'main__properties-detailed-title';
      nextButton.className = 'next-button bi bi-arrow-right';
      previousButton.className = 'previous-button bi bi-arrow-left';
      imageCounter.className = 'image-counter';

      // initially, set the image src to the first image
      image.src = property.images[0];
      title.innerText = property.title;
      document.title = property.title;
      nextButton.innerText = '';
      previousButton.innerText = '';
      imageCounter.innerText = `1/${property.images.length}`;

      container.appendChild(previousButton);
      container.appendChild(image);
      container.appendChild(nextButton);
      container.appendChild(imageCounter);
      container.appendChild(title);

      return { container, image, nextButton, previousButton, imageCounter };
   }

   async function renderProperty() {
      const { container, image, nextButton, previousButton, imageCounter } = createPropertyDOM();
      PropertyContainer.appendChild(container);

      let currentIndex = 0;

      nextButton.addEventListener('click', () => {
         currentIndex = (currentIndex + 1) % property.images.length;
         image.src = property.images[currentIndex];
         imageCounter.innerText = `${currentIndex + 1}/${property.images.length}`;
      });

      previousButton.addEventListener('click', () => {
         currentIndex = (currentIndex - 1 + property.images.length) % property.images.length;
         image.src = property.images[currentIndex];
         imageCounter.innerText = `${currentIndex + 1}/${property.images.length}`;
      });
   }

   await fetchPropertyById();
   await renderProperty();
}

propertyDetails();
