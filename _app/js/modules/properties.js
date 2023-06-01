import { sanity } from '../sanity.js';



export default async function Properties() {
   const propertyList = document.querySelector('.main__properties');

   let properties = [];

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

   // Generates DOM elements for each property and returns the container element.
   function createPropertyContainerDOM(properties) {

      // Create the main container and get favorite properties from local storage.
      const propertyContainer = document.createElement('div');
      propertyContainer.className = 'main__property-container';

      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];

      // Loops over each property in the properties array
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

         // Sets the href attribute of the propertyTitle element to be a URL that leads to the detailed view page for the current property.
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

         // Checks if the current property is in the favorites, if so, updates the favorite button's class to "bi bi-heart-fill". 
         if (
            favorites.some((favorite) => favorite.title === property.title)
         ) {
            favoriteButton.className =
               'main__property-favorite bi bi-heart-fill';
         } else {
            favoriteButton.className = 'main__property-favorite bi bi-heart';
         }

         // Adds event listener to the favorite button, which toggles the favorite state of the property on click
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

   // Adds a property to local storage as a favorite.
   function addFavorite(property) {
      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];
      favorites.push(property);
      localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
   }

   // Removes a property from favorites in local storage.
   function removeFavorite(property) {
      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];
      const index = favorites.findIndex((favorite) => favorite.title === property.title);
      if (index > -1) {
         favorites.splice(index, 1);
         localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
      }
   }

   // organizes and displays properties on the page based on filters and sorting options.
   function renderProperties() {
      const sortElement = document.getElementById('sort-price');
      const filterElement = document.getElementById('property-filter');
      let filteredProperties = properties;

      if (sortElement && filterElement) {
         sortElement.addEventListener('change', renderProperties);
         filterElement.addEventListener('change', renderProperties);

         // Fetches the current values of the sort and filter elements.
         const sortSelection = sortElement.value;
         const propertyTypeFilter = filterElement.value;

         // If a property type filter is selected (other than 'All'), filter the properties by type.
         if (propertyTypeFilter !== 'All') {
            filteredProperties = properties.filter(property => property.propertyType.includes(propertyTypeFilter));
            // Updates the page title to reflect the current property type filter.
            document.querySelector('.main__listings-title').innerText = propertyTypeFilter;
         } else {
            document.querySelector('.main__listings-title').innerText = "Properties";
         }

         // If a sort option is selected, it sorts the properties by price.
         if (sortSelection === 'low-to-high') {
            filteredProperties.sort((a, b) => a.price - b.price);
         } else if (sortSelection === 'high-to-low') {
            filteredProperties.sort((a, b) => b.price - a.price);
         }
      }

      // Once properties are filtered and sorted, creates a container DOM element for them and displays thøem on the page.
      const propertyListContainer = createPropertyContainerDOM(filteredProperties);
      propertyList.innerHTML = '';
      propertyList.appendChild(propertyListContainer);
   }

   await fetchProperties();
   renderProperties();
}

Properties();

