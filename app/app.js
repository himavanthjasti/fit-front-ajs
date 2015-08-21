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



    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$route'];
    function run($rootScope, $location, $cookieStore, $http, $route) {
        //$cookieStore.put('practoFitRole', 'Admin');

       /* $http.get('http://fit.practo.local/ulogin').success(function(data) {

            var fitToken = $cookieStore.get('fitToken');
            if($location.search().token == null && fitToken == null)
            {
                var myEl = angular.element(document.querySelector('#form'));
                myEl.append(data);
                document.getElementById("openid_message").submit();

                $cookieStore.put('fitToken', '7eeebc0c-6079-4764-a294-43d4c7cbb743');
                $cookieStore.put('practoFitRole', 'Doctor');

            }
            $location.url($location.path());

        }); */


        $rootScope.$on('$routeChangeSuccess', function() {
            //document.page-title = $route.current.desc;
            $rootScope.desc = $route.current.desc;
        });


    }



})();