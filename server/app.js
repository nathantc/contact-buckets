var express = require('express'),
    app = express(),
    contact = require('./contact'),
    bucket = require('./bucket');

app.use(express.bodyParser());

app.get('/contact', contact.getAll);
app.get('/contact/:id', contact.getOne);
app.post('/contact', contact.create);
app.put('/contact/:id', contact.edit);
app.delete('/contact', contact.delete);

app.get('/bucket', bucket.getAll);
app.get('/bucket/:id', bucket.getOne);
app.post('/bucket', bucket.create);
app.put('/bucket/:id', bucket.edit);
app.delete('/bucket', bucket.delete);

var port = 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
