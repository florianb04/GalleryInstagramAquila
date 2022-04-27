const InstaControllers = angular.module('aq.gallery-instagram-aquila.controllers', []);

InstaControllers.controller('GalleryInstagramAquila', ['$scope', '$location', '$q', 'toastService',
    function ($scope, $location, $q, toastService) {
        $scope.plugin = {
            nom    : 'Chirac',
            prenom : 'Jacques',
            date   : '29 novembre 1932'
        };
    }
]);
