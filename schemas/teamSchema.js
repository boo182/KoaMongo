import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
  name: {
      type: String,
  },
  teamId:{
      type: Number,
  },
  creationDate: {
      type: String,
  },
  playersID: {
      type: [Number],
  },
  teamRate: {
      type: Number,
  },
});

module.exports = mongoose.model('teams', TeamSchema);