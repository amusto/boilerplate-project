'use strict';

angular.module('myApp.addContact', [])
.controller('AddContactCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.contactsColumns = [];
    $scope.contactList = [];
    $scope.numContacts = 0;

    $scope.totalItems = $scope.numContacts;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 25;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.pageSections = {};
    $scope.pageSections.addContact = false;

    $scope.getContacts = function(pageNum, start, row){
        var urlString = "http://restcfc.local/contacts.cfc?method=getContacts";
        var promise = $http({
            method: 'GET',
            url: urlString
        }).then(function successCallback(response) {
            console.log(response);
            $scope.contactsColumns = response.data.COLUMNLIST;
            $scope.contactList = response.data.DATA;

            $scope.numContacts = response.data.TOTALRECORDS;
            $scope.totalItems = $scope.numContacts;
            $scope.displaySection('listContacts');

            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        return promise;
    };

    $scope.reviewContacts = function(){
        $scope.getContacts();
    };
    $scope.reviewContacts();

    $scope.displaySection = function(sectionName){
        $scope.pageSections[sectionName] = true;
        for (var prop in $scope.pageSections) {
            if(prop !== sectionName){
                $scope.pageSections[prop] = false;
                //console.log("pageSections." + prop + " = " + $scope.pageSections[prop]);
            }
        }
    };

    $scope.phoneNum = '';
    $scope.message = '';
    $scope.smsResponse = {};

    $scope.msgReady = function(){
            var resultValue = false;

            if($scope.phoneNum !== '' && $scope.message !== ''){
                    resultValue = true;
            }

            return resultValue;
    };

    $scope.sendSMS = function(){
            var urlString = "phoneNum/"+$scope.phoneNum+"/message/"+$scope.message;
            var promise = $http({
                    method: 'GET',
                    url: 'http://remote.realtech.io:3000/twilioApi/'+urlString
            }).then(function successCallback(response) {
                    $scope.smsResponse.message = response.data;
                    $scope.smsResponse.status = response.statusText;
                    console.log($scope.smsResponse);
                    // this callback will be called asynchronously
                    // when the response is available
            }, function errorCallback(response) {

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
            });

            return promise;

    };

    $scope.getMessagesList = function(){
            var urlString = "listMessages";
            var promise = $http({
                    method: 'GET',
                    url: 'http://remote.realtech.io:3000/twilioApi/'+urlString
            }).then(function successCallback(response) {

                    console.log(response);
                    console.log(response.data);

                    /*$scope.smsResponse.message = response.data;
                     $scope.smsResponse.status = response.statusText;*/

            }, function errorCallback(response) {

            });

            return promise;

    };

}]);