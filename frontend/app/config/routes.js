var app = angular.module('myApp')

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard')

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard/dashboard.html'
        })
        .state('billingCycle', {
            url: '/billingCycles?page',
            templateUrl: 'billingCycle/tabs.html'
        })
}])