import { Schema,  model } from 'mongoose';

const schema = new Schema(
  {
    id_owner_user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    date_start: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    date_end: {
      type: Date,
    },
    execution_time: [
      {
        moment_start: {
          type: Number,
          min: 0,
          max: 1440,
        },
        moment_end: {
          type: Number,
          min: 0,
          max: 1440,
        },
      },
    ],
    days_week: [
      {
        type: [Number],
        enum: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
        ],
      },
    ],
    pillar: {
      type: String,
      lowercase: true,
      enum: [
        'body',
        'mind',
        'spirit',
        'relationship',
        'professional',
        'financial',
        'recreation',
        'lifestyle',
      ],
    },
    xp: {
      type: Number,
      default: 0,
      required: true,
    },
    mastery_points: {
      type: Number,
      default: 0,
      required: true,
    },
    status: {
      type: String,
      lowercase: true,
      enum: [
        'planned',
        'active',
        'disabled',
      ]
    }
  },
  { timestamps: true },
);

export default model('activity', schema);
