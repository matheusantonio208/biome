import {Schema, model} from 'mongoose';

const schema = new Schema(
  {
    id_owner_user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    payday: {
      type: Date,
      required: true,
    },
    date_start: {
      type: Date,
    },
    date_end: {
      type: Date,
    },
    value: {
      type: Number,
      required: true,
    },
    locale: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    card: {
      type: String
    },
    category: {
      type: String,
    }
  }
)
