import sanityClient from '@sanity/client';

const client = sanityClient({
   projectId: '2sew95jh',
   dataset: 'production',
   useCdn: false, // `false` if you want to ensure fresh data
});

export async function handler (event, context) {
   if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
   }

   const formData = JSON.parse(event.body);

   const document = {
      _type: 'listing', // replace with your document type
      name: formData.name,
      description: formData.description,
      category: {
         _type: 'reference',
         _ref: formData.category,
         // additional fields if needed
      },
      city: formData.city,
      price: {
         number: formData.priceNumber,
         currency: formData.priceCurrency,
      },
      images: [], // you will need to handle file uploads
      state: formData.state,
      sold: formData.sold === 'on',
   };

   try {
      const result = await client.create(document);
      return {
         statusCode: 200,
         body: JSON.stringify(result)
      };
   } catch (err) {
      console.error(err);
      return {
         statusCode: 500,
         body: 'Error submitting form'
      };
   }
}
