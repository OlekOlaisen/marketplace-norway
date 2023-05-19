import { sanity } from '../sanity.js';

export default async function Properties() {
   let properties = [];
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

   function createPropertyContainerDOM() {
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

         propertyTitle.href = 'property.html?id=' + property._id;
         propertyTitle.innerText = property.title;
         propertyImage.src = property.images[0]; 
         propertyLocation.innerText = property.location;
         propertyPrice.innerText = property.currency + " " + property.price;

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

         // Apply fade-in effect
         propertyListing.style.opacity = 0;
         setTimeout(() => {
            propertyListing.style.opacity = 1;
         }, 100);
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
      const propertyListContainer = createPropertyContainerDOM();
      console.log(propertyList); // Add this line
      propertyList.innerHTML = '';
      propertyList.appendChild(propertyListContainer);
   }

   await fetchProperties();
   renderProperties();
}

document.addEventListener('DOMContentLoaded', () => {
   Properties();
});
