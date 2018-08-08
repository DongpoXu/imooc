function GreetCtrl($scope, $rootScope) {
    $scope.name = "World";
    $rootScope.department = "Angular";
}

function ListCtrl($scope) {
    $scope.names = ["John", "Lisa", "Mike"];
}