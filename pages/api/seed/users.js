// import connectMongo from '../../../utils/connectMongo';
// import User from '../../../models/userModel';

// import { faker } from '@faker-js/faker';

// export default async function handler(req, res) {
//   try {
//     if( req.method === 'POST' ) {
//       await connectMongo();

//       let numOfRuns = 0;
//       const fakeGender = faker.name.sexType();

//       for( let i = 0; i < 5; i++ ) {
//         const newFakeUser = new User({
//           name: faker.name.fullName({ sex: fakeGender }),
//           image: faker.image.avatar(),
//           gender: fakeGender,
//           email: 'FAKEuser@fakerJS.com',
//           profileBio: faker.lorem.sentence(5),
//           requestsReceived: [],
//           requestsSent: [],
//           friends: [],
//         });

//         newFakeUser.save();
//         numOfRuns++;
//       }

//       if( numOfRuns === 5 ) {
//         return res.status( 200 ).json({
//           message: 'seeding fake users completed'
//         });
//       }
//     }
//     else {
//       return res.status( 500 ).json({
//         message: '/api/seed/users only handles POST methods'
//       });
//     }
//   }
//   catch( error ) {
//     console.log( error );
//     return res.status( 500 ).json({
//       message: 'error in seed/users',
//       error
//     });
//   }
// };