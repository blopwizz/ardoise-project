// action for button in edit page
$(document).ready(function() {
	var socket = io();

	socket.on('update: database to edit.html', function(events) {
		$('#calendar').fullCalendar('removeEvents');
		$('#calendar').fullCalendar('addEventSource', events);
	});

	$('#save-btn-container > button').click(function(e) {
		e.preventDefault();
		var now = moment();
		// Read events from client calendar
		var events_ = $('#calendar').fullCalendar('clientEvents');
		var events_ = formatFullcalendarEventsToObject(events_);
		socket.emit('request: save events', events_);
	});
});


function formatFullcalendarEventsToObject(fc_events) {
	var eventsObject = [];
	for (var i=0; i<fc_events.length; i++) {
		var newEntry = {};
		var mStart = fc_events[i].start;
		var mEnd;
		if (fc_events[i].end == undefined) {
			mEnd = mStart.clone();
			mEnd.add(2, 'hours');
		}
		else {
			mEnd = fc_events[i].end;
		}
		newEntry.title = fc_events[i].title;
		newEntry.start = mStart.format();
		newEntry.end = mEnd.format();
		eventsObject.push(newEntry);
	}
	return eventsObject;
}