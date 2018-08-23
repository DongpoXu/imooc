let MyCSSModule = angular.module("MyCSSModule", []);

MyCSSModule.controller('HeaderController', ['$scope',
    function ($scope) {
        $scope.isError = false;
        $scope.isWarning = false;
        $scope.showError = function () {
            $scope.messageText = 'This is an error!';
            $scope.isError = true;
            $scope.isWarning = false;
        };
        $scope.showWarning = function () {
            $scope.messageText = 'Just a warning. Please carry on.';
            $scope.isError = false;
            $scope.isWarning = true;
        };
    }
]);