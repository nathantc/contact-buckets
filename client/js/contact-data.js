(function() {

    var module = angular.module('ContactDataModule', []);

    module.service('ContactDataService', function() {
        var contacts = [
            {
                id: 1,
                firstName: 'Joe',
                lastName: 'Ross',
                phone: '555.123.4455',
                email: 'joe@awesome.com',
                group: 'Awesome',
                avatarUrl: 'http://awesome-avatar/joe'
            },
            {
                id: 2,
                firstName: 'Nate',
                lastName: 'Carver',
                phone: '555.123.6677',
                email: 'nate@awesome.com',
                group: 'Awesome',
                avatarUrl: 'http://awesome-avatar/nate'
            }];

        this.init = function(data) {
            contacts = data;
        }

        this.getAll = function() {
            return contacts;
        }

        this.getOne = function(id) {
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].id === id) {
                    return contacts[i];
                }
            }
            return {};
        }

        this.editOne = function(id, contact) {
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].id === id) {
                    contact.id = id;
                    return contacts[i] = contact;
                }
            }
            return {};
        }

        this.postOne = function(contact) {
            contact.id = new Date().getTime();
            contacts.push(contact);
            return contact;
        }

        this.delete = function(id) {
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].id === id) {
                    return contacts.splice(i,1)[0];
                }
            }
            return {};
        }
    });

})();