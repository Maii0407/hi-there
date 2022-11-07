import connectMongo from '../../../utils/connectMongo';
import Comment from '../../../models/commentModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      if( req.method === 'POST' ) {
        await connectMongo();

        const newComment = new Comment({
          content: req.body.content,
          date: new Date(),
          user: req.body.user, //TODO change this
          post: req.body.post //TODO change this
        });

        newComment.save();

        return res.status( 200 ).json({
          message: 'comment created',
          newComment
        });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/comment/create only handles POST requests'
        });
      }
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/comment/create',
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