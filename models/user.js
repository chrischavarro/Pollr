const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  polls: [ {type: Schema.Types.ObjectId, ref: 'Poll'} ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
