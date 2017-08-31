
$(function() {
	var socket = io();
	socket.on('update: database to calendar interface', function(events) {
		$('#calendar').fullCalendar('removeEvents');
		$('#calendar').fullCalendar('addEventSource', events);
	})
});

