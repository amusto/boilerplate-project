angular.module('myApp')
    .service('twilioEngine', ['$state', '$location', '$stateParams', '$filter', '$q', '$http', function($state, $location, $stateParams, $filter, $q, $http){
        var MachineData = function(){
            var self = this;
            self.appName = 'Gtown Command Center';

            //VARIABLES
            self.dataLoading = false;

        };

        MachineData = new MachineData();

        return MachineData;
    }]);