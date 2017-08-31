// *******************************************************************************
// app.js
// server-side: routing, handling database and socket events
// *******************************************************************************

// Express web app set up with dependencies
var express = require('express');                          // express server
var io = require('socket.io')(http);                       // socket.io real-time event handler	
var low = require('lowdb');                                // local json database
var FileAsync = require('lowdb/storages/file-async');

// create server
var app = express();                                       
var http = require('http').Server(app);                   

//---------------------------------------------------------------------------------
// EXPRESS CONFIGURATION & ROUTING

// routing assets location 
app.use(express.static(__dirname + '/assets'));

// routing client-display.html requests
app.get('/', function (req, res) {
	res.sendFile(__dirname+'/display.html');
})

// routing client-edit.html requests
app.get('/edit', function(req, res) {

	// on loading ...
	io.on('connection', function(socket) {
		// get events from current database state
		var events = db.getState().events;
		// emit events to client-side
		socket.emit('update: database to calendar interface', events);
	});

	// route to 
	res.sendFile(__dirname + '/edit.html');
})

// other routes to access server-side files
app.get('/app.js', function(req, res, next) {
	return res.sendFile(__dirname + '/app.js');
});

app.get('/socket.io.js', function(req, res, next) {
	return res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/socket.io-file-client.js', function(req, res, next) {
	return res.sendFile(__dirname + '/node_modules/socket.io-file-client/socket.io-file-client.js');
});



//----------------------------------------------------------------------------
// DATABASE INITIALIZATION
// Create database instance and start server

var adapter = new FileAsync('db.json');
low(adapter)
  .then(db => {
    db.defaults({ posts: [] })
      .write();
   })
  .then(() => {
    http.listen(3000, () => console.log('listening on port 3000'));
   })

//----------------------------------------------------------------------------
// SOCKET IO SET UP 

io.on('connection', function(socket) {
    // listening for new updates coming from client-side
    socket.on('update: interface to database', function(events_) {

    	db.set('events', events_).write();
    	io.emit('request: refresh display', {});
    });
});