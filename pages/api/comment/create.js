import connectMongo from '../../../utils/connectMongo';
import Comment from '../../../models/commentModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function addComment( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      await connectMongo();

      const newComment = new Comment({
        content: req.body.content,
        date: new Date(),
        user: req.user.id, //TODO change this
        post: req.params.postId //TODO change this
      });

      newComment.save();

      return res.status( 200 ).json({
        message: 'comment created',
        newComment
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