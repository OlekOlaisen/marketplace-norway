import { sanity } from '../sanity.js';

export default async function Listings() {
  let listings = [];
  const listingList = document.querySelector('.main__listings-results');

  async function fetchListings() {
    const query = `*[_type == 'listing'] {
      _id,
      'image': image.asset->url,
      'title': name,
      'price': price,
      'city': city
    }`;
    listings = await sanity.fetch(query);
  }

  function createListingContainerDOM() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'main__listings-grid-container';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    for (const listing of listings) {
      const listingItem = document.createElement('div');
      const listingDetails = document.createElement('div');
      const listingTitle = document.createElement('a');
      const listingImage = document.createElement('img');
      const listingPrice = document.createElement('p');
      const listingCity = document.createElement('p');
      const favoriteButton = document.createElement('button');

      listingItem.className = 'main__listings-grid-item';
      listingDetails.className = 'main__listings-grid-item-details';
      listingTitle.className = 'main__listings-grid-item-title';
      listingImage.className = 'main__listings-grid-item-image';
      listingPrice.className = 'main__listings-grid-item-price';
      listingCity.className = 'main__listings-grid-item-city';
      favoriteButton.className =
        'main__listings-grid-item-favorite bi bi-heart';

      listingTitle.href = 'item.html?id=' + listing._id;
      listingTitle.innerText = listing.title;
      listingImage.src = listing.image;
      listingPrice.innerText = `${listing.price.number} ${listing.price.currency}`;
      listingCity.innerText = listing.city;

      listingItem.appendChild(listingImage);
      listingItem.appendChild(listingDetails);
      listingItem.appendChild(favoriteButton);

      listingDetails.appendChild(listingCity);
      listingDetails.appendChild(listingTitle);
      listingDetails.appendChild(listingPrice);

      gridContainer.appendChild(listingItem);

      if (
        favorites.some((favorite) => favorite.title === listing.title)
      ) {
        favoriteButton.className =
          'main__listings-grid-item-favorite bi bi-heart-fill';
      } else {
        favoriteButton.className =
          'main__listings-grid-item-favorite bi bi-heart';
      }

      favoriteButton.addEventListener('click', () => {
        if (favoriteButton.classList.contains('bi-heart-fill')) {
          favoriteButton.classList.remove('bi-heart-fill');
          favoriteButton.classList.add('bi-heart');
          removeFavorite(listing);
        } else {
          favoriteButton.classList.add('bi-heart-fill');
          favoriteButton.classList.remove('bi-heart');
          addFavorite(listing);
        }
      });

      // Apply fade-in effect
      listingItem.style.opacity = 0;
      setTimeout(() => {
        listingItem.style.opacity = 1;
      }, 100);
    }

    return gridContainer;
  }

  function addFavorite(listing) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(listing);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
  }

  
  function removeFavorite(listing) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex((favorite) => favorite.title === listing.title);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
     
    }
  }

  
  
  function renderListings() {
    const listContainer = createListingContainerDOM();
    listingList.innerHTML = '';
    listingList.appendChild(listContainer);
  }
  
  
  
  await fetchListings();
  renderListings();
}

