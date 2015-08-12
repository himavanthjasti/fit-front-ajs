(function () {
    'use strict';


    angular
        .module('app')
        .controller('ContentController', ContentController);

    

    function ContentController($scope, $http, JSTagsCollection, tagService) {


        tagService.getAllTags().then(function(data) {
            $scope.tag_data = data;
        });
        console.log($scope.tag_data);

        //Get All Tags from database
        //console.log("ss");
       /* var scope = 0;
        $http.get('http://fit.practo.local/tags').then(function(data){
            var tag_data = data.tagList;
            var arr_tag = [];
            for (var key in tag_data) {
                arr_tag.push(tag_data[key].tagDetails.tagName);
            }
            scope = arr_tag;
            console.log(scope);
            scope = data;

        });

        console.log(scope);*/



        // Build JSTagsCollection
        $scope.tags = new JSTagsCollection(["ds","ddd"]);

        // Export jsTags options, inlcuding our own tags object
        $scope.jsTagOptions = {
            'tags': $scope.tags
        };
        // **** Typeahead code **** //


        var suggestions = ["sss",'ygjhg'];
        suggestions = suggestions.map(function(item) { return { "suggestion": item } });
        // Instantiate the bloodhound suggestion engine
        var suggestions = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.suggestion); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: suggestions
        });

        // Initialize the bloodhound suggestion engine
        suggestions.initialize();

        // Single dataset example
        $scope.exampleData = {
            displayKey: 'suggestion',
            source: suggestions.ttAdapter()
        };

        // Typeahead options object
        $scope.exampleOptions = {
            hint: false,
            highlight: true
        };

        // Our form data for creating a new post with ng-model
        $scope.createPost = function() {

            var tag_arr = $scope.tags.tags;
            var arr = [];
            for (var key in tag_arr) {
                arr.push(tag_arr[key].value);
            }
            var tag_string_name = arr.join();


            console.log(tag_string_name);
            var datax = { 'title' : $scope.postTitle,'practo_account_id':1,'content':$scope.htmlVariable,'publishStatus':'PUBLISHED','tagid':'1'};

            /*$http({
                method: 'POST',
                url: "http://fit.practo.local/content/",
                data: $.param(datax), 
                headers: {'X-Profile-Token': '7eeebc0c-6079-4764-a294-43d4c7cbb743', 'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function () {});*/

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