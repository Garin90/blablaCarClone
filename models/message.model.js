const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema ({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  }
});



const Message = mongoose.model('Message', messageSchema);
module.exports = Message;