var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks_router.js');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/tasks', tasks)


app.listen(port, function() {
    console.log('listening on port', port);
})

