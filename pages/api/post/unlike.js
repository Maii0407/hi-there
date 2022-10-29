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

        const unlikedPost = await Post.updateOne({
          _id: req.params.postId//TODO change this
        },
        {
          $pull: { likes: { $in: [ req.user.id ]} }//TODO change this
        });
  
        return res.status( 200 ).json({
          message: 'unlike success',
          unlikedPost
        });
      }
      else {
        return res.status( 500 ).json({
          message: '/api/post/unlike only handles PUT requests',
        });
      }
    }
    catch( error ) {
      console.log( error );
      res.status( 500 ).json({
        message: 'error in /api/post/unlike',
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