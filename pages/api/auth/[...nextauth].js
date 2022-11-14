import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../utils/mongodb';

import FacebookProvider from 'next-auth/providers/facebook';

//TODO make the random login functionality
export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.PASS_FACEBOOK_ID,
      clientSecret: process.env.PASS_FACEBOOK_SECRET,
      profile( profile ) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url,
          friends: [],
          requestsReceived: [],
          requestsSent: [],
          profileBio: '',
          gender: ''
        }
      }
    })
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",
  
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: '/login',
  },
  adapter: MongoDBAdapter( clientPromise ),
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.tokenid = profile.id
      }
      if( user ) {
        token.userid = user.id;
        token.userFriends = user.friends;
        token.userRequestsSent = user.requestsSent;
        token.userRequestsReceived = user.requestsReceived;
      }

      // console.log({ token });
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.tokenid = token.tokenid;
      session.user.id = token.userid;
      session.user.friends = token.userFriends;
      session.user.requestsSent = token.userRequestsSent;
      session.user.requestsReceived = token.userRequestsReceived;
      
      return session;
    }
    // session: async ({ session, user }) => {
    //   return {
    //     ...session,
    //     user: {
    //       id: user.id,
    //       name: user.name,
    //       image: user.image,
    //       friends: user.friends,
    //       requestsSent: user.requestsSent,
    //       requestsReceived: user.requestsReceived
    //     },
    //   };
    // },
  }
};

export default NextAuth( authOptions );