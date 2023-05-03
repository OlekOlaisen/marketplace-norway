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
      const listingTitle = document.createElement('p');
      const listingImage = document.createElement('img');
      const listingPrice = document.createElement('p');
      const listingCity = document.createElement('p');
      const favoriteButton = document.createElement('button');
      
      
      gridItem.className = 'main__listings-grid-item';
      listingTitle.className = 'main__listings-results-title';
      listingImage.className = 'main__listings-results-image';
      listingPrice.className = 'main__listings-results-price';
      listingCity.className = 'main__listings-results-city';
      favoriteButton.className = 'main__listings-results-favorite bi bi-heart';
      
      listingTitle.innerText = listing.title;
      listingImage.src = listing.image;
      listingPrice.innerText = `${listing.price.number} ${listing.price.currency}`;
      listingCity.innerText = listing.city;
      
      
      gridItem.appendChild(listingImage);
      gridItem.appendChild(listingTitle);
      gridItem.appendChild(listingPrice);
      gridItem.appendChild(listingCity);
      gridItem.appendChild(favoriteButton);
      gridContainer.appendChild(gridItem);
    }
    
    
    return gridContainer;
  }
  
  
  
  function renderListings() {
    const listContainer = createListingContainerDOM();
    listingList.innerHTML = '';
    listingList.appendChild(listContainer);
  }
  
  await fetchListings();
  renderListings();
}
