'use strict';

var apps = angular
    .module('app')
    .controller('UserController', UserController);

function UserController($scope, $http, FitGlobalService, $cookieStore) {
    var fitToken = $cookieStore.get('fitToken');
    $scope.healthInterests = [];
    $http.get(FitGlobalService.baseUrl+'healthinterests').success(function(data){
        for(var i=0; i<data.count; i++){
            $scope.healthInterests.push({id: data.healthinterestsList[i].healthinterestsDetails.id, text:data.healthinterestsList[i].healthinterestsDetails.healthInterest})

        }
        console.log($scope.healthInterests);
    });

    $scope.selection = [];
    $http.get(FitGlobalService.baseUrl+'user/healthinterests?practo_account_id=1').success(function(data){
        var selected = data.userhealthinterestsList.health_interests;
        for(var i=0;i<selected.length;i++){
            $scope.selection.push(parseInt(selected[i]));
        }
    });


    $scope.toggleSelection = function toggleSelection(hi) {
        var idx = $scope.selection.indexOf(hi);
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }
        else {
            $scope.selection.push(hi);
        }
    };

    $scope.updateHealthInterests = function() {
        console.log($scope.selection);
        var data = { 'healthInterestsList' : $scope.selection.join(","),'practo_account_id':1};

        $http({
            method: 'POST',
            url: FitGlobalService.baseUrl+"users/healthinterests",
            data: $.param(data),
            headers: {'X-Profile-Token': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {

        });
    }
}