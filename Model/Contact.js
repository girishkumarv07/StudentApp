import { Schema, model } from 'mongoose';

const ContactSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
   },
}, { timestamps: true });

let ContactModel = model("contact", ContactSchema);
export default ContactModel;