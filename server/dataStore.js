var data = { contacts: [
    {
        id: 1,
        name: 'First Contact',
        bucketId: 1
    },
    {
        id: 2,
        name: 'Second Contact',
        bucketId: 1
    }
], buckets: [
    {
        id: 1,
        name: 'Test Data'
    }]
};

exports.data = function() {
    return data;
}