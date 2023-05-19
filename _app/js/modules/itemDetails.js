import { sanity } from '../sanity.js';


export default async function itemDetails() {
   const urlParams = new URLSearchParams(window.location.search);
   const listingId = urlParams.get('id');
   const listingContainer = document.querySelector('.main__listing-container');
   

   let listing = null;
   
   async function fetchListingById() {
      const query = `*[_type == 'listing' && _id == '${listingId}'] {
         _id,
         'image': image.asset->url,
         'title': name,
         'description': description,
         'price': price,
         'city': city,
         'state': state
      }[0]`;

      listing = await sanity.fetch(query);
      console.log(listing)
   }
   

   function createListingDOM() {
      const container = document.createElement('div');
      const image = document.createElement('img');
      const details = document.createElement('div');
      const title = document.createElement('h1');
      const price = document.createElement('p');
      const description = document.createElement('p');
      const city = document.createElement('p');
      const state = document.createElement('p');
      

      container.className = 'main__listing';
      image.className = 'main__listing-image';
      details.className = 'main__listing-details';
      title.className = 'main__listing-title';
      price.className = 'main__listing-price';
      description.className = 'main__listing-description';
      city.className = 'main__listing-city';
      state.className = 'main__listing-state';
      
      

      image.src = listing.image;
      title.innerText = listing.title;
      price.innerText = `${listing.price.number} ${listing.price.currency}`;
      city.innerText = `Location: ${listing.city}`;
      description.innerText = listing.description;
      state.innerText = listing.state;
      

      container.appendChild(image);
      container.appendChild(details);
      details.appendChild(title);
      details.appendChild(price);
      details.appendChild(description);
      details.appendChild(city);
      details.appendChild(state);
      

      return container;
   }


   async function renderListing() {
      const container = createListingDOM();
      listingContainer.appendChild(container);
   }

   await fetchListingById();
   await renderListing();
   
}

itemDetails();
