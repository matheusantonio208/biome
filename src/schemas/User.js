import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  photo_profile: {
    type: String,
  },
  date_birth: {
    type: Date,
  },
  phone_number: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  group: {
    type: String,
    required: true,
    default: 'free-plan',
    enum: ['admin', 'pro-plan', 'free-plan'],
  },
  date_last_login: {
    type: String,
    default: new Date().now,
  },
  locale_last_login: {
    type: String,
  },
  account_status: {
    type: String,
    required: true,
    enum: ['active', 'disabled', 'waiting_deleted'],
    default: 'active',
  },
});
export default Mongoose.model('users', userSchema);
