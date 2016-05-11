'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ui.bootstrap'
]).
config(['$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider', function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
          .state('home', {
              url: '/',
              views: {
                  "mainView": {
                      templateUrl: 'views/home.html',
                      controller: 'HomeCtrl'
                  }
              }
          }).
          state('dashboard', {
              url: '/dashboard',
              views: {
                  "mainView": {
                      templateUrl: 'views/dashboard.html',
                      controller: 'DashboardCtrl'
                  }
              }
          }).
          state('contacts', {
              url: '/contacts',
              views: {
                  "mainView": {
                      templateUrl: 'views/contacts.html',
                      controller: 'ContactsCtrl'
                  }
              }
          });

}]);