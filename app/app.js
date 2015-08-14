(function () {
    'use strict';


    angular
        .module('app', ['ngRoute', 'ngCookies','textAngular','siyfion.sfTypeahead','jsTag','tagService','ui.bootstrap', 'ngSanitize'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider, $provide) {
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

    var app = angular.module('plunker', ['ui.bootstrap', 'textAngular', 'ngSanitize']);

    app.config(['$provide',
        function($provide) {
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

                    // Create our own insertImage button
                    taRegisterTool('customInsertImage', {
                        iconclass: "fa fa-picture-o",
                        action: function() {
                            var textAngular = this;
                            var savedSelection = rangy.saveSelection();
                            var modalInstance = $modal.open({
                                // Put a link to your template here or whatever
                                template: '<label>Enter the url to your image:</label><input type="text" ng-model="img.url"><button ng-click="submit()">OK</button>',
                                size: 'sm',
                                controller: ['$modalInstance', '$scope',
                                    function($modalInstance, $scope) {
                                        $scope.img = {
                                            url: ''
                                        };
                                        $scope.submit = function() {
                                            $modalInstance.close($scope.img.url);
                                        };
                                    }
                                ]
                            });

                            modalInstance.result.then(function(imgUrl) {
                                rangy.restoreSelection(savedSelection);
                                textAngular.$editor().wrapSelection('insertImage', imgUrl);
                            });
                            return false;
                        },
                    });

                    // Now add the button to the default toolbar definition
                    // Note: It'll be the last button
                    taOptions.toolbar[3].push('customInsertImage');
                    return taOptions;
                }
            ]);
        }
    ]);

    app.controller("MyCtrl", ['$scope',
        function($scope) {
            $scope.html = "Here's some sample text!!!.!!!";
        }
    ]);

})();