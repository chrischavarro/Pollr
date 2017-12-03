const express = require("express");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const pollController = express.Router();
const PollOption = require('../models/PollOption');
const Poll = require('../models/poll');
const async = require('async');

// Get list of all polls
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
      // console.log('IP address', (req.connection.remoteAddress).toString())

    });
});

pollController.post('/api/polls/:pollId', (req, res) => {
  const { pollId } = req.params;
  const { options } = req.body;

// Searches for relevant poll to update before creating new options
  const pollToUpdate = Poll.findById( pollId )
    .exec((err, poll) => {
      console.log(poll)
      // Loops through list of new options to create model instances
      async.each(options.split(','), (optionText, cb) => {
        let pollOption = new PollOption({
          option: optionText,
          pollId: pollId
        })

        // Pushes unsaved options to specified poll
        poll.options.push(pollOption)

        pollOption.save((err, option) => {
          if (err) {
            console.log('Poll update failed!', err)
          }
        })

      })
      // Saves poll after loop has ended
      poll.save();
    })
})

// Load index for specific poll
pollController.get('/api/polls/:pollId', (req, res) => {
  const { pollId } = req.params;

  Poll.findById( pollId )
    .populate('options')
    .exec((err, poll) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(poll)
      res.send(poll)
    })
})

// Cast a vote
pollController.post('/api/vote/:voteId', (req, res) => {
  const { voteId } = req.params;
  const pollId = Object.keys(req.body).toString()
  const userIP = req.connection.remoteAddress

  console.log('Poll ID', pollId)

  Poll
    .findById(pollId)
    .exec((err, poll) => {
      if (!poll.voters.includes(userIP)) {
        PollOption
        .findOneAndUpdate({ _id: voteId }, {$inc: { count: 1 }})
        poll.voters.push(userIP);
        poll.save();
        res.send('Successfully voted');
        console.log('Successfully voted!')
      }
      else {
        console.log('Youve already voted!')
        res.send('Already logged in')
      }
    })


})

// Create a new poll
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

    // console.log('New poll created!', newPoll, newPoll.options)
});

module.exports = pollController;
