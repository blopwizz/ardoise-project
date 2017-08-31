// client side
$(document).ready(function() {
	var socket = io();
	//-----------------------------------------------------------------
	// EXTERNAL EVENTS INITIALIZATION
	// create event when external event is dropped onto the calendar
	$('#external-events .fc-event').each(function() {
		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			title: $.trim($(this).text()), // use the element's text as the event title
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});

	});


	//-----------------------------------------------------------------
	// INITIATE THE CALENDAR
	// (see fullcalendar.io)
	$('#calendar').fullCalendar({	
		theme: true,        // enable custom theme
		nowIndicator: true, // shows an indicator for current date and time 
		editable: true,     // allows events to be stretched and moved
		droppable: true,    // allows things to be dropped onto the calendar
		timezone: 'local',  // local language
		defaultView: 'agendaWeek',

		// buttons : navigation
		buttonText: {prev: '<', next: '>'},
		header: {left: 'prev,next,today', center: 'title', right: 'month,agendaWeek,agendaDay'},

		// button : close event
		eventRender: function(event, element, view) {
			if (view.name == 'listDay') {
				element.find(".fc-list-item-time").append("<span class='closeon'>X</span>");
			} else {
				element.find(".fc-content").prepend("<span class='closeon'>X</span>");
			}
			element.find(".closeon").on('click', function() {
				$('#calendar').fullCalendar('removeEvents', event._id);
			});
		}
	});
});

