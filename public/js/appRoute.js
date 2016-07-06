angular.module('appRoute', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .when('/allTickets', {
                templateUrl: 'partials/tickets.html',
                controller: 'ticketsCtrl'
            })
            .when('/newTickets', {
                templateUrl: 'partials/tickets.html',
                controller: 'ticketsCtrl'
            })
            .when('/addTicket', {
                templateUrl: 'partials/addTicket.html',
                controller: 'addTicketCtrl'
            })
            .when('/ticket/:ticketId', {
                templateUrl: 'partials/ticket.html',
                controller: 'ticketCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
