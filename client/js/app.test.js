describe('ContactBuckets', function() {

    beforeEach(function() {
        angular.mock.module('ContactBuckets');
    });

    describe('ContactService', function() {

        var contactService,
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
                contactService = $injector.get('ContactService')
            });
            contactService.init(data);
        });

        it('contactService should be defined', function() {
            expect(contactService).toBeDefined();
        });

        describe('getAll', function() {

            it('returns all contacts', function() {
                expect(contactService.getAll()).toEqual(data);
            });
        });

        describe('getOne', function() {

            it('returns contact by id', function() {
                expect(contactService.getOne(joe.id)).toEqual(joe);
                expect(contactService.getOne(dave.id)).toEqual(dave);
            });

            it('returns empty object when id does not exist', function() {
                expect(contactService.getOne(-1)).toEqual({});
            });
        });

        describe('editOne', function() {

            var id, data, expected;

            it('replaced the object with new object', function() {
                id = 1;
                data = { firstName: 'Joe', lastName: 'Updated' };

                contactService.editOne(id, data);

                expected = { id: 1, firstName: 'Joe', lastName: 'Updated' };
                expect(contactService.getOne(id)).toEqual(expected);
            });

            it('returns the edited object', function() {
                id = 1;
                data = { firstName: 'Joe', lastName: 'Updated' };

                expected = { id: 1, firstName: 'Joe', lastName: 'Updated' };
                expect(contactService.editOne(id, data)).toEqual(expected);
            });

            it('returns empty object if id does not exist', function() {
                id = -1;
                data = { firstName: 'Joe', lastName: 'Updated' };
                expect(contactService.editOne(id, data)).toEqual({});
            });
        });

        describe('postOne', function() {
            var data, expected;

            it('returns the posted data with a new id', function() {
                data = { firstName: 'new', lastName: 'guy' };
                expect(contactService.postOne(data).id).toBeDefined();
            });

            it('add the data to contact list', function() {
                data = { firstName: 'new', lastName: 'guy' };
                var contact = contactService.postOne(data);

                expect(contactService.getOne(contact.id)).toEqual(contact);
            });
        });

        describe('delete', function() {

            it('returns the deleted object', function() {
                expect(contactService.delete(nate.id)).toEqual(nate);
            });

            it('removes the deleted object from data', function() {
                contactService.delete(nate.id);
                expect(contactService.getOne(nate.id)).toEqual({});
            });

            it('returns empty object if id does not exist', function() {
                expect(contactService.delete(-1)).toEqual({});
            });
        })
    });
});
