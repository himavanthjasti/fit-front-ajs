(function () {
    'use strict';


    angular
        .module('app', ['ngRoute', 'ngCookies','textAngular','tagService','ui.bootstrap','ngFileUpload','ngTagsInput','angular-jwt'])
        .config(config)
        .run(run);

    angular.module('app').filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        }
    });



    config.$inject = ['$routeProvider', '$locationProvider', '$provide'];
    function config($routeProvider, $locationProvider, $provide) {


        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("!");

        $routeProvider
            .when('/content', {
                controller: 'ContentController',
                templateUrl: 'views/content/home.view.html',
                controllerAs: 'vm'
            })
            .when('/content/:postId', {
                controller: 'ContentController',
                templateUrl: 'views/content/updatePost.view.html',
                controllerAs: 'vm'
            })
            .when('/allcontent', {
                controller: 'ContentController',
                templateUrl: 'views/content/allcontent.view.html',
                controllerAs: 'vm'
            })
            .when('/post/:postId', {
                controller: 'ContentController',
                templateUrl: 'views/content/post.view.html',
                controllerAs: 'vm'
            })
            .when('/profile', {
                controller: 'UserController',
                templateUrl: 'views/user/profile.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/allcontent' });

        $provide.decorator('taOptions', ['taRegisterTool', '$modal', '$delegate',
            function(taRegisterTool, $modal, taOptions) {
                // $delegate is the taOptions we are decorating
                // here we override the default toolbars specified in taOptions.
                taOptions.toolbar = [
                    ['clear', 'h1', 'h2', 'h3'],
                    ['ul', 'ol'],
                    ['bold', 'italics'],
                    ['insertLink', 'insertVideo']
                ];
                return taOptions;
            }
        ]);
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        //$cookieStore.put('practoFitRole', 'Admin');
        $cookieStore.put('practoFitRole', 'Doctor');
    }



})();