'use strict';
var base_path = "http://practo-fit.com/";

var apps = angular
    .module('app')
    .controller('ContentController', ContentController);


apps.config(function ($provide) {

    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$modal', function (taRegisterTool, taOptions, $modal) {
        taRegisterTool('uploadImage', {
            buttontext: 'Upload Image',
            iconclass: "fa fa-image",
            action: function (deferred,restoreSelection) {
                $modal.open({
                    controller: 'UploadImageModalInstance',
                    templateUrl: 'views/content/upload.html'
                }).result.then(
                    function (result) {
                        restoreSelection();
                        document.execCommand('insertImage', true, result);
                        deferred.resolve();
                    },
                    function () {
                        deferred.resolve();
                    }
                );
                return false;
            }
        });
        taOptions.toolbar[1].push('uploadImage');
        return taOptions;
    }]);
})



apps.controller('UploadImageModalInstance', function($scope, $modalInstance, Upload){

    $scope.image = 'assets/images/default.png';

    $scope.progress = 0;
    $scope.files = [];

    $scope.upload = function(){
        Upload.upload({
            url: base_path+'uploads',
            fields: {'dir': 'img/uploads/'},
            file: $scope.files[0],
            method: 'POST'
        }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data) {
            console.log(data);
            $scope.progress = 0;
            $scope.image = data.filename;
        });
    };

    $scope.insert = function(){
        $modalInstance.close($scope.image);
    };
})


    apps.controller('ContentController', ContentController);
    function ContentController($scope, $http, $q) {

        /*$(window).keypress(function(event) {
            alert(event.keyCode);
            if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
            alert("Ctrl-S pressed");
            event.preventDefault();
            return false;
        });*/

        $scope.tags = [];
        $scope.loadTags = function(query) {
            var deferred = $q.defer();
            $http.get(base_path+'tags?tag=' + query).success(function(data){
                var _tags = [];
                for(var i=0; i<data.tagList.length; i++){
                    _tags.push({id: data.tagList[i].tagDetails.id, text:data.tagList[i].tagDetails.tagName})
                }
                deferred.resolve(_tags);
            });
            return deferred.promise;
        };

        /*$scope.publishOptions = {
            stores: [
                {id : 1, name : 'DRAFT' },      
                {id : 2, name : 'REVIEW' },
                {id : 3, name : 'PUBLISHED'}
            ]
        };

        $scope.publishStatus = {
            store: $scope.sortOptions.stores[0]
        };*/

        // Our form data for creating a new post with ng-model
        $scope.createPost = function() {
            //console.log($scope.tags);

            var tag_arr = $scope.tags;
            var arr = [];
            for (var key in tag_arr) {
                arr.push(tag_arr[key].id);
            }
            var tag_string_name = arr.join();


            console.log(tag_string_name);
            var datax = { 'title' : $scope.postTitle,'practo_account_id':1,'content':$scope.htmlVariable,'publishStatus':'PUBLISHED','tagid':'1'};

            $http({
                method: 'POST',
                url: "http://fit.practo.local/content/",
                data: $.param(datax), 
                headers: {'X-Profile-Token': '7eeebc0c-6079-4764-a294-43d4c7cbb743', 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {});

        }

    }


    apps.controller('GetPostController', GetPostController);

    function GetPostController($scope, $http, $routeParams) {
        var postId = $routeParams.postId;
        $http.get(base_path+'content/?practoAccountId=1&id='+postId).success(function(data){
            $scope.postData = data.postlist[0].postDetails;

            $scope.postContent = data.postlist[0].postDetails.contentTxt;
        });
    }

    apps.controller('GetAllPostController', GetAllPostController);

    function GetAllPostController($scope, $http) {
        $http.get(base_path+'content/?practoAccountId=1').success(function(data){
            $scope.postList = data.postlist;
            $scope.sortOptions = {
            stores: [
                {id : 1, name : 'Status' },      
                {id : 2, name : 'Created At' },
                {id : 3, name : 'Modified At'},
                {id : 4, name : 'View Count'},
                {id : 5, name : 'Like Count'}
            ]
        };

            $scope.sortItem = {
            store: $scope.sortOptions.stores[0]
        };

        $scope.reverse = true;

        $scope.$watch('sortItem', function () {
            console.log($scope.sortItem);
            if ($scope.sortItem.store.id === 1) {
                $scope.reverse = true;
                 $scope.ff = 'postDetails.publishStatus';
            } else if ($scope.sortItem.store.id === 2) {
                $scope.reverse = false;
                $scope.ff = 'postDetails.createdAt';
            } else if ($scope.sortItem.store.id === 3) {
                $scope.reverse = true;
                $scope.ff = 'postDetails.modifiedAt';
            } else if ($scope.sortItem.store.id === 4) {
                $scope.reverse = true;
                $scope.ff = 'postDetails.viewCount'
            } else {
                $scope.reverse = false;
                $scope.ff = 'postDetails.likeCount';
            }
        }, true);
        });
    }

    apps.controller('UpdateContentController', UpdateContentController);

    function UpdateContentController($scope, $http, $routeParams, $location) {
        var postId = $routeParams.postId;
        $http.get(+base_path+'content/?practoAccountId=1&id='+postId).success(function(data){
            $scope.postData = data.postlist[0].postDetails;
            $scope.postTitle = data.postlist[0].postDetails.title;
            $scope.htmlVariable = data.postlist[0].postDetails.contentTxt;
        });

        // Our form data for creating a new post with ng-model
        $scope.updatePost = function() {

            var datax = { 'title' : $scope.postTitle,'practo_account_id':1,'content':$scope.htmlVariable,'publishStatus':'PUBLISHED','tagid':'1'};

            $http({
                method: 'PATCH',
                url: base_path+"content/"+postId,
                data: $.param(datax),
                headers: {'X-Profile-Token': '7eeebc0c-6079-4764-a294-43d4c7cbb743', 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {$location.path("/allcontent");});

        }


    }
