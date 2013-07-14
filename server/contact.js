var data = require('./dataStore').data();

exports.getAll = function(req, res) {
    res.send(data.contacts);
}

function getContactIndexId(id) {
    for (var i = 0; i < data.contacts.length; i++) {
        if (data.contacts[i].id == id) {
            return i;
        }
    }
    return -1;
}

function getContactById(id) {
    var index = getContactIndexId(id);
    if (index >= 0) {
        return data.contacts[index];
    } else {
        return {};
    }
}

exports.getOne = function(req, res) {
    res.send(getContactById(req.params.id));
}

exports.create = function(req, res) {
    var contact = req.body;
    contact.id = new Date().getTime();
    data.contacts.push(contact);
    res.send(contact);
}

exports.edit = function(req, res) {
    var index = getContactIndexId(req.params.id);
    if (index >= 0) {
        data.contacts[index] = req.body;
        data.contacts[index].id = req.params.id;
        res.send(data.contacts[index]);
    } else {
        res.send('Contact not found', 404);
    }
}

exports.delete = function(req, res) {
    var index = getContactIndexId(req.params.id);
    if (index >= 0) {
        res.send(data.contacts.splice(index, index).pop());
    } else {
        res.send('Contact not found', 404);
    }
}
