(function () {
    'use strict';


    angular
        .module('app', ['ngRoute', 'ngCookies','textAngular','siyfion.sfTypeahead','jsTag','tagService'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
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

            .otherwise({ redirectTo: '/allcontent' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {

    }

})();