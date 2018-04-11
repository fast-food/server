var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: true }));
const filepath = __dirname + "/" + "food.json";

app.get('/food', function (req, res) {
    console.log("requested: /food");
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (!err) {
            res.end(data);
        }
        else{
            res.status(500).send("Could not get data");
        }
    });
})

app.get('/sandwich', function (req, res) {
    console.log("requested: /sandwich");
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            res.end(JSON.stringify(data.sandwich));
        }
        else{
            res.status(500).send("Could not get data");
        }
    });
})

app.get('/sandwich/:id', function (req, res) {
    console.log("requested: /sandwich/:id");
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            var id = req.params.id;
            var found = false;
            for(var i in data.sandwich) {
               if(data.sandwich[i].id == id) {
                  res.end(JSON.stringify(data.sandwich[i]));
                  found = true;
               }
            }

            if(!found){
                res.status(500).send("id does not exist");
            }
        }
        else{
            res.status(500).send("Could not get data");
        }
    });
})

app.get('/extra', function (req, res) {
    console.log("requested: /extra");
    fs.readFile(filepath, 'utf8', function (err, data) {
        if(!err) {
            data = JSON.parse(data);
            res.end(JSON.stringify(data.extra));
        }
        else{
            res.status(500).send("Could not get data");
        }
    });
})

app.get('/drink', function (req, res) {
    console.log("requested: /drink");
    fs.readFile(filepath, 'utf8', function (err, data) {
        if(!err) {
            data = JSON.parse(data);
            res.end(JSON.stringify(data.drink));
        }
        else{
            res.status(500).send("Could not get data");
        }
    });
})

app.post('/addSandwich', function (req, res) {
    console.log("requested: /addSandwich");
    if(req.body.hasOwnProperty('name')){
        var name = req.body.name;
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (!err) {
                data = JSON.parse(data);
                var index = Object.keys(data.sandwich).length - 1;
                var id = data.sandwich[index].id + 1;
                data.sandwich.push({"id":id, "name":name});
                fs.writeFile(filepath, JSON.stringify(data, null, 4), 'utf8', function (err) {
                    if(!err) {
                        res.end();
                    }
                    else{
                        res.status(500).send("Could not write data");
                    }
                });
            }
            else{
                res.status(500).send("Could not read data");
            }
        });
    }
    else{
        res.status(500).send("You must specify a \"name\"");
    }
})

app.post('/addExtra', function (req, res) {
    console.log("requested: /addExtra");
    if(req.body.hasOwnProperty('name')){
        var name = req.body.name;
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (!err) {
                data = JSON.parse(data);
                var index = Object.keys(data.extra).length - 1;
                var id = data.extra[index].id + 1;
                data.extra.push({"id":id, "name":name});
                fs.writeFile(filepath, JSON.stringify(data, null, 4), 'utf8', function (err) {
                    if(!err) {
                        res.end();
                    }
                    else{
                        res.status(500).send("Could not write data");
                    }
                });
            }
            else{
                res.status(500).send("Could not read data");
            }
        });
    }
    else{
        res.status(500).send("You must specify a \"name\"");
    }
})

app.post('/addDrink', function (req, res) {
    console.log("requested: /addDrink");
    if(req.body.hasOwnProperty('name')){
        var name = req.body.name;
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (!err) {
                data = JSON.parse(data);
                var index = Object.keys(data.drink).length - 1;
                var id = data.drink[index].id + 1;
                data.drink.push({"id":id, "name":name});
                fs.writeFile(filepath, JSON.stringify(data, null, 4), 'utf8', function (err) {
                    if(!err) {
                        res.end();
                    }
                    else{
                        res.status(500).send("Could not write data");
                    }
                });
            }
            else{
                res.status(500).send("Could not read data");
            }
        });
    }
    else{
        res.status(500).send("You must specify a \"name\"");
    }
})

var server = app.listen(8080, function () {
    var port = server.address().port
    console.log("Server listening at http://127.0.0.1:%s", port)
})
