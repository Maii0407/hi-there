import connectMongo from '../../../utils/connectMongo';
import Comment from '../../../models/commentModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function unlikeComment( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      await connectMongo();

      const unlikedComment = await Comment.updateOne({
        _id: req.params.commentId //TODO change this
      },
      {
        $pull: { likes: { $in: [ req.user.id ] } } //TODO change this
      });
  
      return res.status( 200 ).json({
        message: 'unlike success',
        unlikedComment
      });
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