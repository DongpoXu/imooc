let bookStoreApp = angular.module("bookStoreApp", [
    "ngRoute", "ngAnimate", "bookStoreCtrl", "bookStoreFilters",
    "bookStoreServices", "bookStoreDirectives"
]);

bookStoreApp.config(function ($routeProvider) {
    $routeProvider.when('/hello', {
        templateUrl: 'templates/hello.html',
        controller: 'HelloCtrl'
    }).when('/list', {
        templateUrl: 'templates/bookList.html',
        controller: 'BookListCtrl'
    }).otherwise({
        redirectTo: '/hello'
    })
});