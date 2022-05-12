const InstaControllers = angular.module('aq.gallery-instagram-aquila.controllers', []);

InstaControllers.controller('GalleryInstagramAquila', ['$scope', '$location', '$q', 'toastService',
    function ($scope, $location, $q, toastService) {
        $scope.plugin = {
            userName    : 'api.testor',
            userSecret  : '2@#xEIi&Cg%5',
            verifCode   : 'aaaaaa'
        };
    }
]);
