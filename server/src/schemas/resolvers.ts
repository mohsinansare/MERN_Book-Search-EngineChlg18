// Import necessary modules
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
});

const Profile = model('Profile', profileSchema);

export { Profile };