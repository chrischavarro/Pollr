const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
  question: String,
  option: [String]
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
