'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'myApp.home',
  'myApp.contacts',
  'myApp.addContact',
  'myApp.modalEditContact',
  'smart-table'
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
          state('contacts', {
              url: '/contacts',
              views: {
                  "mainView": {
                      templateUrl: 'views/contacts.html',
                      controller: 'ContactsCtrl',
                      resolve: {
                          contactsList: function ($http) {
                              var urlString = "http://restcfc.local/contacts.cfc?method=getContacts";
                              var contactList = [];

                              return $http({method: 'GET', url: urlString})
                                  .then (function (response) {

                                  angular.forEach(response.data, function(value, key) {
                                      var contact = {
                                          id : value.id,
                                          fullname : value.fullname,
                                          firstname : value.firstname,
                                          lastname : value.lastname,
                                          email : value.email,
                                          mobilephone : value.mobilephone
                                      };
                                      contactList.push(contact);
                                  });

                                  return contactList;

                              });

                          }
                      }
                  }
              }


          }).
          state('addContact', {
              url: '/addContact',
              views: {
                  "mainView": {
                      templateUrl: 'views/addContact.html',
                      controller: 'AddContactCtrl'
                  }
              }
          });

}])

//Main method initialization
.run([function(){

}])
;