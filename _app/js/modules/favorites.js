export default function Favorites() {
   
   const favoritesContainer = document.querySelector('.main__favorites-container');
   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

   function saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(favorites));
   }

   function removeFavorite(listing) {
      const index = favorites.findIndex((fav) => fav.title === listing.title);
      if (index !== -1) {
         favorites.splice(index, 1);
         saveFavorites();
      }
   }

   function createFavoritesDOM() {
      favoritesContainer.innerHTML = '';

      if (favorites.length === 0) {
         const emptyFavorites = document.createElement('p');
         emptyFavorites.innerText = 'No favorites added yet.';
         emptyFavorites.className = 'main__favorites-empty';
         favoritesContainer.appendChild(emptyFavorites);
         return;
      }

      const favoritesList = document.createElement('div');
      favoritesList.className = 'main__favorites-list';

      for (const favorite of favorites) {
         const favoriteItem = document.createElement('div');
         const favoriteDetails = document.createElement('div');
         const favoriteImage = document.createElement('img');
         const favoriteTitle = document.createElement('a');
         const favoritePrice = document.createElement('p');
         const favoriteCity = document.createElement('p');
         const removeButton = document.createElement('button');
    
         favoriteItem.className = 'main__favorites-item';
         favoriteDetails.className = 'main__favorites-item-details';
         favoriteImage.className = 'main__favorites-item-image';
         favoriteTitle.className = 'main__favorites-item-title';
         favoritePrice.className = 'main__favorites-item-price';
         favoriteCity.className = 'main__favorites-item-city';
         removeButton.className = 'main__favorites-item-remove bi bi-x';

         favoriteTitle.href = 'item.html?id=' + favorite._id;
         favoriteTitle.innerText = favorite.title;
         favoriteImage.src = favorite.image;
         favoriteCity.innerText = favorite.city;
         favoritePrice.innerText = `${favorite.price.number} ${favorite.price.currency}`;

         favoriteItem.appendChild(favoriteImage);
         favoriteItem.appendChild(favoriteDetails);
         favoriteDetails.appendChild(favoriteCity);
         favoriteDetails.appendChild(favoriteTitle);
         favoriteDetails.appendChild(favoritePrice);
         favoriteItem.appendChild(removeButton);
         favoritesList.appendChild(favoriteItem);

         removeButton.addEventListener('click', () => {
            removeFavorite(favorite);
            createFavoritesDOM();
         });
      }

      favoritesContainer.appendChild(favoritesList);
   }

   createFavoritesDOM();

   return {
      removeFavorite
   };
}
