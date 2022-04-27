const instaPlugin = {name: 'aq.gallery-instagram-aquila'};

angular.module(`${instaPlugin.name}`, [
    `${instaPlugin.name}.controllers`,
    `${instaPlugin.name}.routes`,
    `${instaPlugin.name}.services`// ,
    // `${instaPlugin.name}.directives`
]);
// uncommented to use a decorator.
// Note that you need to have setup the service

angular.module('aq.dependencies').requires.push(`${instaPlugin.name}`);

/*
angular.module('adminCatagenApp').config(['$provide', function ($provide) {
    $provide.decorator('HookPageProduct', [
        '$delegate',
        function myServiceDecorator($delegate) {
            $delegate = $delegate.concat([
                {
                    label              : 'Poids',
                    component_template :
                        '<div class="col-sm-10">'
                            + '<input type="number" ng-model="client.weight" class="form-control" />'
                        + '</div>'
                }
            ]);
            return $delegate;
        }
    ]);
}]);

*/