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
    value: {
      type: Number,
      required: true,
    }
  })
