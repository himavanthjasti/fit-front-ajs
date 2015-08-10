(function () {
    'use strict';

    angular
        .module('app')
        .controller('ContentController', ContentController);

    function ContentController($scope, $http) {

 



        // Our form data for creating a new post with ng-model

        $scope.createPost = function() {

            $http.get('http://www.fit1.com/content/');

            var datax = { 'title' : $scope.postTitle,'practo_account_id':3,'content':$scope.postTitle,'publishStatus':'PUBLISHED','tagid':'1'};

            $http({
                method: 'POST',
                url: "http://www.fit1.com/content/",
                data: $.param(datax), 
                headers: {'X-Profile-Token': '487f909b-00a1-4680-85b8-33b3a9dc72cb', 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {});

            /*$http.post("http://fit.practo.local/content/", {TEST: "TEST"}).success(function(responseData) {
                //do stuff with response
            });*/
        }
    }

})();