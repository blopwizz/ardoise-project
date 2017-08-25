// action for button in edit page
$(document).ready(function() {
	$('#save-btn-container > button').click(function(e) {
		console.log('coucou');
		e.preventDefault();
		var socket = io();
		var events_ = $('#calendar').fullCalendar('clientEvents');
		var events = [];

		for (var i=0; i<events_.length; i++) {
			var newEntry = {};
			newEntry.title = events_[i].title;
			newEntry.start = events_[i].start.format();
			if(events_[i].end != undefined) {newEntry.end = events_[i].end.format();}
			newEntry.id = events_[i].id;
			events.push(newEntry);
		}

		console.log(events);

		socket.emit('update: interface to database', events);
	});

});