'use strict';

var apps = angular
    .module('app');
apps.controller('UserController', UserController);

function UserController($scope, $http, FitGlobalService, $cookieStore) {
    var practoAccountId = $cookieStore.get('practoAccountId');
    var fitToken = $cookieStore.get('fitToken');
    $scope.healthInterests = [];
    $http.get(FitGlobalService.baseUrl+'healthinterests').success(function(data){
        for(var i=0; i<data.count; i++){
            $scope.healthInterests.push({id: data.healthinterestsList[i].healthinterestsDetails.id, text:data.healthinterestsList[i].healthinterestsDetails.healthInterest})

        }
    });

    $scope.selection = [];
    $http.get(FitGlobalService.baseUrl+'user/healthinterests?practo_account_id='+practoAccountId).success(function(data){
        var selected = data.userhealthinterestsList.health_interests;
        if(selected){
            for(var i=0;i<selected.length;i++){
                $scope.selection.push(parseInt(selected[i]));
            }
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
        var data = { 'healthInterestsList' : $scope.selection.join(","),'practo_account_id':practoAccountId};

        $http({
            method: 'POST',
            url: FitGlobalService.baseUrl+"users/healthinterests",
            data: $.param(data),
            headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {

        });
    }
}

apps.controller('GetNotificationController', GetNotificationController);
function GetNotificationController($scope, $http, FitGlobalService, $cookieStore) {
    var practoAccountId = $cookieStore.get('practoAccountId');

    $http.get(FitGlobalService.baseUrl+'user/notifications?practoAccountId='+practoAccountId).success(function(data) {
        $scope.notificationList = data.UserNotificationsList;
        //console.log(data.postlist);
    });

    $scope.getNotificationData = function(){
        $http.get(FitGlobalService.baseUrl+'user/notifications?practoAccountId='+practoAccountId).success(function(data) {
            $scope.notificationList = data.UserNotificationsList;
            //console.log(data.postlist);
        });
    };

    setInterval($scope.getNotificationData, 10000);

}

apps.controller('LoginController', LoginController);
function LoginController($scope, $location, $http, $cookieStore) {

        $http.get($scope.backendUrl+'ulogin').success(function(data) {

        if($location.search().token == null)
        {
            var myEl = angular.element(document.querySelector('#form'));
            myEl.append(data);

            document.getElementById("openid_message").submit();
        }
        else
        {
            $cookieStore.put('fitToken', $location.search().token);
            $cookieStore.put('practoFitRole', 'Doctor');
            $cookieStore.put('practoAccountId', $location.search().uid);
            $location.url('/allcontent');
        }

    });
}