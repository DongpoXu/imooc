let MyForm = angular.module("MyForm", []);
MyForm.controller("MyFormCtrl", ["$scope",
    function ($scope) {
        // $scope.userInfo = {
        //     email: "806267856@qq.com",
        //     password: "QQ-password",
        //     autoLogin: false,
        // };
        $scope.getUserInfo = function () {
            console.log($scope.userInfo);
        };
        $scope.setUserInfo = function () {
            $scope.userInfo = {
                email: "aelousdp@163.com",
                password: "163-password",
                autoLogin: true,
            };
        };
        $scope.resetUserInfo = function () {
            $scope.userInfo = {
                email: "806267856@qq.com",
                password: "QQ-password",
                autoLogin: false,
            };
        };
    }
]);