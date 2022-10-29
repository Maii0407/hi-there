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
          _id: req.user.id //TODO change this
        },
        {
          $push: { requestsSent: req.params.strangerId } //TODO change this
        });
    
        const stranger = await User.updateOne({
          _id: req.params.strangerId //TODO change this
        },{
          $push: { requestsReceived: req.user.id } //TODO change this
        });
    
        return res.status( 200 ).json({ message: 'request sent' });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/user/sendrequest only handles PUT requests'
        });
      }
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/user/sendrequest',
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