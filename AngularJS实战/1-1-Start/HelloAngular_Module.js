let HelloAngular = angular.module("MyApp", []);

HelloAngular.controller("HelloAngular", ['$scope',
    function ($scope) {
        $scope.greeting = {
            text: "Hello",
        }
    }
]);