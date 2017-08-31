var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var low = require('lowdb');
var FileSync = require("lowdb/adapters/FileSync");
var moment = require('moment');
moment().locale('fr');

// Routes
app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
	io.on('connection', function(socket) {
		socket.emit('update', db.getState());
	});
	res.sendFile(__dirname + '/display.html');
});

app.get('/edit', function(req, res) {

	// on loading 
	io.on('connection', function(socket) {
		var events_ = db.get('events').value();
		socket.emit('update: database to edit.html', events_)
	});

	res.sendFile(__dirname + '/edit.html');
})

app.get('/app', function(req, res, next) {
	return res.sendFile(__dirname + '/app.js');
});

app.get('/app.js', function(req, res, next) {
	return res.sendFile(__dirname + '/app.js');
});

app.get('/socket.io.js', function(req, res, next) {
	return res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

// Create database instance and start server
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({ posts: [] }).write();
http.listen(3000, function() {
	console.log('listening to port 3000 ...');
});

// Sockets
io.on('connection', function (socket) {
	socket.on('request: add', function (data) {
		db.get('posts').push(data).write();
		io.emit('update', db.getState());
	});

	// socket.on('request: reset', function() {
	// 	db.setState({posts: []});
	// 	io.emit('update', db.getState());
	// });

	socket.on('request: save events', function(data) {
		db.set('events', data).write();
	});

	
});

setInterval(function() {calendarUpdate()}, 3000);

function calendarUpdate() {
	var currentEvents = getCurrentEvents();
	if (!(db.get('currentEvents').value().equals(currentEvents))) {
		io.emit('update display', [currentEvents, db.get('links').value()])
	}
	db.set('currentEvents', getCurrentEvents()).write();
}

function getCurrentEvents() {
	var now = moment();
	var events_ = db.get('events').value();
	var currentEvents = [];
	for (var i=0; i<events_.length; i++) {
		var mStart = moment(events_[i].start);
		var mEnd = moment(events_[i].end);
		if (now.isBetween(mStart, mEnd)) {
			currentEvents.push(events_[i]);
		}
	}
	return currentEvents;
}




// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});