import { sanity } from '../sanity.js';

export default async function Jobs() {
   let jobs = [];
   const jobList = document.querySelector('.main__jobs');

   async function fetchJobs() {
      const query = `*[_type == 'jobListing'] {
      _id,
      'image': image.asset->url,
      'title': title,
      'company': company,
      'jobTitle': jobTitle,
      'city': city
    }`;
      jobs = await sanity.fetch(query);
      
   }

   function createJobsContainerDOM() {
      const jobsContainer = document.createElement('div');
      jobsContainer.className = 'main__jobs-container';

      const favorites = JSON.parse(localStorage.getItem('jobFavorites')) || [];

      for (const job of jobs) {
         const jobListing = document.createElement('div');
         const jobDetails = document.createElement('div');
         const jobTitle = document.createElement('a');
         const jobTitleCompany = document.createElement('a');
         const jobImage = document.createElement('img');
         const jobCity = document.createElement('p');
         const jobCompany = document.createElement('p');
         const favoriteButton = document.createElement('button');

         jobListing.className = 'main__jobs-listing';
         jobDetails.className = 'main__jobs-details';
         jobTitle.className = 'main__jobs-title';
         jobTitleCompany.className = 'main__jobs-jobTitle';
         jobImage.className = 'main__jobs-image';
         jobCity.className = 'main__jobs-city';
         jobCompany.className = 'main__jobs-company';
         favoriteButton.className = 'main__jobs-favorite bi bi-heart';

         jobTitle.innerText = job.title;
         jobTitle.href = 'jobDetailed.html?id=' + job._id;
         jobImage.src = job.image;
         jobCompany.innerText = job.company;
         jobTitleCompany.innerText = job.jobTitle;
         jobCity.innerText = job.city;

         jobListing.appendChild(jobImage);
         jobListing.appendChild(jobDetails);
         jobListing.appendChild(favoriteButton);

         jobDetails.appendChild(jobCity);
         jobDetails.appendChild(jobTitle);
         jobDetails.appendChild(jobTitleCompany);
         jobDetails.appendChild(jobCompany);

         jobsContainer.appendChild(jobListing);

         if (
            favorites.some((favorite) => favorite.title === job.title)
         ) {
            favoriteButton.className =
               'main__jobs-favorite bi bi-heart-fill';
         } else {
            favoriteButton.className = 'main__jobs-favorite bi bi-heart';
         }

         favoriteButton.addEventListener('click', () => {
            if (favoriteButton.classList.contains('bi-heart-fill')) {
               favoriteButton.classList.remove('bi-heart-fill');
               favoriteButton.classList.add('bi-heart');
               removeFavorite(job);
               
               
            } else {
               favoriteButton.classList.add('bi-heart-fill');
               favoriteButton.classList.remove('bi-heart');
               addFavorite(job);
            }
         });

         
      }

      
      return jobsContainer;
   }

   

   function addFavorite(job) {
      const favorites = JSON.parse(localStorage.getItem('jobFavorites')) || [];
      favorites.push(job);
      localStorage.setItem('jobFavorites', JSON.stringify(favorites));
      renderJobs();
   }

   function removeFavorite(job) {
      const favorites = JSON.parse(localStorage.getItem('jobFavorites')) || [];
      const index = favorites.findIndex((favorite) => favorite.title === job.title);
      if (index > -1) {
         favorites.splice(index, 1);
         localStorage.setItem('jobFavorites', JSON.stringify(favorites));
         renderJobs();
      }
   }

   function renderJobs() {
      const jobListContainer = createJobsContainerDOM();
      jobList.innerHTML = '';
      jobList.appendChild(jobListContainer);
      
   }

   await fetchJobs();
   renderJobs();
}

   Jobs();

