import { sanity } from '../sanity.js';

export default async function propertyDetails() {

   // Retrieves the listing ID from the URL
   const urlParams = new URLSearchParams(window.location.search);
   const listingId = urlParams.get('id');
   const PropertyContainer = document.querySelector('.main__properties-detailed');

   // Initializes a variable to store the fetched property
   let property = null;

   // Fetches a property from sanity based on it's ID.
   async function fetchPropertyById() {
      const query = `*[_type == 'propertyListing' && _id == '${listingId}'] {
         _id,
         'images': images[].asset->url,
         'title': title,
         'description': description,
         'price': price,
         'currency': currency,
         'location': location,
         'bedrooms': bedrooms,
         'floorArea': floorArea,
         'propertyType': propertyType[],
      }[0]`;

      // Fetches the property and stores it in the variable.
      property = await sanity.fetch(query);
   }

   function createPropertyDOM() {
      const container = document.createElement('div');
      const imageContainer = document.createElement('div');
      const detailsContainer = document.createElement('div');
      const image = document.createElement('img');
      const title = document.createElement('h2');
      const description = document.createElement('p');
      const price = document.createElement('p');
      const currency = document.createElement('p');
      const location = document.createElement('p');
      const bedrooms = document.createElement('p');
      const floorArea = document.createElement('p');
      const propertyType = document.createElement('p');
      const nextButton = document.createElement('button');
      const previousButton = document.createElement('button');
      const imageCounter = document.createElement('p');

      container.className = 'main__properties-detailed-container';
      imageContainer.className = 'main__properties-detailed-imageContainer';
      detailsContainer.className = 'main__properties-detailed-detailsContainer';
      image.className = 'main__properties-detailed-image';
      title.className = 'main__properties-detailed-title';
      description.className = 'main__properties-detailed-description';
      price.className = 'main__properties-detailed-price';
      currency.className = 'main__properties-detailed-currency';
      location.className = 'main__properties-detailed-location';
      bedrooms.className = 'main__properties-detailed-bedrooms';
      floorArea.className = 'main__properties-detailed-floorArea';
      propertyType.className = 'main__properties-detailed-propertyType';
      nextButton.className = 'next-button bi bi-arrow-right';
      previousButton.className = 'previous-button bi bi-arrow-left';
      imageCounter.className = 'image-counter';

      // Sets the image source to the first image
      image.src = property.images[0];
      title.innerText = property.title;
      document.title = property.title;
      description.innerText = property.description;
      price.innerHTML = `<strong>Price:</strong> <br> ${parseFloat(property.price).toLocaleString('de-DE')} ${property.currency}`;
      location.innerHTML = `<strong>Location:</strong> <br> ${property.location}`;
      bedrooms.innerHTML = `<strong>Bedrooms:</strong> <br> ${property.bedrooms}`;
      floorArea.innerHTML = `<strong>Floor Area:</strong> <br> ${property.floorArea} m²`;
      propertyType.innerHTML = `<strong>Property Type:</strong> <br>${property.propertyType.join(', ')}`;
      imageCounter.innerText = `1/${property.images.length}`;

      imageContainer.appendChild(previousButton);
      imageContainer.appendChild(image);
      imageContainer.appendChild(nextButton);
      imageContainer.appendChild(imageCounter);

      detailsContainer.appendChild(price);
      detailsContainer.appendChild(location);
      detailsContainer.appendChild(bedrooms);
      detailsContainer.appendChild(floorArea);
      detailsContainer.appendChild(propertyType);

      container.appendChild(imageContainer);
      container.appendChild(title);
      container.appendChild(detailsContainer);
      container.appendChild(description);
      
      return { container, image, nextButton, previousButton, imageCounter };
   }

    // Function to fetch and display the property details
   async function renderProperty() {

      // fetch all properties
      await fetchPropertyById();

      const { container, image, nextButton, previousButton, imageCounter } = createPropertyDOM();
      PropertyContainer.appendChild(container);

       // Initialize the current image index
      let currentIndex = 0;

      // Click event for the next button.
      nextButton.addEventListener('click', () => {
         currentIndex = (currentIndex + 1) % property.images.length;
         image.src = property.images[currentIndex];
         imageCounter.innerText = `${currentIndex + 1}/${property.images.length}`;
      });

      // Click event for the previous button.
      previousButton.addEventListener('click', () => {
         currentIndex = (currentIndex - 1 + property.images.length) % property.images.length;
         image.src = property.images[currentIndex];
         imageCounter.innerText = `${currentIndex + 1}/${property.images.length}`;
      });
   }

   // Renders the property details when the page loads
   await renderProperty();
}

propertyDetails();
