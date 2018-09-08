let MyCSSModule = angular.module("MyCSSModule", []);

MyCSSModule.controller('CSSCtrl', ['$scope',
    function ($scope) {
        $scope.color = 'red';
        $scope.setGreen = function () {
            $scope.color = 'green';
            console.log("set Green");
        };
        $scope.setRed = function () {
            $scope.color = 'red';
            console.log("set Red");
        }
    }
]);