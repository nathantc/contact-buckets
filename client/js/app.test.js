describe('ContactBuckets', function() {

    describe('Module configuration', function() {

        var module, dependencies;
        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        };

        beforeEach(function() {
            module = angular.module('ContactBuckets');
            dependencies = module.value('appName').requires;
        });

        it('should be registered', function() {
            expect(module).toBeDefined();
        });

        it('should have ContactDataModule as a dependency', function() {
            expect(hasModule('ContactDataModule')).toEqual(true);
        });

    });

    describe('ContactController', function() {

        var contactDataService, _controller, _scope;

        beforeEach(function() {
            angular.mock.module('ContactBuckets');
            inject(function($rootScope, $controller, ContactDataService) {
                contactDataService = ContactDataService;
                _controller = $controller;
                _scope = $rootScope.$new();
            });
        });

        describe('Initializing controller', function() {

            var contacts = [{id: 1, firstName: 'Joe'}, {id: 2, firstName: 'Nate'}];

            beforeEach(function() {
                spyOn(contactDataService, 'getAll').andReturn(contacts)
                _controller('ContactController', {$scope: _scope, ContactDataService: contactDataService});
            });

            it('retrieves contact data', function() {
                expect(_scope.contacts).toBe(contacts);
            });

            it('assigns delete function', function() {
                expect(_scope.delete).toBe(contactDataService.delete);
            })
        });
    });

    describe('EditContactController', function() {

        var contactDataService, _controller, _scope;

        beforeEach(function() {
            angular.mock.module('ContactBuckets');
            inject(function($rootScope, $controller, ContactDataService) {
                contactDataService = ContactDataService;
                _controller = $controller;
                _scope = $rootScope.$new();
            });
        });

        describe('editing a new contact', function() {
            beforeEach(function() {
                _controller('EditContactController', {$scope: _scope, $routeParams: {}, ContactDataService: contactDataService});
            });

            it('initializes empty contact', function() {
                expect(_scope.contact).toEqual({});
            })
        });

        describe('editing an existing contact', function() {
            var data = {
                id: 1,
                firstName: 'Joe',
                lastName: 'Ross',
                phone: '555.123.4455',
                email: 'joe@awesome.com',
                group: 'Awesome',
                avatarUrl: 'http://awesome-avatar/joe'
            };

            beforeEach(function() {
                spyOn(contactDataService, 'getOne').andReturn(data);
                spyOn(contactDataService, 'editOne');
                _controller('EditContactController', {$scope: _scope, $routeParams: {id: 1}, ContactDataService: contactDataService});
            });

            it('initializes empty contact', function() {
                expect(_scope.contact).toBe(data);
            });

            it('saves contact data', function() {
                _scope.contact.group = 'New Group';
                _scope.save();
                expect(contactDataService.editOne).toHaveBeenCalledWith(1, _scope.contact);
            });
        });

    });

    describe('RouteProvider', function() {

        var routes;
        beforeEach(function() {
            angular.mock.module('ContactBuckets');
            inject(function($route) {
                routes = $route.routes;
            });
        });

        it('should contain /contacts route', function() {
            var route = routes['/contacts'];
            expect(route).toBeDefined();
            expect(route.controller).toEqual('ContactController');
            expect(route.templateUrl).toEqual('contacts.html');
        });

        it('should contain /edit route', function() {
            var route = routes['/edit'];
            expect(route).toBeDefined();
            expect(route.controller).toEqual('EditContactController');
            expect(route.templateUrl).toEqual('edit-contact.html');
        });

        it('should contain /edit route', function() {
            var route = routes['/edit/:id'];
            expect(route).toBeDefined();
            expect(route.controller).toEqual('EditContactController');
            expect(route.templateUrl).toEqual('edit-contact.html');
        });
    });

});
