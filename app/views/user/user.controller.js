'use strict';
var base_path = "http://fit.practo.local/";

var appy = angular
    .module('app');

appy.controller('UserController', UserController);
function UserController($scope, $http) {
    $scope.healthInterests = [];
    $http.get(base_path+'healthinterests').success(function(data){
        for(var i=0; i<data.count; i++){
            $scope.healthInterests.push({id: data.healthinterestsList[i].healthinterestsDetails.id, text:data.healthinterestsList[i].healthinterestsDetails.healthInterest})

        }
        console.log($scope.healthInterests);
    });

    $scope.selection = [];

    $scope.toggleSelection = function toggleSelection(hi) {
        var idx = $scope.selection.indexOf(hi);
        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.selection.push(hi);
        }
    };

    $scope.updateHealthInterests = function() {
        console.log($scope.selection);
        var hl = $scope.selection.join();
        var hl_data = { 'healthInterestsList' : hl,'practo_account_id':1};

        $http({
            method: 'POST',
            url: base_path+"users/healthinterests",
            data: $.param(hl_data),
            headers: {'X-Profile-Token': '7eeebc0c-6079-4764-a294-43d4c7cbb743', 'Content-Type': 'application/x-www-form-urlencoded'},
        }).success(function () {

        });
    }
}