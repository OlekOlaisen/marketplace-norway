export default {
   title: 'Job Listing',
   name: 'jobListing',
   type: 'document',
   fields: [
      {
         title: 'Image',
         name: 'image',
         type: 'image',
      },
      {
         title: 'Title',
         name: 'title',
         type: 'string',
      },
      {
         title: 'Description',
         name: 'description',
         type: 'text',
         rows: 5,
      },
      {
         title: 'Job Title',
         name: 'jobTitle',
         type: 'string',
      },
      {
         title: 'Category',
         name: 'category',
         type: 'reference',
         to: { type: 'category' },
      },
      {
         title: 'City',
         name: 'city',
         type: 'string',
      },
      {
         title: 'Salary Range',
         name: 'salaryRange',
         type: 'object',
         fields: [
            {
               title: 'Minimum',
               name: 'minimum',
               type: 'number',
            },
            {
               title: 'Maximum',
               name: 'maximum',
               type: 'number',
            },
            {
               title: 'Currency',
               name: 'currency',
               type: 'string',
               options: {
                  list: [
                     { title: 'NOK', value: 'nok' },
                     { title: 'USD', value: 'usd' },
                     { title: 'EUR', value: 'eur' },
                  ],
                  default: 'nok',
               },
            },
         ],
         options: {
            columns: '3',
         },
      },
      {
         title: 'Company',
         name: 'company',
         type: 'string',
         
      },
      {
         title: 'Application Deadline',
         name: 'applicationDeadline',
         type: 'datetime',
         options: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
            calendarTodayLabel: 'Today',
         },
      },
   ],
};
