const express = require("express");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const pollController = express.Router();
const PollOption = require('../models/PollOption');
const Poll = require('../models/poll');
const async = require('async');

pollController.get('/api/polls', (req, res) => {
  Poll.find({})
    .populate('options.option')
    .exec((err, polls) => {
      if (err) {
        console.log('Something went wrong when retrieving polls!', err)
        return;
      }
      res.send(polls);
      console.log(polls)
    });
});

pollController.get('/api/polls/:pollId', (req, res) => {
  const { pollId } = req.params;
  // console.log('Coming from get single poll', pollId)
  Poll.findById( pollId )
    .populate('options')
    .exec((err, poll) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(poll)
      // console.log('Fetch poll', poll)
    })
})

pollController.post('/api/vote/:voteId', (req, res) => {
  const { voteId } = req.params;

  PollOption
    .findOneAndUpdate({ _id: voteId }, {$inc: { count: 1 }})
    .exec()
    res.send('Successfully voted');
})

pollController.post('/api/polls', (req, res) => {
    const { question, options } = req.body;

    const newPoll = new Poll({
      question
    });

    async.each(options.split(','), (optionText, cb) => {
      let pollOption = new PollOption({
        option: optionText,
        pollId: newPoll._id
      });

      newPoll.options.push(pollOption);
      pollOption.save((err, item) => {
        // if (err) {
        //   console.log('Something went wrong!', err)
        //   return;
        // }
        console.log('Poll option created!', item)
      })
    })
    newPoll.save();

    console.log('New poll created!', newPoll, newPoll.options)
});

module.exports = pollController;
