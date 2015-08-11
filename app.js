(function () {
    'use strict';


    angular
        .module('app', ['ngRoute', 'ngCookies','textAngular'])
        .config(config)
        .run(run);




    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            .when('/content', {
                controller: 'ContentController',
                templateUrl: 'content/home.view.html',
                controllerAs: 'vm'
            })
            .when('/content/:postId', {
                controller: 'ContentController',
                templateUrl: 'content/updatePost.view.html',
                controllerAs: 'vm'
            })
            .when('/allcontent', {
                controller: 'ContentController',
                templateUrl: 'content/allcontent.view.html',
                controllerAs: 'vm'
            })
            .when('/post/:postId', {
                controller: 'ContentController',
                templateUrl: 'content/post.view.html',
                controllerAs: 'vm'
            })


            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {

    }

})();