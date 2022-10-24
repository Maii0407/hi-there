import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  content: {
    type: String
  },
  date: {
    type: Date
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Comment = models.Comment || model( 'Comment', CommentSchema );

export default Comment;