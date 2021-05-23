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
      default: 0,
    },
    coin:{
      type: String,
      enum: ['BRL','EUR','USA'],
      required: true
  }
  })

  export default model('wallets', schema);
