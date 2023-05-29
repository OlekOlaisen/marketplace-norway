import { sanity } from '../sanity.js';

export default async function jobDetails() {

   // Retrieves the job ID from the URL
   const urlParams = new URLSearchParams(window.location.search);
   const listingId = urlParams.get('id');
   const jobsContainer = document.querySelector('.main__jobs-detailed');

   // Initializes a variable to store the fetched job
   let job = null;

   // Function to fetch a job from the sanity client based on its ID
   async function fetchJobById() {
      const query = `*[_type == 'jobListing' && _id == '${listingId}'] {
         _id,
         'image': image.asset->url,
         'title': title,
         'description': description,
         'jobTitle': jobTitle,
         'city': city,
         'salaryRange': salaryRange,
         'company': company,
         'applicationDeadline': applicationDeadline
      }[0]`;

      // Fetches the job and stores it in the variable
      job = await sanity.fetch(query);   
   }

   function createJobDOM() {
      const container = document.createElement('div');
      const image = document.createElement('img');
      const title = document.createElement('h2');
      const description = document.createElement('p');
      const jobTitle = document.createElement('h3');
      const city = document.createElement('p');
      const salaryRange = document.createElement('p');
      const company = document.createElement('p');
      const applicationDeadline = document.createElement('p');

      container.className = 'main__jobs-detailed-container';
      image.className = 'main__jobs-detailed-image';
      title.className = 'main__jobs-detailed-title';
      description.className = 'main__jobs-detailed-description';
      jobTitle.className = 'main__jobs-detailed-jobTitle';
      city.className = 'main__jobs-detailed-city';
      salaryRange.className = 'main__jobs-detailed-salaryRange';
      company.className = 'main__jobs-detailed-company';
      applicationDeadline.className = 'main__jobs-detailed-applicationDeadline';

      image.src = job.image;
      title.innerText = job.title;
      document.title = job.title;
      description.innerText = job.description;
      jobTitle.innerText = `Job Title: ${job.jobTitle}`;
      city.innerText = `City: ${job.city}`;
      salaryRange.innerText = `Salary Range: ${job.salaryRange.minimum} - ${job.salaryRange.maximum} ${job.salaryRange.currency.toUpperCase()}`;
      company.innerText = `Company: ${job.company}`;
      applicationDeadline.innerText = `Application Deadline: ${new Date(job.applicationDeadline).toLocaleString()}`;

      container.appendChild(image);
      container.appendChild(title);
      container.appendChild(jobTitle);
      container.appendChild(company);
      container.appendChild(description);
      container.appendChild(city);
      container.appendChild(salaryRange);
      container.appendChild(applicationDeadline);

      return container;
   }

   async function renderJob() {
      const container = createJobDOM();
      jobsContainer.appendChild(container);
   }

   // Fetches the job and renders the details.
   await fetchJobById();
   await renderJob();
}

jobDetails();
