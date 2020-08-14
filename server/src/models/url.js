import { model, Schema } from 'mongoose';

const urlSchema = new Schema({
  long: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  created: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model('Url', urlSchema);
