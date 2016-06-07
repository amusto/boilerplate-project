angular.module('myApp')
    .service('contactsEngine', ['$filter', '$q', '$http', function($filter, $q, $http){
        var MachineData = function(){
            var self = this;

            //VARIABLES
            self.dataLoading = false;

            self.createContactList = function(contactsArray){
                var newContactList = [];
                angular.forEach(contactsArray, function(value, key) {
                    var contact = {
                        fullname : value.fullname,
                        firstname : value.firstname,
                        lastname : value.lastname,
                        email : value.email,
                        mobilephone : value.mobilephone
                    };
                    newContactList.push(contact);
                });

                return newContactList;
            };

            self.getContactList = function(){
                var urlString = "http://restcfc.local/contacts.cfc?method=getContacts";
                var promise = $http({
                    method: 'GET',
                    url: urlString
                }).then(function(response) {
                    //var newList = self.createContactList(response.data);

                    console.log(response);
                    var newContactList = [];
                    angular.forEach(response.data, function(value, key) {
                        var contact = {
                            fullname : value.fullname,
                            firstname : value.firstname,
                            lastname : value.lastname,
                            email : value.email,
                            mobilephone : value.mobilephone
                        };
                        newContactList.push(contact);
                    });
                    console.log(newContactList);

                    return newContactList;

                    /*$scope.numContacts = response.data.TOTALRECORDS;
                    $scope.totalItems = $scope.numContacts;
                    $scope.displaySection('listContacts');*/

                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

                //return promise;

            };

        };

        MachineData = new MachineData();

        return MachineData;
    }]);