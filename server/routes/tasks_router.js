var express = require('express');
var router = express.Router();

var pg = require('pg');
var config = {
  database: 'deneb', //<--Name of db we're connecting to
  host: 'localhost', // where is your db?
  port: 5432, // the port number for your db (5432 is default)
  max: 10, // max number of connections that can happen at one time (10 is recommended)
  idleTimeoutMillis: 5000 // Close idle client connections to db after 5 seconds 
}

var pool = new pg.Pool(config);


//GET route: sends data to client.js from "ToDo" table when document is ready and when user adds new task
router.get('/', function (req, res) {

    pool.connect(function(errorConnectingToDb, db, done) {
        if(errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.send(500);
        } else {
            var queryText = 'SELECT * FROM "ToDo";';
            db.query(queryText, function(errorMakingQuery, result) {
                done();
                if(errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(result.rows);
                }
            }) //END QUERY
        }
    }); //End pool
}) //End GET route

//POST route: sends task entered by user to database when 'Add Task' button is clicked
router.post('/', function (req, res) {
    var newTask = req.body;
    console.log('task:', req.body);
    console.log(newTask.taskName);
    pool.connect(function(errorConnectingToDb, db, done) {
        if(errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.send(500);
        } else {
            var queryText = 'INSERT INTO "ToDo" ("taskName", "completed") VALUES ($1, $2);';
            db.query(queryText, [newTask.taskName, newTask.completed], function(errorMakingQuery, result) {
                done();
                if(errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(201);
                }
            }) //END QUERY
        }
    }); //End pool
    }) //End POST route

    //PUT route: 
router.put('/:id', function (req, res) {
    var id = req.params.id;
    pool.connect(function(errorConnectingToDb, db, done) {
        if(errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.send(500);
        } else {
            var queryText = 'UPDATE "ToDo" SET "completed" = true WHERE "id" = $1';
            db.query(queryText, [id], function(errorMakingQuery, result) {
                done();
                if(errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(201);
                }
            }) //END QUERY
        }
    }); //End pool
    }) //End PUT route

    //DELETE route: 
    router.delete('/:id', function (req, res) {
        var id = req.params.id;
        pool.connect(function(errorConnectingToDb, db, done) {
            if(errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.send(500);
            } else {
                var queryText = 'DELETE FROM "ToDo" WHERE "id" = $1';
                db.query(queryText, [id], function(errorMakingQuery, result) {
                    done();
                    if(errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.send(500);
                    } else {
                        res.sendStatus(201);
                    }
                }) //END QUERY
            }
        }); //End pool
        }) //End DELETE route

module.exports = router