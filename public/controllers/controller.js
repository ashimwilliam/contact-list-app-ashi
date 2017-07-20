(function(){
    var app = angular.module('contactlistapp', []);

    var AppCtrl = function($scope, $http){

        /*$http.get('/getContactList').then(function(response){
            //console.log(response);
            $scope.contactlist = response.data;
        });*/
        
        $scope.refresh = function(){
            $http.get('/getContactList').then(function(response){
                //console.log(response);
                $scope.contactlist = response.data;
                //$scope.contact = "";
            });
        };

        $scope.refresh();

        $scope.addContact = function(){
            //console.log($scope.contact);
            $http.post('/postContactList', $scope.contact).then(function(response){
                //console.log(response); 
                $scope.refresh();
                $scope.contact = "";
            });
        };

        $scope.removeContact = function(id){
            console.log(id);
            $http.delete('/deleteContact/'+id).then(function(response){
                $scope.refresh();
            });
        };

        $scope.editContact = function(id){
            console.log(id);
            $http.get('/editContact/'+id).then(function(response){
                console.log(response);
                $scope.contact = response.data;
            });
        };

        $scope.updateContact = function(){
            console.log($scope.contact._id);
            $http.put('/updateContact/'+$scope.contact._id, $scope.contact).then(function(response){
                $scope.refresh();
                $scope.contact = "";
            });
        };

        $scope.clearContact = function(){
            $scope.contact = "";
        }
    }

    app.controller('AppCtrl', AppCtrl);
}());