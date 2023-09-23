const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    diyMaterial: {
      type: Schema.Types.ObjectId,
      ref: 'DIY', // Reference to the DIY model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
