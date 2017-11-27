const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  polls: [ {type: Schema.Types.ObjectId, ref: 'Poll'} ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
