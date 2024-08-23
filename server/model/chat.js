
const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: String, 
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    senderId: {
      type: String, 
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;