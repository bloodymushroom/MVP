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
    users: [
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
  }
  o.getUsers = function() {
    return $http.get('/users').success(function(data){
      angular.copy(data, o.users)
    })
  }

  o.likes = [];
  o.current = 0;

  o.upvote = function(user){
    console.log('helllo')
    user.votes++;
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

.controller('AppController', function($scope, Users){
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

.controller('ChatController', function($scope, Users){
  $scope.messages = []
  $scope.from = Users.yourName;
  $scope.to = Users.users[Users.current];

  $scope.postMessage = function(message) {
    $scope.messages.push({
      from: $scope.from,
      to: $scope.to,
      message: $scope.message
    })


  }
})

