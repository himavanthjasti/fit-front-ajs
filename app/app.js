(function () {
    'use strict';


    angular
        .module('app', ['ngRoute', 'ngCookies','textAngular','brantwills.paging','tagService','ui.bootstrap','ngFileUpload','ngTagsInput','angular-jwt','angularModalService'])
        .config(config)
        .run(run);

    angular.module('app').filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        }
    });

    angular.module('app').factory('FitGlobalService', function() {
        return {
            baseUrl : 'http://backend.fit1.com/'
        };
    });



    config.$inject = ['$routeProvider', '$locationProvider', '$provide'];
    function config($routeProvider, $locationProvider, $provide) {


        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("!");

        $routeProvider
            .when('/content', {
                controller: 'ContentController',
                templateUrl: 'views/content/home.view.html',
                desc : 'Creating an article',
                controllerAs: 'vm'
            })
            .when('/content/:postId', {
                controller: 'ContentController',
                templateUrl: 'views/content/updatePost.view.html',
                controllerAs: 'vm'
            })
            .when('/allcontent', {
                controller: 'ContentController',
                templateUrl: 'views/list/home.view.html',
                desc : 'All Posts',
                controllerAs: 'vm'
            })
            .when('/post/:postId', {
                controller: 'ContentController',
                templateUrl: 'views/post_details/post.details.html',
                desc : 'View Post',
                controllerAs: 'vm'
            })
            .when('/profile', {
                controller: 'UserController',
                templateUrl: 'views/user/profile.view.html',
                controllerAs: 'vm'
            })
            .when('/notification', {
                controller: 'GetNotificationController',
                templateUrl: 'views/user/notification.view.html',
                controllerAs: 'vm',
                desc:  'Notifications',
                activeMenu: 'notifications'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/user/login.view.html',
                controllerAs: 'vm'
            })
            .when('/tag/:tagId', {
                controller: 'ContentController',
                templateUrl: 'views/list/home.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });

        $provide.decorator('taOptions', ['taRegisterTool', '$modal', '$delegate',
            function(taRegisterTool, $modal, taOptions) {
                // $delegate is the taOptions we are decorating
                // here we override the default toolbars specified in taOptions.
                taOptions.toolbar = [
                    ['clear', 'h1', 'h2', 'h3'],
                    ['ul', 'ol'],
                    ['bold', 'italics','underline'],
                    ['insertLink', 'insertVideo']
                ];
                return taOptions;
            }
        ]);



    }


    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$route'];
    function run($rootScope, $location, $cookieStore, $http, $route) {

        $rootScope.$on('$routeChangeStart', function () {
            if ($cookieStore.get("fitToken")==null) {
                $location.path('/login');
            }
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.desc = $route.current.desc;
        });
        $rootScope.backendUrl = "http://backend.fit1.com/";


    }



})();



angular.module("app").directive("sidebar", function() {
    return {
        restrict: 'A',
        templateUrl: 'views/sidebar.html',
        scope: true,
        transclude : false,
        controller: 'FooterController'
    };
});