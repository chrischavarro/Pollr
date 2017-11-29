const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollOptionSchema = new Schema({
  option: String,
  count: { type: Number, default: 0}
});

const PollOption = mongoose.model('PollOption', pollOptionSchema);

module.exports = PollOption
