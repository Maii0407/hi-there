//TODO complete this API route for creating new posts
import connectMongo from '../../../utils/connectMongo';
import Post from '../../../models/postModel';
import User from '../../../models/userModel';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function addPost( req, res ) {
  const session = await unstable_getServerSession( req, res, authOptions );

  if( session ) {
    try {
      await connectMongo();

      //const currentUser = await User.find({
      //  name: session.user.name,
      //  image: session.user.image,
      //  email: session.user.email
      //});

      const newPost = new Post({
        content: req.body.content,
        image: req.body.image,
        date: new Date(),
        user: session.user.id
      });

      newPost.save();

      return res.status( 200 ).json({
        message: 'post created',
        newPost
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