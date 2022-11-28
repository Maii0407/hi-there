import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';

export default async function handler( req, res ) {
  try {
    if( req.method === 'PUT' ) {
      await connectMongo();

      let numCallbackRuns = 0;
      const fakeUsersList = await User.find({ email: 'FAKEuser@fakerJS.com' });
      const me = await User.findById( '63576f4eb04bdcf2476bf54c' );

      for( let i = 0; i < fakeUsersList.length; i++ ) {
        const stranger = await User.updateOne({
          _id: fakeUsersList[i]._id
        },
        {
          $push: { requestsSent: me.id }
        });
    
        const user = await User.updateOne({
          _id: me.id
        },
        {
          $push: { requestsReceived: fakeUsersList[i]._id }
        });
    
        numCallbackRuns++;
      }
    
      if( numCallbackRuns === fakeUsersList.length ) {
        return res.status( 200 ).json({ message: `${ fakeUsersList.length } requests sent to 633fe27967daa46e877ac74d` });
      }
    }
    else {
      return res.status( 500 ).json({
        message: '/api/seed/posts only handle PUT methods'
      });
    }
  }
  catch( error ) {
    console.log( error );
    return res.status( 500 ).json({
      message: 'error in seed/posts',
      error
    });
  }
};