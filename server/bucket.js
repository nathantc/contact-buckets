var data = require('./dataStore').data();

exports.getAll = function(req, res) {
    res.send(data.buckets);
}

function getBucketIndexId(id) {
    for (var i = 0; i < data.buckets.length; i++) {
        if (data.buckets[i].id === id) {
            return i;
        }
    }
    return -1;
}

function getBucketById(id) {
    var index = getBucketIndexId(id);
    if (index >= 0) {
        return data.buckets[index];
    } else {
        return {};
    }
}

exports.getOne = function(req, res) {
    res.send(getBucketById(req.params.id));
}

exports.create = function(req, res) {
    var id = new Date().getTime();
    req.body.id = id;
    data.buckets.push(req.body);
    res.send(req.body);
}

exports.edit = function(req, res) {
    var index = getBucketIndexId(req.params.id);
    if (index >= 0) {
        data.buckets[index] = req.body;
        data.contacts[index].id = req.params.id;
        res.send(data.buckets[index]);
    } else {
        res.send('Contact not found', 404);
    }
}

exports.delete = function(req, res) {
    var index = getBucketIndexId(req.params.id);
    if (index >= 0) {
        res.send(data.buckets.splice(index, index).pop());
        for (var i=0; i < data.contacts.length; i++) {
            if (data.contacts[i].bucketId === req.params.id) {
                data.contacts[i].bucketId = null;
            }
        }
    } else {
        res.send('Contact not found', 404);
    }
}
