const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollOptionSchema = new Schema({
  option: String,
  count: { type: Number, default: 0},
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll'}
});

const PollOption = mongoose.model('PollOption', pollOptionSchema);

module.exports = PollOption
