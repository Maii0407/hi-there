// import connectMongo from '../../../utils/connectMongo';
// import User from '../../../models/userModel';
// import Post from '../../../models/postModel';

// import { faker } from '@faker-js/faker';

//TODO fix this post content and image is not random

// export default async function handler( req, res ) {
//   try {
//     if( req.method === 'POST' ) {
//       await connectMongo();

//       let numOfRuns = 0;
//       const fakeUsersList = await User.find({ email: 'FAKEuser@fakerJS.com' });

//       for( let i = 0; i < fakeUsersList.length; i++ ) {
//         const newFakePost = new Post({
//           user: fakeUsersList[i].id,
//           content: faker.lorem.sentences(2),
//           date: new Date(),
//           image: faker.image.imageUrl(),
//           likes: []
//         });

//         newFakePost.save();
//         numOfRuns++;
//       }

//       if( numOfRuns === fakeUsersList.length ) {
//         return res.status( 200 ).json({
//           message: 'seeding fake posts completed'
//         });
//       }
//     }
//     else {
//       return res.status( 500 ).json({
//         message: '/api/seed/posts only handle POST methods'
//       });
//     }
//   }
//   catch( error ) {
//     console.log( error );
//     return res.status( 500 ).json({
//       message: 'error in seed/posts',
//       error
//     });
//   }
// };