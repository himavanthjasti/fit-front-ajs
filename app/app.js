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
            baseUrl : 'http://fit.practo.local/'
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

        $http.get('http://fit.practo.local/ulogin').success(function(data) {

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

        });

    }



})();