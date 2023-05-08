export default {
   title: 'Listing',
   name: 'listing',
   type: 'document',
   fields: [
      {
         title: 'Name',
         name: 'name',
         type: 'string',
      },
      {
         title: 'Description',
         name: 'description',
         type: 'string',
      },
      {
         title: 'Category',
         
         name: 'category',
         type: 'reference',
         to: { type: 'category' }
      },
      {  
         title: 'City',
         name: 'city',
         type: 'string',
      },
      
      {
         title: 'Price',
         name: 'price',
         type: 'object',
         fields: [
            {
               title: 'Number',
               name: 'number',
               type: 'string',
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
            columns: '2',
         },
      },
      {
         title: 'Images',
         name: 'images',
         type: 'array',
         of: [{ type: 'image' }],
      },
      {
         title: 'Sold',
         name: 'sold',
         type: 'boolean',
         description: 'Set to true if product is sold'
      },
   ],
};
