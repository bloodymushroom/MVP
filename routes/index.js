var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Chat = require('../models/Chats')

var fakeUsers = [
  {
    name: "Joos",
    picture: 'picture',
    description: 'I\'ve escaped death many times',
    votes: 0
  },
  {
    name: "Lisa",
    picture: 'picture',
    description: 'HR50\'s #1 sweetheart',
    cool: 0,
    votes: 0
  },
  {
    name: "Emm",
    picture: 'picture',
    description: 'deepsea diving, searching for that treasure',
    cool: 0,
    votes: 0
  },
  {
    name: "Fiona",
    picture: 'picture',
    description: 'Straight up to my faaaace',
    cool: 0,
    votes: 0
  },
  {
    name: "Casey",
    picture: 'picture',
    description: 'SMILEY!!',
    cool: 0,
    votes: 0
  }
]

User.insertMany(fakeUsers);

/* GET home page. */
router.param('user', function(req, res, next, id) {
  var query = user.findById(id);

  query.exec(function(err, user){
    if (err) {console.error(err)};
    if (!user) {console.error('no user found')};

    req.user = user;
    return next;
  })
});

router.get('user/:user', function(req, res){
  res.json(req.user);
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
  User.find(function(err, users){
    if (err) {console.error(err)};

    res.json(users);
  })
})

router.post('/users', function(req, res, next){
  var user = new User(req.body);

  user.save(function(err, user){
    if (err) {console.error(err)};

    res.json(user);
  })
})

router.get('/chats', function(req, res, next) {
  console.log('got chats')
  Chat.find(function(err, chats){
    if (err) {console.error(err)};

    res.json(chats);
  })
})

router.post('/chats', function(req, res, next) {
  var chat = new Chat(req.body);

  chat.save(function(err, chat) {
    if (err) {console.error(err)};

    res.json(chat);
  })
})

router.post('/upvote', function(req, res, next) {
  console.log('body', req.body._id)
  User.find(ObjectId(req.body._id)).exec()
  // .exec().then( function(user) {
  //   console.log('found user', user)
  //   user.votes++;
  //   user.save();
  //   res.json(user);
  // }).catch(function(err){
  //   console.error(err);
  // })
})

module.exports = router;
