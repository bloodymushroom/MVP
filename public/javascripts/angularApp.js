angular.module('App', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html', 
      controller: 'AppController',
    })
    .state('chat', {
      url: '/chat',
      templateUrl: '/chat.html',
      controller: 'ChatController'
    })

  $urlRouterProvider.otherwise('home');
})
.factory('Users', function($http){
  var o = {
    yourName: 'Emm',
    users: [],
    chats: []
  }

  o.changeUser = function(newName){
    o.yourName = newName;
  }

  o.getUsers = function() {
    return $http.get('/users').success(function(data){
      angular.copy(data, o.users)
    })
  }

  o.getChats = function(){
    return $http.get('/chats').success(function(data){
      angular.copy(data, o.chats)
    })
  }

  o.likes = [];
  o.current = 0;

  o.upvote = function(user){
    return $http.post('/upvote', user).success(function(data){
      user.upvote++;
    })
  }

  o.nextUser = function(){
    if (o.current === o.users.length - 1){
      o.current = 0;
    } else{
      o.current++;
    }
  }

  o.likeUser = function(user){
    user.liked = true;
    o.likes.push(user.name)
  }

  return o;
})

.controller('AppController', function($scope, $http, $location, Users){
  $scope.yourName = Users.yourName;
  $scope.test = 'Tinder for HR50';
  $scope.users = Users.users;
  $scope.upvote = Users.upvote;
  $scope.current = Users.current;
  $scope.likes = Users.likes;
  $scope.picUrl = "http://lorempixel.com/250/250/cats/" + $scope.current + "/";
  Users.getUsers();

  $scope.upvote = function(user){
    Users.upvote(user);
    $scope.users[$scope.current].votes++;
  }

  $scope.changeUser = function(newName){
    Users.changeUser(newName);
    $scope.yourName = Users.yourName;
    $location.path('home');
  }

  $scope.nextUser = function() {
    Users.nextUser();
    $scope.current = Users.current;
    $scope.picUrl = "http://lorempixel.com/250/250/cats/" + $scope.current + "/";
  }
  $scope.likeUser = Users.likeUser;


})

.controller('ChatController', function($scope, $http, Users){
  Users.getChats();
  $scope.messages = Users.chats;
  $scope.from = Users.yourName;
  $scope.to = Users.users[Users.current].name;
  $scope.search = function(message) {
    console.log('message', message)
    return to.name === $scope.to.name && message.from.name === $scope.from;
  }

  $scope.postMessage = function(message) {
    var chat = {
      from: $scope.from,
      to: $scope.to,
      message: $scope.message
    }

    return $http.post('/chats', chat).success(function(data){
      console.log('posted')
      $scope.messages.push(data);
      $scope.message = '';
    })
  }

  $scope.filterChat = function(message) {
    return (message.to === $scope.to && message.from === $scope.from) || (message.from === $scope.to && message.to === $scope.from)
  }

})

