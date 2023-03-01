const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema ({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String
  }
});



const Message = mongoose.model('Message', messageSchema);
module.exports = Message;