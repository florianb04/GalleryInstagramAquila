const InstaRoutes = angular.module('aq.gallery-instagram-aquila.routes', ['ngRoute']);

InstaRoutes.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/gallery-instagram-aquila', {
                templateUrl : 'app/gallery-instagram-aquila/views/gallery-instagram-aquila-config.html',
                controller  : 'InstaController',
                resolve     : {
                    loggedin : checkLoggedin
                }
            });
    }
]);
