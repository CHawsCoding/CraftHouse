const { Schema, model } = require('mongoose');

const diySchema = new Schema(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment', 
      },
    ],
  },
  {
    timestamps: true, 
  }
);

const DIY = model('DIY', diySchema);

module.exports = DIY;
