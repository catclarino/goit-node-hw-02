const mongoose = require('mongoose');
const { Schema } = mongoose;

const contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const Contact = mongoose.model('Contact', contacts, 'Contacts');

module.exports = Contact;
