import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  facebookId: {
    type: String,
    required: true
  },
  displayName: {
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
  defaultPic: {
    type: String
  }
});

const User = models.User || model( 'User', UserSchema );

export default User;