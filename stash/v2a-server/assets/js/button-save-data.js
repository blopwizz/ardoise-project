// action for button in edit page
$(document).ready(function() {
	$('#save-btn-container > button').click(function(e) {
		e.preventDefault();

		var socket = io();
		var now = moment();
		var events_ = $('#calendar').fullCalendar('clientEvents');
		var eventsObject = [];
		var currentEventsObject = [];
		

		for (var i=0; i<events_.length; i++) {
			var newEntry = {};
			var newEntryJSON;

			var mStart = events_[i].start;
			var mEnd;
			if (events_[i].end == undefined) {
				mEnd = mStart.clone();
				mEnd.add(2, 'hours');
			}
			else {
				mEnd = events_[i].end;
			}
			
			newEntry.url_slide = events_[i].url_slide;
			newEntry.title = events_[i].title;
			newEntry.start = mStart.format();
			newEntry.end = mEnd.format();
			newEntry.id = events_[i].id;
			eventsObject.push(newEntry);

			if (now.isBetween(mStart, mEnd)) {
				currentEventsObject.push(newEntry);
			}
		}

		console.log(currentEventsObject);
		socket.emit('update: interface to database', eventsObject);
	});

});