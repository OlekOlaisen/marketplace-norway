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
      
   async function renderProperties() {
      const sortSelection = document.getElementById('sort-price').value;

      const filterContainer = document.getElementById('property-filter');
      const checkboxes = Array.from(filterContainer.querySelectorAll('input[type="checkbox"]'));

      const checkedValues = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

      let filteredProperties = properties;

      if (checkedValues.length > 0) {
         filteredProperties = properties.filter(property => checkedValues.some(value => property.propertyType.includes(value)));
         // Update the title to the selected property types
         document.querySelector('.main__listings-title').innerText = checkedValues.join(", ");
      } else {
         // Reset the title to "Properties" when no filter is selected
         document.querySelector('.main__listings-title').innerText = "All properties";
      }

      if (sortSelection === 'low-to-high') {
         filteredProperties.sort((a, b) => a.price - b.price);
      } else if (sortSelection === 'high-to-low') {
         filteredProperties.sort((a, b) => b.price - a.price);
      }

      const propertyListContainer = createPropertyContainerDOM(filteredProperties);
      propertyList.innerHTML = '';
      propertyList.appendChild(propertyListContainer);
   }

   // Add event listener to the checkboxes
   document.getElementById('property-filter').addEventListener('change', renderProperties);
   document.getElementById('sort-price').addEventListener('change', renderProperties);

   await fetchProperties();
   renderProperties();
}


   Properties();
