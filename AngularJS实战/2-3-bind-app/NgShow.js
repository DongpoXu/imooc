let MyCSSModule = angular.module("MyCSSModule", []);
MyCSSModule.controller("MenuController", ["$scope",
    function ($scope) {
        $scope.menuState = {
            show: false,
        };
        $scope.toggleMenu = function () {
            $scope.menuState.show = !$scope.menuState.show;
        }
    }
]);