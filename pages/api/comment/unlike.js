import connectMongo from '../../../utils/connectMongo';
import Comment from '../../../models/commentModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      if( req.method === 'PUT' ) {
        await connectMongo();

        const unlikedComment = await Comment.updateOne({
          _id: req.body.commentId //TODO change this
        },
        {
          $pull: { likes: { $in: [ req.body.userId ] } } //TODO change this
        });
    
        return res.status( 200 ).json({
          message: 'unlike success',
          unlikedComment
        });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/comment/unlike only handles PUT requests'
        });
      }
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/comment/unlike',
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