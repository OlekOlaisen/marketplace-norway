import { sanity } from '../sanity.js';

let properties = [];

export default async function Properties() {
   const propertyList = document.querySelector('.main__properties');

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

   function createPropertyContainerDOM(propertiesToRender) {
      const propertyContainer = document.createElement('div');
      propertyContainer.className = 'main__property-container';

      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];

      for (const property of propertiesToRender) {
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

   function addFavorite(property) {
      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];
      favorites.push(property);
      localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
      renderProperties();
   }

   function removeFavorite(property) {
      const favorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];
      const index = favorites.findIndex((favorite) => favorite.title === property.title);
      if (index > -1) {
         favorites.splice(index, 1);
         localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
         renderProperties();
      }
   }

   function renderProperties() {
      const sortSelection = document.getElementById('sort-price').value;
      const propertyTypeFilter = document.getElementById('property-filter').value;

      let filteredProperties = properties;

      if (propertyTypeFilter !== 'All') {
         filteredProperties = properties.filter(property => property.propertyType.includes(propertyTypeFilter));
         document.querySelector('.main__listings-title').innerText = propertyTypeFilter;
      }
         else {
         document.querySelector('.main__listings-title').innerText = "Properties";
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

   await fetchProperties();
   renderProperties();

   document.getElementById('property-filter').addEventListener('change', renderProperties);
   document.getElementById('sort-price').addEventListener('change', renderProperties);
}

document.addEventListener('DOMContentLoaded', () => {
   Properties();
});
