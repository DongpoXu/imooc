let routerApp = angular.module('RouterApp', ['ui.router']);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: "/index",
            views: {
                '': {
                    templateUrl: 'template3/index.html',
                },
                'topbar@index': {
                    templateUrl: 'template3/topbar.html',
                },
                'main@index': {
                    templateUrl: 'template3/home.html',
                },
            },
        })
        .state('index.usermng', {
            url: "/usermng",
            views: {
                'main@index': {
                    templateUrl: 'template3/usermng.html',
                    controller: function ($scope, $state) {
                        $scope.addUserType = function () {
                            $state.go("index.usermng.addusertype");
                        }
                    },
                },
            },
        })
        .state('index.usermng.highendusers', {
            url: "/highendusers",
            templateUrl: "template3/highendusers.html",
        })
        .state('index.usermng.normalusers', {
            url: "/normalusers",
            templateUrl: "template3/normalusers.html",
        })
        .state('index.usermng.lowusers', {
            url: "/lowusers",
            templateUrl: "template3/lowusers.html",
        })
        .state('index.usermng.blacklist', {
            url: "/blacklist",
            templateUrl: "template3/blacklist.html",
        })
        .state('index.usermng.addusertype', {
            url: "/addusertype",
            templateUrl: "template3/addusertypeform.html",
            controller: function ($scope, $state) {
                $scope.backToPrevious = function () {
                    window.history.back();
                }
            },
        })
        .state('index.permission', {
            url: '/permission',
            views: {
                'main@index': {
                    template: '这里是权限管理',
                }
            },
        })
        .state('index.report', {
            url: '/report',
            views: {
                'main@index': {
                    template: '这里是报表管理',
                }
            },
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    template: '这里是系统设置',
                }
            },
        });
});