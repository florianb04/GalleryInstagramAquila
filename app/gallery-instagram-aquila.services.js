const BaseServices = angular.module('aq.gallery-instagram-aquila.services', ['ngResource']);

BaseServices.factory('InstaConfig', ['$resource',
    function ($resource) {
        return $resource('/v2/GalleryInstagramAquila/:action/:id', {}, {
            query : {method: 'POST', params: {}},
            update : {method: 'POST', params: {action: 'config', id: ''}}
            // update : {method: 'POST', params: {action: 'setConfig', id: ''}}
        });
    }
]);
