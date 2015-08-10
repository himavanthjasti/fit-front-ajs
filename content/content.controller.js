(function () {
    'use strict';

    angular
        .module('app')
        .controller('ContentController', ContentController);

    function ContentController($scope, $http) {

 



        // Our form data for creating a new post with ng-model

        $scope.createPost = function() {

            $http.get('http://fit.practo.local/content/');

            var data = { 'title' : $scope.postTitle,'practo_account_id':1,'content':$scope.postTitle,'publishStatus':'PUBLISHED','tagid':'1'};

            $http({
                method: 'POST',
                url: "http://fit.practo.local/content/",
                headers: {'X-Profile-Token': '7eeebc0c-6079-4764-a294-43d4c7cbb743','Access-Control-Allow-Origin': '*'},
                param: data
            }).success(function () {});

            /*$http.post("http://fit.practo.local/content/", {TEST: "TEST"}).success(function(responseData) {
                //do stuff with response
            });*/
        }
    }

})();