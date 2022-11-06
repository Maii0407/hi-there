import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      if( req.method === 'PUT' ) {
        await connectMongo();

        const user = await User.updateOne({
          _id: session.user.id
        },
        {
          //image: req.body.defaultPic, //TODO dont forget this
          name: req.body.name,
          profileBio: req.body.profileBio,
          gender: req.body.gender
        });

        return res.status( 200 ).json({ message: 'update success' });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/user/update only handles PUT requests'
        });
      }
      
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/user/update',
        error
      });
    }
  }
  else {
    res.send({
      error: 'You must be signed in to view the protected content on this page.'
    });
  }
};