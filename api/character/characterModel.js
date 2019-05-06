import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  alts: {
      type: String,
      required: false
  },
  last_seen_location: {
    type: String,
    required: false
  },
  bounty: {
    type: Number
  },
  ship_types: {
    type: String,
    required: false
  },
});

export default mongoose.model('Character', CharacterSchema);