(function () {
    'use strict';


    angular
        .module('app', ['ngRoute', 'ngCookies','textAngular','brantwills.paging','tagService','ui.bootstrap','ngFileUpload','ngTagsInput','angular-jwt','angularModalService','chartjs','smart-table'])
        .config(config)
        .run(run);

    angular.module('app').filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        }
    });

    angular.module('app').factory('FitGlobalService', function() {
        return {
            baseUrl : "http://backend.fit1.com/"
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
                controllerAs: 'vm',
                desc: 'Editing Article'

            })
            .when('/allcontent', {
                controller: 'ContentController',
                templateUrl: 'views/list/home.view.html',
                desc : 'All Posts',
                controllerAs: 'vm'
            })
            .when('/posts', {
                controller: 'ContentController',
                templateUrl: 'views/patient/post.list.html',
                desc : 'All Posts',
                controllerAs: 'vm'
            })
            .when('/modallpost', {
                controller: 'ContentController',
                templateUrl: 'views/admin/post.list.html',
                desc : 'All Posts',
                controllerAs: 'vm'
            })
            .when('/post/:postId', {
                controller: 'ContentController',
                templateUrl: 'views/post_details/post.details.html',
                desc : 'View Post',
                controllerAs: 'vm'
            })
            .when('/modpost/:postId', {
               controller: 'ContentController',
               templateUrl: 'views/admin/post.details.html',
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
            .when('/insights', {
                controller: 'InsightsController',
                templateUrl: 'views/content/insights.view.html',
                controllerAs: 'vm'
            })
            .when('/accessdenied', {
                templateUrl: 'views/user/accessdenied.html'
            })

            .otherwise({ redirectTo: '/login' });

        $provide.decorator('taOptions', ['taRegisterTool', '$modal', '$delegate',
            function(taRegisterTool, $modal, taOptions) {
                // $delegate is the taOptions we are decorating
                // here we override the default toolbars specified in taOptions.
                taOptions.toolbar = [
                    ['bold', 'italics','underline'],
                    ['ul', 'ol'],
                    ['clear']
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

        $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
            $rootScope.desc = $route.current.desc;

            /*var fullRoute = current.$route.originalPath,
                routeParams = current.params,
                resolvedRoute;


            if((fullRoute == '/modpost/:postId' || fullRoute == '/modallpost') && $cookieStore.get("practoFitRole") != 'ADMIN')
            {
                $location.path('/accessdenied');
            }

            console.log(fullRoute);*/

        });
        $rootScope.backendUrl = "http://backend.fit1.com/";
        var fitToken = $cookieStore.get('fitToken');
        $http.defaults.headers.common['X-FIT-TOKEN'] = fitToken;

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