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


//GET route: sends data from "ToDo" table when document is ready and when user adds new task
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




module.exports = router