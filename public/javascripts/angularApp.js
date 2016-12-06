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
    yourName: 'SexyThang',
    users: [],
    chats: []
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
    console.log(user._id, "id")
    return $http.post('/upvote', user).success(function(data){
      user.upvote++;
      console.log(data);
    })
    console.log('helllo')
  }

  o.nextUser = function(){
    console.log('next');
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

.controller('AppController', function($scope, $http, Users){
  $scope.test = 'Tinder for HR50';
  $scope.users = Users.users;
  $scope.upvote = Users.upvote;
  $scope.current = Users.current;
  $scope.likes = Users.likes;
  Users.getUsers();

  $scope.nextUser = function() {
    Users.nextUser();
    $scope.current = Users.current;
  }
  $scope.likeUser = Users.likeUser;

})

.controller('ChatController', function($scope, $http, Users){
  Users.getChats();
  $scope.messages = Users.chats;
  console.log($scope.messages, "messages")
  $scope.from = Users.yourName;
  $scope.to = Users.users[Users.current];

  $scope.postMessage = function(message) {
    var chat = {
      from: $scope.from,
      to: $scope.to,
      message: $scope.message
    }

    return $http.post('/chats', chat).success(function(data){
      console.log('posted')
      $scope.messages.push(data);
    })

  }
})

