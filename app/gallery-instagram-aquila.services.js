const BaseServices = angular.module('aq.gallery-instagram-aquila.services', ['ngResource']);

BaseServices.factory('Insta', ['$resource',
    function ($resource) {
        return $resource('/v2/nameToIdentifyTheplugin', {}, {
            query : {method: 'POST', params: {}}
        });
    }
]);
