// action for button in edit page
$(document).ready(function() {
	var socket = io();

	socket.on('update: database to edit.html', function(data) {
		var events_ = data;
		console.log(data);
		$('#calendar').fullCalendar('removeEvents');
		$('#calendar').fullCalendar('addEventSource', events_);
	});

	$('#edit-btn-1').click(function() {
		window.open('https://docs.google.com/presentation/d/1fxsXJw-hBDWb71W44M1j9PNHUntxPmVP-bmITTfI7yg');
	});

	$('#edit-btn-2').click(function() {
		window.open('https://docs.google.com/presentation/d/16u-BUE7Tt67efbies4aH88mJc8ONgUh_d_53DLCU-ec');
	});

	$('#edit-btn-3').click(function() {
		window.open('https://docs.google.com/presentation/d/14vioN3k8Z21chC-dh3faiHNX1kBjX7xbw31JXmpLneM')
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