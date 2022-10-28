import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function addComment( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      await connectMongo();

      const user = await User.updateOne({
        _id: req.user.id //TODO change this
      },
      {
        image: req.body.defaultPic,
        name: req.body.displayName,
        profileBio: req.body.profileBio,
        gender: req.body.gender
      });

      return res.status( 200 ).json({ message: 'update success' });
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in addPost',
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