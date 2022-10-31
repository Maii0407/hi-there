// import connectMongo from '../../../utils/connectMongo';
// import User from '../../../models/userModel';
// import Post from '../../../models/postModel';

// import { faker } from '@faker-js/faker';

// export default async function handler( req, res ) {
//   try {
//     if( req.method === 'POST' ) {
//       await connectMongo();

//       let numOfRuns = 0;
//       const fakeUsersList = await User.find({ email: 'FAKEuser@fakerJS.com' });

//       for( let i = 0; i < fakeUsersList.length; i++ ) {
//         let fakeImageContent = faker.image.image( 500, 500, true );
//         let fakeContent = faker.lorem.sentences(2);
//         let fakeDate = faker.date.past(3);

//         const newFakePost = new Post({
//           user: fakeUsersList[i].id,
//           content: fakeContent,
//           date: fakeDate,
//           image: fakeImageContent,
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