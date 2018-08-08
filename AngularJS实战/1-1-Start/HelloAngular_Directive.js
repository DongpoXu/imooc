(function () {
    angular.module("MyDirective", [])
        .directive("hello", function () {
            return {
                restrict: "E",
                template: "<p>{{greeting.text}},Angular</p>",
                replace: true,
            }
        })
        .controller("HelloAngular", ["$scope", function ($scope) {
            $scope.greeting = {
                text: "Hello",
            }
        }])
})();