const mongoose = require('mongoose');

const diySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    materialsUsed: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    images: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Add a text index to the DIY schema for searching
diySchema.index({
  title: 'text',
  description: 'text'
});

const DIY = mongoose.model('DIY', diySchema);

module.exports = DIY;
