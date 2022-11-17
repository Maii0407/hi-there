import connectMongo from '../../../utils/connectMongo';
import Post from '../../../models/postModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      if( req.method === 'PUT' ) {
        await connectMongo();

        const likedPost = await Post.updateOne({
          _id: req.body.postId
        },
        {
          $push: { likes: req.body.userId }
        });
  
        return res.status( 200 ).json({
          message: 'like success',
          likedPost
        });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/post/like only handles PUT requests',
        });
      }
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/post/like',
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