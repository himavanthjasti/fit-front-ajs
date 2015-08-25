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
                url: FitGlobalService.baseUrl+'uploads',
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
    function ContentController($scope, $http, $q, $cookieStore, FitGlobalService, $modal, $rootScope) {

        var role = $cookieStore.get('practoFitRole');
        var fitToken = $cookieStore.get('fitToken');
        var practoAccountId = $cookieStore.get('practoAccountId');
        $scope.image = 'assets/images/default.png'
        $scope.role = false;
        if(role == "Admin")
        {
            $scope.role = true;
        }

        $scope.image = 'assets/images/default-post-image.jpg'

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
                console.log(data);
                for(var i=0; i<data.tagList.length; i++){
                    _tags.push({id: data.tagList[i].id, text:data.tagList[i].tagName})
                }
                deferred.resolve(_tags);
            });
            return deferred.promise;
        };

        $scope.publishOptions = {
            stores: [
                {id : 1, name : 'UNDER REVIEW' },
                {id : 2, name : 'DRAFT' },
                {id : 3, name : 'PUBLISHED'},
                {id : 4, name : 'DELETED'}
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
            var tag_arr = $scope.tags;
            var arr = [];
            for (var key in tag_arr) {
                arr.push(tag_arr[key].id);
            }
            var tag_string_name = arr.join();
            var datax = { 'title' : $scope.postTitle,'practo_account_id':practoAccountId,'content':$scope.htmlVariable, 'publishStatus':$scope.publishStatus.store.name, 'tagid':tag_string_name, 'postUrl':$scope.image};

            $http({
                method: 'POST',
                url: FitGlobalService.baseUrl+"posts",
                data: $.param(datax), 
                headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function (data) {

            });

        }


        $scope.autoSave = function(data){

            $http({
                method: 'POST',
                url: FitGlobalService.baseUrl+"posts",
                data: $.param(datax),
                headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function (data) {
                $scope.postId = data.content.postlist[0].postDetails.id;

                setInterval($scope.getNotificationData, 10000);

            });

        }

        //setInterval($scope.saveDraft($scope.postId), 3000);
        setInterval(function(){
            var postId = $scope.postId;
            if((typeof $scope.postTitle !== 'undefined' || typeof $scope.htmlVariable !== 'undefined') || typeof postId === 'undefined') {

                if(postId)
                {
                    console.log(postId);
                    var tag_arr = $scope.tags;
                    var arr = [];
                    for (var key in tag_arr) {
                        arr.push(tag_arr[key].id);
                    }
                    var tag_string_name = arr.join();

                    var datax = {
                        'title': $scope.postTitle,
                        'practo_account_id': practoAccountId,
                        'content': $scope.htmlVariable,
                        'publishStatus': 'DRAFT',
                        'tagid': tag_string_name,
                        'imgURL': $scope.image
                    };

                    $http({
                        method: 'PATCH',
                        url: FitGlobalService.baseUrl + "posts/"+postId,
                        data: $.param(datax),
                        headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
                    }).success(function (data) {
                       // $rootScope.postId = data.content.postlist[0].postDetails.id;

                    });
                }
                else
                {
                    console.log(postId);
                    var tag_arr = $scope.tags;
                    var arr = [];
                    for (var key in tag_arr) {
                        arr.push(tag_arr[key].id);
                    }
                    var tag_string_name = arr.join();

                    var datax = {
                        'title': $scope.postTitle,
                        'practo_account_id': practoAccountId,
                        'content': $scope.htmlVariable,
                        'publishStatus': 'DRAFT',
                        'tagid': tag_string_name,
                        'imgURL': $scope.image
                    };

                    $http({
                        method: 'POST',
                        url: FitGlobalService.baseUrl + "posts",
                        data: $.param(datax),
                        headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
                    }).success(function (data) {
                        $rootScope.postId = data.content.postlist[0].postDetails.id;

                    });
                }

            }

        }, 10000);

        $scope.saveDraft = function(postId) {




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

    apps.controller('DeleteConfirmation', DeleteConfirmation);
    function DeleteConfirmation($scope, $http, FitGlobalService, $cookieStore, $modalInstance, postId) {
        var fitToken = $cookieStore.get('fitToken');
        var practoAccountId = $cookieStore.get('practoAccountId');
        $scope.delete = function(value) {
            if(value =='yes')
            {
                var datax = { 'softDeleted' : 1,'practo_account_id':practoAccountId};

                $http({
                    method: 'PATCH',
                    url: FitGlobalService.baseUrl+"posts/"+postId,
                    data: $.param(datax),
                    headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
                }).success(function () {
                    $location.path('/allcontent');
                });
            }
            else
            {
                $modalInstance.dismiss('cancel');
            }

        }



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

    function GetAllPostController($scope, $http, FitGlobalService, $cookieStore, $routeParams, $location, $modal) {

        var practoAccountId = $cookieStore.get('practoAccountId');

        if($routeParams.tagId){
            var url = FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit=2&page=1&tagId='+$routeParams.tagId;
            getAllPosts(url);
        } else {
            var url = FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit=2&page=1';
            getAllPosts(url);
        }

        $scope.init = function () {
            var myEl = angular.element( document.querySelector( '#previousPost' ) );
            myEl.removeClass('sidebar-active');
        };

        $scope.dataLoading = true;

        $scope.getPostbyFitler = function(publishStatus) {

            var url = FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit=2&page=1&publishStatus='+publishStatus;
            getAllPosts(url);
            if(publishStatus == 'DRAFT')
            {
                $scope.draft = true;
            }
            else
            {
                $scope.draft = false;
            }

        };
        function getAllPosts(url)
        {
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
            });
        }

        $scope.DoCtrlPagingAct = function(text, page, pageSize, total) {
            $scope.dataLoading = true;
            if($scope.draft == true)
            {
                var url = FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit='+pageSize+'&page='+page+'&publishStatus=DRAFT';
            }
            else
            {
                var url = FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit='+pageSize+'&page='+page;
            }

            getAllPosts(url);
        };

        $scope.openConfirmation = function(postId) {

            $modal.open({
                controller: 'DeleteConfirmation',
                templateUrl: 'views/content/confirmationBox.html',
                resolve: {
                    postId: function () {
                        return postId;
                    }
                }
            });
        }


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
            $scope.image = data.postlist[0].postDetails.postUrl;

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

            var imgUrl = $scope.postImg;

            console.log(imgUrl);

            var datax = { 'title' : $scope.postTitle,'practo_account_id':practoAccountId,'content':$scope.htmlVariable,'tagid':tag_string_name,'postUrl':imgUrl};

           /* $http({
                method: 'PATCH',
                url: FitGlobalService.baseUrl+"posts/"+postId,
                data: $.param(datax),
                headers: {'X-FIT-TOKEN': fitToken, 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {
                $location.path('/allcontent');
            });*/

        }


    }
apps.controller('InsightsController', InsightsController);

function InsightsController($scope, $cookieStore, $http, FitGlobalService) {

    var practoAccountId = $cookieStore.get('practoAccountId');
    var limit = 10;
    var dailyLabels = [];
    var dailyData = [];
    var weeklyLabels = [];
    var weeklyData = [];
    var monthlyLabels = [];
    var monthlyData = [];

    $scope.someData = {
        labels: [],
        datasets: [{
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            responsive: false,
            maintainAspectRatio: true,
            data: []
        }]
    };

    $scope.someOptions = {
        //segementStrokeWidth: 20,
        //segmentStrokeColor: '#000',
        //    fillColor : "rgba(151,187,205,0.5)",
        // strokeColor : "rgba(151,187,205,1)",
        // pointColor : "rgba(151,187,205,1)",
        // pointStrokeColor : "#fff",
        // highlightFill: "rgba(220,220,220,0.75)",
        //   highlightStroke: "rgba(220,220,220,1)",
    };

    $scope.colours = null;

    $scope.radioModel = 'Daily';

    $scope.$watchCollection('radioModel', function () {
        if($scope.radioModel === 'Daily') {
            $scope.someData.labels = dailyLabels;
            $scope.someData.datasets[0].data = dailyData;
        } else if($scope.radioModel === 'Weekly') {
            $scope.someData.labels = weeklyLabels;
            $scope.someData.datasets[0].data = weeklyData;
        } else {
            $scope.someData.labels = monthlyLabels;
            $scope.someData.datasets[0].data = monthlyData;
        }
      
    });

    $scope.rowCollection = [];

    $http.get(FitGlobalService.baseUrl+'insights?practoAccountId='+practoAccountId).success(function(data){
        data = {
  "daily": [
    {
      "day": "2015-08-24",
      "viewCount": "18"
    },
    {
      "day": "2015-08-23",
      "viewCount": "6"
    },
    {
      "day": "2015-08-22",
      "viewCount": "7"
    },
    {
      "day": "2015-08-20",
      "viewCount": "3"
    },
    {
      "day": "2015-08-19",
      "viewCount": "6"
    },
    {
      "day": "2015-08-18",
      "viewCount": "6"
    },
    {
      "day": "2015-08-17",
      "viewCount": "6"
    },
    {
      "day": "2015-08-16",
      "viewCount": "6"
    },
    {
      "day": "2015-08-15",
      "viewCount": "6"
    },
    {
      "day": "2015-08-13",
      "viewCount": "12"
    },
    {
      "day": "2015-08-12",
      "viewCount": "3"
    },
    {
      "day": "2015-08-11",
      "viewCount": "3"
    },
    {
      "day": "2015-08-09",
      "viewCount": "6"
    },
    {
      "day": "2015-08-07",
      "viewCount": "3"
    },
    {
      "day": "2015-08-06",
      "viewCount": "6"
    },
    {
      "day": "2015-08-05",
      "viewCount": "9"
    },
    {
      "day": "2015-08-03",
      "viewCount": "6"
    },
    {
      "day": "2015-08-02",
      "viewCount": "15"
    },
    {
      "day": "2015-08-01",
      "viewCount": "3"
    },
    {
      "day": "2015-07-30",
      "viewCount": "3"
    },
    {
      "day": "2015-07-29",
      "viewCount": "3"
    },
    {
      "day": "2015-07-28",
      "viewCount": "3"
    },
    {
      "day": "2015-07-27",
      "viewCount": "3"
    },
    {
      "day": "2015-07-26",
      "viewCount": "6"
    },
    {
      "day": "2015-07-25",
      "viewCount": "6"
    }
  ],
  "weekly": [
    {
      "week": "34",
      "viewCount": "24"
    },
    {
      "week": "33",
      "viewCount": "34"
    },
    {
      "week": "32",
      "viewCount": "30"
    },
    {
      "week": "31",
      "viewCount": "39"
    },
    {
      "week": "30",
      "viewCount": "21"
    },
    {
      "week": "29",
      "viewCount": "6"
    }
  ],
  "monthly": [
    {
      "month": "8",
      "viewCount": "130"
    },
    {
      "month": "7",
      "viewCount": "111"
    },
    {
      "month": "6",
      "viewCount": "72"
    },
    {
      "month": "5",
      "viewCount": "33"
    }
  ]
};
        
        for(var i=0; i<data.daily.length; i++){
            dailyLabels.push(data.daily[i].day);
            dailyData.push(data.daily[i].viewCount);
        }
        for(var i=0; i<data.weekly.length; i++){
            weeklyLabels.push(data.weekly[i].week);
            weeklyData.push(data.weekly[i].viewCount);
        }
        for(var i=0; i<data.monthly.length; i++){
            monthlyLabels.push(data.monthly[i].month);
            monthlyData.push(data.monthly[i].viewCount);
        }
    });
    console.log($scope.someData.datasets[0].data);

    $http.get(FitGlobalService.baseUrl+'posts?practoAccountId='+practoAccountId+'&limit=5&page=1').success(function(data){
        console.log(data.length);
        for(var i=0;i<data.count;i++){
            var datax = {'publishedAt': data.postlist[i].postDetails.publishedAt, 'postId':data.postlist[i].postDetails.id, 'post':data.postlist[i].postDetails.title, 'views':data.postlist[i].postDetails.viewCount, 'likes':data.postlist[i].postDetails.likeCount};
            $scope.rowCollection.push(datax);
        }
    });

}

