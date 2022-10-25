import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  requestsReceived: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  requestsSent: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  birthday: {
    type: Date
  },
  profileBio: {
    type: String
  },
  gender: {
    type: String
  },
  image: {
    type: String
  },
  email: {
    type: String,
  }
});

const User = models.User || model( 'User', UserSchema );

export default User;