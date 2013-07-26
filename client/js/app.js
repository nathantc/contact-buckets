(function() {

    var module = angular.module('ContactBuckets', ['ContactDataModule']);

    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts', {templateUrl:'contacts.html', controller:'ContactController'});
        $routeProvider.when('/edit', {templateUrl:'edit-contact.html', controller:'EditContactController'});
        $routeProvider.when('/edit/:id', {templateUrl:'edit-contact.html', controller:'EditContactController'});
        $routeProvider.otherwise({redirectTo:'/contacts'});
    }]);

    module.controller('ContactController', ['$scope', 'ContactDataService', function($scope, contactDataService) {
        $scope.contacts = contactDataService.getAll();
        $scope.delete = contactDataService.delete;
    }]);

    module.controller('EditContactController', ['$scope', '$routeParams', 'ContactDataService', function($scope, $routeParams, contactDataService) {
        if ($routeParams.id) {
            $scope.contact = contactDataService.getOne(parseInt($routeParams.id));
            console.log($scope.contact);
        } else {
            $scope.contact = {};
        }

        $scope.save = function() {
            contactDataService.editOne($routeParams.id, $scope.contact);
        }
    }]);
})();