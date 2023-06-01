import { sanity } from '../sanity.js';

export default async function Properties() {
   const propertyList = document.querySelector('.main__properties');
   const filterCheckboxes = Array.from(document.querySelectorAll('#filter-container input[name="property-type"]'));
   const sortElement = document.getElementById('sort-price');

   let properties = [];

   // Fetches the properties from the database using Sanity.io
   async function fetchProperties() {
      const query = `*[_type == 'propertyListing']{
         _id,
         'description': description,
         'title': title,
         'category': category->title,
         'location': location,
         'price': price,
         'currency': currency,
         'propertyType': propertyType,
         'bedrooms': bedrooms,
         'floorArea': floorArea,
         "images": images[].asset->url,
         'sold': sold
      }`;
      properties = await sanity.fetch(query);
   }

   // Retrieves the selected property types from the filter checkboxes
   function getSelectedPropertyTypes() {
      return filterCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
   }

   // Filters the properties based on the selected property types
   function filterProperties(properties) {
      const selectedPropertyTypes = getSelectedPropertyTypes();

      if (selectedPropertyTypes.length === 0) {
         return properties;
      } else {
         return properties.filter(property => property.propertyType.some(type => selectedPropertyTypes.includes(type)));
      }
   }

   // Sorts the properties based on the selected sorting option
   function sortProperties(properties) {
      const sortSelection = sortElement ? sortElement.value : null;

      if (sortSelection === 'low-to-high') {
         return properties.slice().sort((a, b) => a.price - b.price);
      } else if (sortSelection === 'high-to-low') {
         return properties.slice().sort((a, b) => b.price - a.price);
      } else {
         return properties;
      }
   }

   // Creates the DOM elements for each property and returns the container element
   function createPropertyContainerDOM(properties) {
      const propertyContainer = document.createElement('div');
      propertyContainer.className = 'main__property-container';

      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];

      for (const property of properties) {
         const propertyListing = document.createElement('div');
         const propertyDetails = document.createElement('div');
         const propertyTitle = document.createElement('a');
         const propertyImage = document.createElement('img');
         const propertyLocation = document.createElement('p');
         const propertyPrice = document.createElement('p');
         const favoriteButton = document.createElement('button');

         propertyListing.className = 'main__property-listing';
         propertyDetails.className = 'main__property-details';
         propertyTitle.className = 'main__property-title';
         propertyImage.className = 'main__property-image';
         propertyLocation.className = 'main__property-location';
         propertyPrice.className = 'main__property-price';
         favoriteButton.className = 'main__property-favorite bi bi-heart';

         propertyTitle.href = 'propertyDetailed.html?id=' + property._id;
         propertyTitle.innerText = property.title;
         propertyImage.src = property.images[0];
         propertyImage.alt = 'Image of the property';
         propertyLocation.innerText = property.location;
         propertyPrice.innerText = parseFloat(property.price).toLocaleString('de-DE') + " " + property.currency;
         favoriteButton.setAttribute('aria-label', 'Add to favorites');

         propertyListing.appendChild(propertyImage);
         propertyListing.appendChild(propertyDetails);
         propertyListing.appendChild(favoriteButton);

         propertyDetails.appendChild(propertyLocation);
         propertyDetails.appendChild(propertyTitle);
         propertyDetails.appendChild(propertyPrice);

         propertyContainer.appendChild(propertyListing);

         if (
            favorites.some((favorite) => favorite.title === property.title)
         ) {
            favoriteButton.className =
               'main__property-favorite bi bi-heart-fill';
         } else {
            favoriteButton.className = 'main__property-favorite bi bi-heart';
         }

         favoriteButton.addEventListener('click', () => {
            if (favoriteButton.classList.contains('bi-heart-fill')) {
               favoriteButton.classList.remove('bi-heart-fill');
               favoriteButton.classList.add('bi-heart');
               removeFavorite(property);
            } else {
               favoriteButton.classList.add('bi-heart-fill');
               favoriteButton.classList.remove('bi-heart');
               addFavorite(property);
            }
         });
      }

      return propertyContainer;
   }

   // Adds a property to the favorites list in local storage
   function addFavorite(property) {
      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];
      favorites.push(property);
      localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
   }

   // Removes a property from the favorites list in local storage
   function removeFavorite(property) {
      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];
      const index = favorites.findIndex((favorite) => favorite.title === property.title);
      if (index > -1) {
         favorites.splice(index, 1);
         localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
      }
   }

   // Updates the title based on the selected property types
   function updateTitle(selectedPropertyTypes) {
   const titleElement = document.querySelector('.main__listings-title-properties');
   if (selectedPropertyTypes.length === filterCheckboxes.length) {
      titleElement.innerText = "All Properties";
   } else if (selectedPropertyTypes.length > 0) {
      titleElement.innerText = selectedPropertyTypes.join(', ');
   } else {
      titleElement.innerText = "All Properties";
   }
}


   // Renders the properties on the page
   function renderProperties() {
      const filteredProperties = filterProperties(properties);
      const sortedProperties = sortProperties(filteredProperties);

      const propertyListContainer = createPropertyContainerDOM(sortedProperties);
      propertyList.innerHTML = '';
      propertyList.appendChild(propertyListContainer);

      const selectedPropertyTypes = getSelectedPropertyTypes();
      updateTitle(selectedPropertyTypes);
   }

   // Add change event listeners to filter checkboxes
   filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', renderProperties);
   });

   // Add change event listener to sort element if present
   if (sortElement) {
      sortElement.addEventListener('change', renderProperties);
   }
   

   // Fetch properties from the database and render them
   await fetchProperties();
   renderProperties();
}

Properties();
