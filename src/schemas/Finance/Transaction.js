import { Schema, model } from 'mongoose';

const schema = new Schema({
  id_owner_user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  id_wallet: {
    type: Schema.Types.ObjectId,
  },
  type: {
    type: String,
    enum: ['expense', 'income', 'transfer'],
    required: true,
  },
  transfer_to_wallet: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  locale: {
    type: String,
  },
  value: {
    type: Number,
    required: true,
  },
  date_start: {
    type: Date,
  },
  payday: {
    type: Date,
  },
  repeat_every: {
    type: String,
  },
  date_end: {
    type: Date,
  },
  category: {
    type: String,
  },
  status: {
    type: String,
    enum: ['paid', 'planned', 'late'],
    default: 'planned',
    required: true,
  },
});

export default model('transactions', schema);
