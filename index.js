var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contacts']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//app.get('/', function(req, resp){
    //resp.send('Hello world from index.js');
//});

app.get('/getContactList', function(req, resp){
    //console.log('Recieve the GET request');

    db.contacts.find(function(err, docs){
        //console.log(docs);
        resp.json(docs);
    });
});

app.post('/postContactList', function(req, resp){
    //console.log('post request here');
    //console.log(req.body); 

    db.contacts.insert(req.body, function(err, doc){
        resp.json(doc);
    });
});

app.delete('/deleteContact/:id', function(req, resp){
    var id = req.params.id;
    console.log(id);

    db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        resp.json(doc);
    });
});

app.get('/editContact/:id', function(req, resp){
    var id = req.params.id;

    db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        resp.json(doc);
    });
});

app.put('/updateContact/:id', function(req, resp){
    var id = req.params.id;
    console.log(id);
    db.contacts.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true
    }, function(err, doc){
        resp.json(doc);
    });
});

app.listen(3000);

console.log('Sever running : http://localhost:3000');