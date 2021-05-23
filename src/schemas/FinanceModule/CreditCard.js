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
  value_credit: {
    type: Number,
    required: true
  },
  transactions: [{
    type: Schema.Types.ObjectId,
  }]
})
