(function () {
    'use strict';


    angular
        .module('app', ['ngRoute', 'ngCookies','textAngular','siyfion.sfTypeahead','jsTag','tagService','ui.bootstrap','ngFileUpload'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$provide'];
    function config($routeProvider, $provide) {
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

    }

})();