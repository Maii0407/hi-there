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

        const likedComment = await Comment.updateOne({
          _id: req.params.commentId //TODO change this
        },
        {
          $push: { likes: req.user.id } //TODO change this
        });
    
        return res.status( 200 ).json({
          message: 'like success',
          likedComment
        });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/comment/like only handles PUT requests'
        });
      }
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/comment/like',
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