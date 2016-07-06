angular.module('SupTracService', [])
  .factory('Tickets', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('/api/tickets');
      },
      getNewTickets: function() {
        return $http.get('/api/newTickets');
      },
      getTicketById: function(ticketId) {
        return $http.get('/api/ticket/' + ticketId);
      }/*,
      createTicket: function(summary, description, priority, status) {
        var ticket = {
          'summary': summary,
          'description': description,
          'priority': priority,
          'status': status
        };
        return $http.post('/api/addTicket', ticket);
      }
      */
    };
  }])
  .factory('Users', ['$http', function($http) {
    return {
      getUserById: function(userId) {
        return $http.get('/api/user/' + userId);
      },
      userLogin: function(username, password) {
        var loginUser = {
          'username': username,
          'password': password
        };
        return $http.post('/login', loginUser);
      }
    };
  }]);
