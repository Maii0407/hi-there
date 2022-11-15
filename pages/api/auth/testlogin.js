import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';


export default async function handler( req, res ) {
  try {
    if( req.method === 'POST' ) {
      await connectMongo();

      const fakeUsers = await User.find({ email: 'FAKEuser@fakerJS.com' });
      const fakeUser = fakeUsers[ Math.floor( Math.random() * fakeUsers.length )];

      return res.status( 200 ).json({
        message: 'users founds',
        fakeUser
      });
    }
    else {
      return res.status( 500 ).json({
        message: '/api/auth/testlogin only handles POST requests',
      });
    }
  }
  catch( error ) {
    console.log( error );
    res.status( 500 ).json({
      message: 'error in /api/auth/testlogin',
      error
    });
  }
};