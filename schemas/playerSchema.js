import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
      type: String,
  },
  actualTeam: {
    type: String,
  },
  position: {
    type: String,
  },
  playerId: {
    type: Number,
  },
  teamId: {
    type: Number
  },
  ratings: {
    numberOfVotes: Number,
    avgRate: Number,
    oldAvg: [Number],
    bestRate: Number,
    worstRate: Number,
  },
  rates: {
    type: Array,
  },
});

module.exports = mongoose.model('players', PlayerSchema);