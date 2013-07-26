describe('ContactDataModule', function() {

    beforeEach(function() {
        angular.mock.module('ContactDataModule');
    });

    describe('ContactDataService', function() {

        var contactDataService,
            joe = {
                id: 1,
                firstName: 'Joe',
                lastName: 'Ross',
                phone: '555.123.4455',
                email: 'joe@awesome.com',
                group: 'Awesome',
                avatarUrl: 'http://awesome-avatar/joe'
            },
            nate = {
                id: 2,
                firstName: 'Nate',
                lastName: 'Carver',
                phone: '555.123.6677',
                email: 'nate@awesome.com',
                group: 'Awesome',
                avatarUrl: 'http://awesome-avatar/nate'
            },
            dave = {
                id: 3,
                firstName: 'Dave',
                email: 'dave@not-awesome.com',
                group: 'Not Awesome'
            },
            data = [joe, nate, dave];

        beforeEach(function() {
            inject(function($injector) {
                contactDataService = $injector.get('ContactDataService')
            });
            contactDataService.init(data);
        });

        it('contactService should be defined', function() {
            expect(contactDataService).toBeDefined();
        });

        describe('getAll', function() {

            it('returns all contacts', function() {
                expect(contactDataService.getAll()).toEqual(data);
            });
        });

        describe('getOne', function() {

            it('returns contact by id', function() {
                expect(contactDataService.getOne(joe.id)).toEqual(joe);
                expect(contactDataService.getOne(dave.id)).toEqual(dave);
            });

            it('returns empty object when id does not exist', function() {
                expect(contactDataService.getOne(-1)).toEqual({});
            });
        });

        describe('editOne', function() {

            var id, data, expected;

            it('replaced the object with new object', function() {
                id = 1;
                data = { firstName: 'Joe', lastName: 'Updated' };

                contactDataService.editOne(id, data);

                expected = { id: 1, firstName: 'Joe', lastName: 'Updated' };
                expect(contactDataService.getOne(id)).toEqual(expected);
            });

            it('returns the edited object', function() {
                id = 1;
                data = { firstName: 'Joe', lastName: 'Updated' };

                expected = { id: 1, firstName: 'Joe', lastName: 'Updated' };
                expect(contactDataService.editOne(id, data)).toEqual(expected);
            });

            it('returns empty object if id does not exist', function() {
                id = -1;
                data = { firstName: 'Joe', lastName: 'Updated' };
                expect(contactDataService.editOne(id, data)).toEqual({});
            });
        });

        describe('postOne', function() {
            var data, expected;

            it('returns the posted data with a new id', function() {
                data = { firstName: 'new', lastName: 'guy' };
                expect(contactDataService.postOne(data).id).toBeDefined();
            });

            it('add the data to contact list', function() {
                data = { firstName: 'new', lastName: 'guy' };
                var contact = contactDataService.postOne(data);

                expect(contactDataService.getOne(contact.id)).toEqual(contact);
            });
        });

        describe('delete', function() {

            it('returns the deleted object', function() {
                expect(contactDataService.delete(nate.id)).toEqual(nate);
            });

            it('removes the deleted object from data', function() {
                contactDataService.delete(nate.id);
                expect(contactDataService.getOne(nate.id)).toEqual({});
            });

            it('returns empty object if id does not exist', function() {
                expect(contactDataService.delete(-1)).toEqual({});
            });
        })
    });
});
