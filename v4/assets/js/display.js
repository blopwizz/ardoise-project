$(document).ready(function() {
	var socket = io();
	socket.on('update display', function(data) {	
		var activeEvent;
		var currentEvents = data[0];
		var n = currentEvents.length;
		var links = data[1]; 
		var nLinks = links.length;
		var urlSource = '/html/default.html';
		if (currentEvents.length > 0) {
			activeEvent = currentEvents[0];
			for (var i = 0; i < nLinks; i++) {
				if (links[i].title == activeEvent.title) {
					urlSource = links[i].url + '/embed';
				}
			}
		}
		$('#iframe1').attr('src', urlSource);
	});
});