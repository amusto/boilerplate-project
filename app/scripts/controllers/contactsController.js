'use strict';

angular.module('myApp.contacts', [])
.controller('ContactsCtrl', ['$scope', '$filter', '$http', 'contactsList', '$uibModal', function($scope, $filter, $http, contactsList, $uibModal) {
    $scope.contactList = contactsList;

    $scope.totalItems = $scope.contactList.length;
    $scope.numPages = 5;
    $scope.currentPage = 1;
    $scope.itemsPerPageOptions = ['10', '25', '100'];
    $scope.itemsPerPage = $scope.itemsPerPageOptions[0];

    $scope.displayEditContact = false;

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.pageSections = {};
    $scope.pageSections.addContact = false;

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.editContact = function(contactId){
        var urlString = "http://restcfc.local/contacts.cfc?method=getIndividualContact&contactId="+contactId;
        var promise = $http({method: 'GET', url: urlString})
            .then(function successCallback(response) {
            console.log(response);
            $scope.editContactData = response.data[0];
            console.log($scope.editContactData);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


        $scope.displayEditContact = true;
    };

    //Edit contact modal
    $scope.openEditContact = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ModalEditContactCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.displaySection = function(sectionName){
        $scope.pageSections[sectionName] = true;
        for (var prop in $scope.pageSections) {
            if(prop !== sectionName){
                $scope.pageSections[prop] = false;
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

}]).filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});