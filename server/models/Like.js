const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  DIY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DIY', // Reference to the DIY model
    required: true,
  },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
