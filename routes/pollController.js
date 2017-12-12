const express = require("express");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const pollController = express.Router();
const PollOption = require('../models/PollOption');
const Poll = require('../models/poll');
const async = require('async');

// Get list of all polls
pollController.get('/api/polls', (req, res) => {
  Poll.find()
    .populate('options.option')
    .exec((err, polls) => {
      if (err) {
        console.log('Something went wrong when retrieving polls!', err)
        return;
      }
      res.send(polls);
    });
});

// Load index for specific poll
pollController.get('/api/polls/:pollId', (req, res) => {
  const { pollId } = req.params;
  // const userIP = req.connection.remoteAddress

  Poll.findById( pollId )
    .populate('options')
    .exec((err, poll) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(poll)
    })
})

// Create a new poll
pollController.post('/api/polls', (req, res) => {
    const { question, options } = req.body;
    const owner = req.user._id;
    const newPoll = new Poll({
      question,
      owner
    });

    async.each(options.split(','), (optionText, cb) => {
      let pollOption = new PollOption({
        option: optionText,
        pollId: newPoll._id
      })

      newPoll.options.push(pollOption)
      pollOption.save((err, item) => {
        if (err) {
          console.log('Something went wrong!', err)
          return;
        }
        console.log('Poll option saved!', item)
      })
    })
    newPoll.save();
});

// Delete poll
pollController.post('/api/polls/:pollId/delete', (req, res) => {
  const { pollId } = req.params;

  Poll
    .findOneAndRemove({ _id: pollId })
    .exec((err) => {
      if (err) { res.send(err); }
      PollOption
        .remove( { "pollId": pollId } )
        .exec((err) => {
          if (err) { res.send(err); }
          res.send('Deleted poll!')
        })
    })
})

// Cast a vote
pollController.post('/api/vote/:voteId', (req, res) => {
  const { voteId } = req.params;
  const pollId = Object.keys(req.body).toString()

  // Poll
  //   .findById(pollId)
  //   .exec((err, poll) => {
        PollOption
          .findOneAndUpdate({ _id: voteId }, {$inc: { count: 1 }}, {new: true})
          .exec((err, option) => {
            // poll.save();
            res.send('VOTED');
          })
      //   console.log('Youve already voted!')
      //   res.write(userIP)
      //   res.end()
    // })
})

// Add options to poll
pollController.post('/api/polls/:pollId', (req, res) => {
  const { pollId } = req.params;
  const { options } = req.body;

// Searches for relevant poll to update before creating new options
  const pollToUpdate = Poll.findById( pollId )
    .exec((err, poll) => {
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

module.exports = pollController;
