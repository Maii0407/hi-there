import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../utils/mongodb';
import connectMongo from '../../../utils/connectMongo';

import FacebookProvider from 'next-auth/providers/facebook';

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.PASS_FACEBOOK_ID,
      clientSecret: process.env.PASS_FACEBOOK_SECRET,
    })
  ],
  adapter: MongoDBAdapter( clientPromise ),
};

export default NextAuth( authOptions );