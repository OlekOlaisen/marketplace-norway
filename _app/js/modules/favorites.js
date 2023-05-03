export default function Favorites() {
   const favoritesContainer = document.querySelector('.main__favorites-container');

   // Load favorites from local storage or create empty array
   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

   function saveFavorites() {
      // Save favorites array to local storage
      localStorage.setItem('favorites', JSON.stringify(favorites));
   }

  

   function removeFavorite(listing) {
      // Find index of listing in favorites array
      const index = favorites.findIndex((fav) => fav.title === listing.title);
      if (index !== -1) {
         // Remove listing from favorites array and save to local storage
         favorites.splice(index, 1);
         saveFavorites();
      }
   }

   function createFavoritesDOM() {
      favoritesContainer.innerHTML = '';

      if (favorites.length === 0) {
         const emptyFavorites = document.createElement('p');
         emptyFavorites.innerText = 'No favorites added yet.';
         favoritesContainer.appendChild(emptyFavorites);
         return;
      }

      const favoritesList = document.createElement('div');
      favoritesList.className = 'main__favorites-list';

      for (const favorite of favorites) {
         const favoriteItem = document.createElement('div');
         const favoriteImage = document.createElement('img');
         const favoriteTitle = document.createElement('p');
         const favoriteCity = document.createElement('p');
         const removeButton = document.createElement('button');

         favoriteItem.className = 'main__favorites-item';
         favoriteImage.className = 'main__favorites-item-image';
         favoriteTitle.className = 'main__favorites-item-title';
         favoriteCity.className = 'main__favorites-item-city';
         removeButton.className = 'main__favorites-item-remove bi bi-x';

         favoriteTitle.innerText = favorite.title;
         favoriteImage.src = favorite.image;
         favorite.city = favorite.city;

         favoriteItem.appendChild(favoriteImage);
         favoriteItem.appendChild(favoriteTitle);
         favoriteItem.appendChild(favoriteCity);
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
      
      removeFavorite,
   };
}
