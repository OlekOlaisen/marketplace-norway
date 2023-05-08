export default {
   title: 'Property Listing',
   name: 'propertyListing',
   type: 'document',
   fields: [
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
         title: 'Category',
         name: 'category',
         type: 'reference',
         to: { type: 'category' },
      },
      {
         title: 'Location',
         name: 'location',
         type: 'string',
      },
      {
         title: 'Price',
         name: 'price',
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
      {
         title: 'Property type',
         name: 'propertyType',
         type: 'array',
         of: [
            {
               type: 'string',
               options: {
                  list: [
                     { title: 'Shared housing', value: 'shared housing' },
                     { title: 'Apartment', value: 'apartment' },
                     { title: 'House', value: 'house' },
                     { title: 'Cabin', value: 'cabin' },
                  ],
                  default: 'house',
               },
            }
         ]

      },
      {
         title: 'Bedrooms',
         name: 'bedrooms',
         type: 'number',
      },
      {
         title: 'Floor Area',
         name: 'floorArea',
         type: 'number',
         description: 'Floor area in square meters',
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
         description: 'Set to true if the property is sold',
      },
   ],
};
