angular.module('SupCtrl', []).
  controller('loginCtrl', ['$scope', '$http', 'Users', function($scope, $http, Users) {

    $scope.responses = 'no response';
    $scope.user = {
        username: "Sample-User",
        password: "Supinf0"
    };
    $scope.login = function(req, res) {
      $scope.user.username = 'reporter_user';
      $http.post('/login', {
        username: $scope.user.username,
        password: $scope.user.password
      }).then(function(data) {
        $scope.responses = data;
      }, function(data) {
        $scope.responses = data;
      });
       /*
      Users.userLogin($scope.user.username, $scope.user.password).
        .success(function(data) {
          $scope.responses = data;
        });
       */
      /*
      $scope.user.username = 'reporter_user';
      $http({
        url: '/login',
        method: 'POST',
        data: $scope.user,
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(response) {
        if (response.status == 200) {
          $scope.responses = 'okok';
        }
      });
       */
    };
}]).
controller('ticketsCtrl', ['$scope', '$http', 'Tickets', function($scope, $http, Tickets) {
    Tickets.get().success(function(data) {
        $scope.tickets = data;
    });

}]).
  controller('addTicketCtrl', ['$scope', '$http', 'Tickets', function($scope, $http, Tickets) {
    $scope.priorities = ['TRIVAL', 'MINOR', 'MAJOR', 'CRITICAL', 'BLOCKER'];
    $scope.ticket = {
        summary: 'summary',
        description: 'description',
        priority: 'TRIVAL'
    };
    $scope.addTicket = function() {
      $http.post('/api/addTicket', {
        summary: $scope.ticket.summary,
        description: $scope.ticket.description,
        priority: $scope.ticket.priority,
        status: 'NEW'
      }).success(function(response) {

      }).error(function(response) {
        $scope.summary = 'input error';
      });
      /*
      Tickets.createTicket($scope.summary, $scope.description, $scope.priority, 'NEW').
        success(function(data) {
          // what to do after insert new ticket.
        });
       */
    };
  }]).
  controller('ticketCtrl', ['$scope', '$http', '$routeParams', 'Tickets', 'Users', function($scope, $http, $routeParams, Tickets, Users) {
    Tickets.getTicketById($routeParams.ticketId).
      success(function(data) {
        $scope.ticket = data;

        Users.getUserById(data.reporter).success(function(reporter){
          $scope.reporter = reporter;
        });
        Users.getUserById(data.developer).success(function(developer) {
          $scope.developer = developer;
        });

        $scope.comments = data.comments;

      });
  }]);
