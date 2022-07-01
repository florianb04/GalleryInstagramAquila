const InstaControllers = angular.module('aq.gallery-instagram-aquila.controllers', []);

InstaControllers.controller('InstaController', ['$scope', '$http', '$location', '$q', 'toastService', 'InstaConfig',
    function ($scope, $http, $location, $q, toastService, InstaConfig) {
        $scope.plugin = {
            // userName    : userName,
            // userSecret  : userSecret,
            // verifCode   : verifCode,
            userName    : 'api.testor',
            userSecret  : '2@#xEIi&Cg%5',
            verifCode   : 'aaaaaa'
        };

        $http.post('/v2/modules/md', {
            moduleName: "gallery-instagram-aquila"
        }).then(function (response) {
            $scope.md = response.data.html
        });

        $scope.module = {};
        InstaConfig.query({}, {PostBody: {filter: {name: 'gallery-instagram-aquila'}, limit: 1}}, function (response) {
            $scope.module = response;
        });
        
        $scope.save = function (quit = false) {
            InstaConfig.update({id: $scope.module._id}, $scope.module.config, function (response) {
                toastService.toast('success', 'Sauvegarde réussie');
                if (quit) {
                    window.location.hash = '#/modules';
                }
            });
            console.log('scope', $scope);
        };

    }
]);
