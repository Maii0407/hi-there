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
          _id: req.body.userId 
        },
        {
          $pull: { requestsReceived: { $in: [ req.body.strangerId ] } }, 
          $push: { friends: req.body.strangerId } 
        });
    
        const stranger = await User.updateOne({
          _id: req.body.strangerId 
        },{
          $pull: { requestsSent: { $in: [ req.body.userId ] } }, 
          $push: { friends: req.body.userId } 
        });
    
        return res.status( 200 ).json({ message: 'request accepted' });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/user/acceptrequest only handles PUT requests'
        });
      }
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/user/acceptrequest',
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