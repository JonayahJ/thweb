const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: "Your name is required."
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: "Your email address is required."
  },

  message: {
    type: String,
    required: "Please enter your message to submit."
  },

  userCreated: {
    type: Date,
    default: Date.now
  },

});


const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
