(function() {

    var module = angular.module('ContactDataModule', []);

    module.service('ContactDataService', function() {
        var contacts = [];

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