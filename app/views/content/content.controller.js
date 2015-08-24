'use strict';
var apps = angular
    .module('app')
    .controller('ContentController', ContentController);

    apps.controller('UploadImageModalInstance', function($scope, $cookieStore, $modalInstance, Upload, FitGlobalService){

        $scope.image = 'assets/images/default.png';
        $scope.progress = 0;
        $scope.files = [];

        var fitToken = $cookieStore.get('fitToken');
        var practoAccountId = $cookieStore.get('practoAccountId');
        $scope.upload = function(file){
            Upload.upload({
                url: 'http://backend.fit1.com/uploads',
                file: file,
                fileFormDataName: 'myFile',
                sendFieldsAs: 'form',
                method: 'POST',
                headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'}
            }).progress(function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data) {
                $scope.progress = 0;
                $scope.image = data.filename;
            });
        };

        $scope.insert = function(){
            $modalInstance.close($scope.image);
        };

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    })


    apps.controller('ContentController', ContentController).directive('starRating', starRating);
    function ContentController($scope, $http, $q, $cookieStore, FitGlobalService, $modal) {

        var role = $cookieStore.get('practoFitRole');
        var fitToken = $cookieStore.get('fitToken');
        var practoAccountId = $cookieStore.get('practoAccountId');
        $scope.image = 'assets/images/default.png'
        $scope.role = false;
        if(role == "Admin")
        {
            $scope.role = true;
        }

        $scope.image = 'assets/images/default.png'

        $scope.show = function(){
            var modalInstance = $modal.open({
                templateUrl: 'views/content/upload.html',
                controller: 'UploadImageModalInstance',
            }).result.then(
                function (result) {
                    $scope.image = result;
                    $scope.imageDisplay = true;
                }
            );
            return false;
        };

        $scope.tags = [];
        $scope.loadTags = function(query) {
            var deferred = $q.defer();
            $http.get(FitGlobalService.baseUrl+'tags?tag=' + query).success(function(data){
                var _tags = [];
                for(var i=0; i<data.tagList.length; i++){
                    _tags.push({id: data.tagList[i].id, text:data.tagList[i].tagName})
                }
                deferred.resolve(_tags);
            });
            return deferred.promise;
        };

        $scope.publishOptions = {
            stores: [
                {id : 1, name : 'REVIEW' },
                {id : 2, name : 'DRAFT' },
                {id : 3, name : 'PUBLISHED'}
            ]
        };

        $scope.publishStatus = {
            store: $scope.publishOptions.stores[0]
        };

        $scope.rating = 5;

        $scope.rateFunction = function(rating) {
            console.log('Rating selected: ' + rating);
        };

        $scope.openGuideline = function() {

            $modal.open({
                controller: 'GetGuidelineController',
                templateUrl: 'views/content/guideline.html'
            });
        }

        // Our form data for creating a new post with ng-model
        $scope.createPost = function() {

            /*$modal.open({
                controller: 'UploadImageModalInstance',
                templateUrl: 'views/content/shareModel.html'
            });*/

            var tag_arr = $scope.tags;
            var arr = [];
            for (var key in tag_arr) {
                arr.push(tag_arr[key].id);
            }
            var tag_string_name = arr.join();
            var datax = { 'title' : $scope.postTitle,'practo_account_id':practoAccountId,'content':$scope.htmlVariable, 'publishStatus':$scope.publishStatus.store.name, 'tagid':tag_string_name, 'imgURL':$scope.image};

            $http({
                method: 'POST',
                url: FitGlobalService.baseUrl+"posts",
                data: $.param(datax), 
                headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {});

        }

    }

    function starRating() {
        return {
            restrict: 'A',
            template: '<ul class="rating">'
            + '    <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            + '\u2605'
            + '</li>'
            + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }

    apps.controller('GetGuidelineController', GetGuidelineController);
    function GetGuidelineController($scope, $http, FitGlobalService) {

        $http.get(FitGlobalService.baseUrl+'guidelines').success(function(data){
            $scope.guidelines = data.Guidelines;
        });

    }

    apps.controller('GetPostController', GetPostController);

    function GetPostController($scope, $http, $routeParams, FitGlobalService, $cookieStore) {
        var postId = $routeParams.postId;
        var fitToken = $cookieStore.get('fitToken');
        var practoAccountId = $cookieStore.get('practoAccountId');
        $scope.dataLoading = true;
        $http.get(FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&id='+postId).success(function(data){
            $scope.dataLoading = false;
            $scope.postData = data.postlist[0].postDetails;
            //console.log($scope.postData);
            $scope.postContent = data.postlist[0].postDetails.contentTxt;
        });


        $scope.postCommentAction = function() {
            var data = { 'comment' : $scope.postComment,'practo_account_id':practoAccountId};

            $http({
                method: 'POST',
                url: FitGlobalService.baseUrl+"posts/"+postId+"/comments",
                data: $.param(data),
                headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {

                $http.get(FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&id='+postId).success(function(data){
                    $scope.postData = data.postlist[0].postDetails;
                    $scope.postContent = data.postlist[0].postDetails.contentTxt;
                    $scope.postComment = null;
                });
            });


        }
    }

    apps.controller('GetAllPostController', GetAllPostController);

    function GetAllPostController($scope, $http, FitGlobalService, $cookieStore, $routeParams, $location) {

        var practoAccountId = $cookieStore.get('practoAccountId');

        if($routeParams.tagId){
            var url = FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit=2&page=1&tagId='+$routeParams.tagId;
        } else {
            var url = FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit=2&page=1';
        }


        $scope.init = function () {
            console.log('came to previousPost init');
            //$scope.notifications = [];
            //$scope.notifications.push('sidebar-active');
            var myEl = angular.element( document.querySelector( '#previousPost' ) );
            myEl.addClass('sidebar-active');
        };

        $scope.dataLoading = true;

        $http.get(url, { cache: true}).success(function(data){
            $scope.postList = data.postlist;
            $scope.total = data.count;
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

            $scope.dataLoading = false;
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


            $scope.viewPost = function(postId) {
                //console.log(postId);
                console.log('http://frontend.fit1.com/#!/posts/'+postId);
                //$location.url('http://frontend.fit1.com/#!/posts/'+postId);
            };


        });

        $scope.DoCtrlPagingAct = function(text, page, pageSize, total) {
            //console.log({text, page, pageSize, total});
            $scope.dataLoading = true;
            $http.get(FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit='+pageSize+'&page='+page, { cache: true}).success(function(data){
                $scope.postList = data.postlist;
                $scope.total = data.count;
                $scope.dataLoading = false;

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
        };


    }

    apps.controller('UpdateContentController', UpdateContentController);

    function UpdateContentController($scope, $http, $routeParams, $location, $q, $cookieStore, FitGlobalService, $window) {


        $scope.loadTags = function(query) {
            var deferred = $q.defer();
            $http.get(FitGlobalService.baseUrl+'tags?tag=' + query).success(function(data){
                var _tags = [];
                for(var i=0; i<data.tagList.length; i++){
                    _tags.push({id: data.tagList[i].id, text:data.tagList[i].tagName})
                }
                deferred.resolve(_tags);
            });
            return deferred.promise;
        };

        var practoAccountId = $cookieStore.get('practoAccountId');
        var postId = $routeParams.postId;
        $http.get(FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&id='+postId).success(function(data){
            $scope.postData = data.postlist[0].postDetails;
            $scope.postTitle = data.postlist[0].postDetails.title;
            $scope.htmlVariable = data.postlist[0].postDetails.contentTxt;

            var _pretags = [];
            var tagList = data.postlist[0].postDetails.tags;
            for(var i=0; i<tagList.length; i++){
                _pretags.push({id: tagList[i].id, text:tagList[i].tagName})
            }

            $scope.tags = _pretags;

        });

        var role = $cookieStore.get('practoFitRole');
        var fitToken = $cookieStore.get('fitToken');
        $scope.role = false;
        if(role == "Admin")
        {
            $scope.role = true;
        }

        // Our form data for creating a new post with ng-model
        $scope.updatePost = function() {

            var tag_arr = $scope.tags;
            var arr = [];
            for (var key in tag_arr) {
                arr.push(tag_arr[key].id);
            }
            var tag_string_name = arr.join();

            var datax = { 'title' : $scope.postTitle,'practo_account_id':practoAccountId,'content':$scope.htmlVariable,'tagid':tag_string_name};

            $http({
                method: 'PATCH',
                url: FitGlobalService.baseUrl+"posts/"+postId,
                data: $.param(datax),
                headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {
                //$location.path("/allcontent").reload(true);

                $window.location.href = "/";
            });

        }


    }
