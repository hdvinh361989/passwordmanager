'use strict';

// Declare app level module which depends on views, and components
angular.module('PasswordManager', [
    'ui.router',
    'angular.filter',
    'PasswordManager.page',
    'vtAutoComplete',
    'LocalStorageModule',
    'ngClipboard',
    'ngAnimate',
    'myApp.version'
])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            if (toState.redirect) {
                $state.go(toState.redirect, toParams);
            }
        })
    }])

    .config(['$stateProvider', '$urlRouterProvider', 'ngClipProvider',
        function ($stateProvider, $urlRouterProvider, ngClipProvider) {
            ngClipProvider.setPath("/app/bower_components/zeroclipboard/dist/ZeroClipboard.swf");

            $stateProvider
                .state('home', {
                    url: '/',
                    redirect: 'page.search'
                })
                .state('page', {
                    abstract: true,
                    templateUrl: 'template/main.html'
                })
                .state('page.search', {
                    url: '/page/search',
                    templateUrl: 'components/page_password/views/page_search.html',
                    controller: 'searchController as searchCtrl'
                })
                .state('page.add', {
                    url: '/page/add',
                    templateUrl: 'components/page_password/views/page_add.html',
                    controller: 'addController as addCtrl'
                })
                .state('page.detail', {
                    url: '/page/:pageID',
                    templateUrl: 'components/page_password/views/page_detail.html',
                    controller: 'detailController as detailCtrl',
                    resolve: {
                        initData: function (Page, $stateParams) {
                            if ($stateParams.pageID) {
                                return (new Page()).find([{id: $stateParams.pageID}]).then(function (rs) {
                                    return rs;
                                });
                            } else {
                                return {};
                            }
                        }
                    }
                });

            $urlRouterProvider.otherwise('/');
        }]);
