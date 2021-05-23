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
  number:{
    type: Number,
    required:true
  },
  flag:{
      type: String,
      required: true
  },
  cvc_code:{
      type: Number,
      required: true
  },
  expiry_date:{
      type: Date,
      required: true
  },
  value_limit:{
      type: Number,
      required: true
  },
  transactions: [{
    type: Schema.Types.ObjectId,
  }]
})

export default model('creditCards', schema);
