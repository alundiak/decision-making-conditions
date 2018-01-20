var express = require('express')
var path = require('path')
var fs = require('fs')
var shell = require('shelljs')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const uuidv4 = require('uuid/v4');

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// app.get('/', function(request, response) {
//     response.sendFile(path.join(__dirname + '/index.html'));
// });

// NOT FINISHED
app.post('/poll', function(request, response) {
	let data = request.body.data;

    const folderName = 'temp_' + uuidv4();
    shell.mkdir(folderName);
    shell.cd(folderName);

    var fileName = 'poll_response.txt';

    fs.writeFile(fileName, data, function(err) {
        if (err) {
            return console.log(err);
        }

        response.send('tbd')
        shell.cd('../');
        shell.rm('-rf', folderName);
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});