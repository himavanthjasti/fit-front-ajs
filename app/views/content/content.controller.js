(function () {
    'use strict';

    angular
        .module('app')
        .controller('ContentController', ContentController);

    function ContentController($scope, $http) {
        // Our form data for creating a new post with ng-model
        $scope.createPost = function() {

            var datax = { 'title' : $scope.postTitle,'practo_account_id':1,'content':$scope.htmlVariable,'publishStatus':'PUBLISHED','tagid':'1'};

            $http({
                method: 'POST',
                url: "http://fit.practo.local/content/",
                data: $.param(datax), 
                headers: {'X-Profile-Token': '7eeebc0c-6079-4764-a294-43d4c7cbb743', 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {});

        }

    }


    angular
        .module('app')
        .controller('GetPostController', GetPostController);

    function GetPostController($scope, $http, $routeParams) {
        var postId = $routeParams.postId;
        $http.get('http://fit.practo.local/content/?practoAccountId=1&id='+postId).success(function(data){
            $scope.postData = data.postlist[0].postDetails;

            $scope.postContent = data.postlist[0].postDetails.contentTxt;
        });
    }

    angular
        .module('app')
        .controller('GetAllPostController', GetAllPostController);

    function GetAllPostController($scope, $http) {
        $http.get('http://fit.practo.local/content/?practoAccountId=1').success(function(data){
            $scope.postList = data.postlist;

        });
    }

    angular
        .module('app')
        .controller('UpdateContentController', UpdateContentController);

    function UpdateContentController($scope, $http, $routeParams, $location) {
        var postId = $routeParams.postId;
        $http.get('http://fit.practo.local/content/?practoAccountId=1&id='+postId).success(function(data){
            $scope.postData = data.postlist[0].postDetails;
            $scope.postTitle = data.postlist[0].postDetails.title;
            $scope.htmlVariable = data.postlist[0].postDetails.contentTxt;
        });

        // Our form data for creating a new post with ng-model
        $scope.updatePost = function() {

            var datax = { 'title' : $scope.postTitle,'practo_account_id':1,'content':$scope.htmlVariable,'publishStatus':'PUBLISHED','tagid':'1'};

            $http({
                method: 'PATCH',
                url: "http://fit.practo.local/content/"+postId,
                data: $.param(datax),
                headers: {'X-Profile-Token': '7eeebc0c-6079-4764-a294-43d4c7cbb743', 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {$location.path("/allcontent");});

        }


    }


})();