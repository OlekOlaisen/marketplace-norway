import {sanity} from '../sanity.js';


export default async function Listings() {
  
  
  let listings = [];
  
  const listingList = document.querySelector('.main__listings-results');
  
  async function fetchListings() {
    
    const query = `*[_type == 'listing'] {
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
    
    for (const listing of listings) {
      const gridItem = document.createElement('div');
      const listingDetails = document.createElement('div');
      const listingTitle = document.createElement('p');
      const listingImage = document.createElement('img');
      const listingPrice = document.createElement('p');
      const listingCity = document.createElement('p');
      const favoriteButton = document.createElement('button');

      
      
      gridItem.className = 'main__listings-grid-item';
      listingDetails.className = 'main__listings-grid-item-details';
      listingTitle.className = 'main__listings-grid-item-title';
      listingImage.className = 'main__listings-grid-item-image';
      listingPrice.className = 'main__listings-grid-item-price';
      listingCity.className = 'main__listings-grid-item-city';
      favoriteButton.className = 'main__listings-grid-item-favorite bi bi-heart';
      
      listingTitle.innerText = listing.title;
      listingImage.src = listing.image;
      listingPrice.innerText = `${listing.price.number} ${listing.price.currency}`;
      listingCity.innerText = listing.city;
      
      
      gridItem.appendChild(listingImage);
      gridItem.appendChild(listingDetails);
      gridItem.appendChild(favoriteButton);

      listingDetails.appendChild(listingCity);
      listingDetails.appendChild(listingTitle);
      listingDetails.appendChild(listingPrice);
      
      gridContainer.appendChild(gridItem);

      favoriteButton.addEventListener('click', () => {
        addFavorite(listing);
      });
    }
    
    
    return gridContainer;
  }
  
  
  
  function renderListings() {
    const listContainer = createListingContainerDOM();
    listingList.innerHTML = '';
    listingList.appendChild(listContainer);
  }

  function addFavorite(listing) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(listing);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
  }

  
  await fetchListings();
  renderListings();
}
