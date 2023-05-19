export default function Favorites() {
   const favoritesContainer = document.querySelector('.main__favorites-container');
   const favoritesJobsContainer = document.querySelector('.main__favorites-jobs-container');
   const favoritesPropertiesContainer = document.querySelector('.main__favorites-properties-container');
   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
   const jobFavorites = JSON.parse(localStorage.getItem('jobFavorites')) || [];
   const propertyFavorites = JSON.parse(localStorage.getItem('propertyFavorites')) || [];

   function saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(favorites));
   }

   function removeFavorite(listing) {
      const index = favorites.findIndex((favorite) => favorite.title === listing.title);
      if (index !== -1) {
         favorites.splice(index, 1);
         saveFavorites();
      }
   }

   function saveJobFavorites() {
      localStorage.setItem('jobFavorites', JSON.stringify(jobFavorites));
   }

   function removeJobFavorite(job) {
      const index = jobFavorites.findIndex((favorite) => favorite.title === job.title);
      if (index !== -1) {
         jobFavorites.splice(index, 1);
         saveJobFavorites();
      }
   }

   function savePropertyFavorites() {
      localStorage.setItem('propertyFavorites', JSON.stringify(propertyFavorites));
   }

   function removePropertyFavorite(property) {
      const index = propertyFavorites.findIndex((favorite) => favorite.title === property.title);
      if (index !== -1) {
         propertyFavorites.splice(index, 1);
         savePropertyFavorites();
      }
   }

   function createFavoritesDOM() {
      favoritesContainer.innerHTML = '';
      favoritesJobsContainer.innerHTML = '';
      favoritesPropertiesContainer.innerHTML = '';

      if (favorites.length === 0 && jobFavorites.length === 0 && propertyFavorites.length === 0) {
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

         favoriteItem.style.opacity = 0;
         setTimeout(() => {
            favoriteItem.style.opacity = 1;
         }, 100);


         removeButton.addEventListener('click', () => {
            removeFavorite(favorite);
            createFavoritesDOM();
         });
      }


      const favoritesJobsList = document.createElement('div');
      favoritesJobsList.className = 'main__favorites-list';

      for (const jobFavorite of jobFavorites) {
         const jobFavoriteItem = document.createElement('div');
         const jobFavoriteDetails = document.createElement('div');
         const jobFavoriteImage = document.createElement('img');
         const jobFavoriteTitle = document.createElement('a');
         const jobFavoriteCompany = document.createElement('p');
         const jobFavoriteJobTitle = document.createElement('p');
         const jobFavoriteCity = document.createElement('p');
         const removeButton = document.createElement('button');

         jobFavoriteItem.className = 'main__favorites-item';
         jobFavoriteDetails.className = 'main__favorites-item-details';
         jobFavoriteImage.className = 'main__favorites-item-image';
         jobFavoriteTitle.className = 'main__favorites-item-title';
         jobFavoriteCompany.className = 'main__favorites-item-company';
         jobFavoriteJobTitle.className = 'main__favorites-item-jobTitle';
         jobFavoriteCity.className = 'main__favorites-item-city';
         removeButton.className = 'main__favorites-item-remove bi bi-x';

         jobFavoriteTitle.href = 'job.html?id=' + jobFavorite._id;
         jobFavoriteTitle.innerText = jobFavorite.title;
         jobFavoriteImage.src = jobFavorite.image;
         jobFavoriteCompany.innerText = jobFavorite.company;
         jobFavoriteJobTitle.innerText = jobFavorite.jobTitle;
         jobFavoriteCity.innerText = jobFavorite.city;

         jobFavoriteItem.appendChild(jobFavoriteImage);
         jobFavoriteItem.appendChild(jobFavoriteDetails);
         jobFavoriteDetails.appendChild(jobFavoriteCity);
         jobFavoriteDetails.appendChild(jobFavoriteTitle);
         jobFavoriteDetails.appendChild(jobFavoriteJobTitle);
         jobFavoriteDetails.appendChild(jobFavoriteCompany);
         jobFavoriteItem.appendChild(removeButton);
         favoritesJobsList.appendChild(jobFavoriteItem);

         removeButton.addEventListener('click', () => {
            removeJobFavorite(jobFavorite);
            createFavoritesDOM();
         });
      }

      favoritesContainer.appendChild(favoritesList);
      favoritesJobsContainer.appendChild(favoritesJobsList);


      const favoritesPropertiesList = document.createElement('div');
      favoritesPropertiesList.className = 'main__favorites-list';

      for (const propertyFavorite of propertyFavorites) {
         const propertyFavoriteItem = document.createElement('div');
         const propertyFavoriteDetails = document.createElement('div');
         const propertyFavoriteImage = document.createElement('img');
         const propertyFavoriteTitle = document.createElement('a');
         const propertyFavoriteDescription = document.createElement('p');
         const removeButton = document.createElement('button');

         propertyFavoriteItem.className = 'main__favorites-item';
         propertyFavoriteDetails.className = 'main__favorites-item-details';
         propertyFavoriteImage.className = 'main__favorites-item-image';
         propertyFavoriteTitle.className = 'main__favorites-item-title';
         propertyFavoriteDescription.className = 'main__favorites-item-description';
         removeButton.className = 'main__favorites-item-remove bi bi-x';

         propertyFavoriteTitle.href = 'property.html?id=' + propertyFavorite._id;
         propertyFavoriteTitle.innerText = propertyFavorite.title;
         propertyFavoriteImage.src = propertyFavorite.images && propertyFavorite.images.length > 0 ? propertyFavorite.images[0].asset.url : '';
         propertyFavoriteDescription.innerText = propertyFavorite.description;

         propertyFavoriteItem.appendChild(propertyFavoriteImage);
         propertyFavoriteItem.appendChild(propertyFavoriteDetails);
         propertyFavoriteDetails.appendChild(propertyFavoriteTitle);
         propertyFavoriteDetails.appendChild(propertyFavoriteDescription);
         propertyFavoriteItem.appendChild(removeButton);
         favoritesPropertiesList.appendChild(propertyFavoriteItem);

         removeButton.addEventListener('click', () => {
            removePropertyFavorite(propertyFavorite);
            createFavoritesDOM();
         });
      }

      favoritesPropertiesContainer.appendChild(favoritesPropertiesList);
   }

   

   

   createFavoritesDOM();

   return {
      removeFavorite,
      removeJobFavorite,
      removePropertyFavorite
   };
}

