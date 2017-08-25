$(document).ready(function() {
	/* initialize the external events
	-----------------------------------------------------------------*/

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


	/* initialize the calendar parameters
	-----------------------------------------------------------------*/
	$('#calendar').fullCalendar({
		theme: true,
		buttonText: {
			prev: '<',
			next: '>'
		},
		defaultView: 'agendaWeek',
		header: {
			left: 'prev,next, today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		nowIndicator: true,
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar
		eventRender: function(event, element, view) {
			if (view.name == 'listDay') {
				element.find(".fc-list-item-time").append("<span class='closeon'>X</span>");
			} else {
				element.find(".fc-content").prepend("<span class='closeon'>X</span>");
			}
			element.find(".closeon").on('click', function() {
				$('#calendar').fullCalendar('removeEvents',event._id);
			});
		}
	});
});

