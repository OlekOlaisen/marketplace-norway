import { sanity } from '../sanity.js';

export default async function jobDetails() {
   const urlParams = new URLSearchParams(window.location.search);
   const listingId = urlParams.get('id');
   const jobsContainer = document.querySelector('.main__jobs-container');
   
   let job = null;
   
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
      
      
      job = await sanity.fetch(query);
      console.log(listingId);
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
      
      container.className = 'main__job';
      image.className = 'main__job-image';
      title.className = 'main__job-title';
      description.className = 'main__job-description';
      jobTitle.className = 'main__job-jobTitle';
      city.className = 'main__job-city';
      salaryRange.className = 'main__job-salaryRange';
      company.className = 'main__job-company';
      applicationDeadline.className = 'main__job-applicationDeadline';
      
      image.src = job.image;
      title.innerText = job.title;
      description.innerText = job.description;
      jobTitle.innerText = `Job Title: ${job.jobTitle}`;
      city.innerText = `City: ${job.city}`;
      salaryRange.innerText = `Salary Range: ${job.salaryRange.minimum} - ${job.salaryRange.maximum} ${job.salaryRange.currency.toUpperCase()}`;
      company.innerText = `Company: ${job.company}`;
      applicationDeadline.innerText = `Application Deadline: ${new Date(job.applicationDeadline).toLocaleString()}`;
      
      container.appendChild(image);
      container.appendChild(title);
      container.appendChild(description);
      container.appendChild(jobTitle);
      container.appendChild(city);
      container.appendChild(salaryRange);
      container.appendChild(company);
      container.appendChild(applicationDeadline);
      
      return container;
   }
   
   
   async function renderJob() {
      const container = createJobDOM();
      jobsContainer.appendChild(container);
   }
   
   await fetchJobById();
   await renderJob();
}

jobDetails();
