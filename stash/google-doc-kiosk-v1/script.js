// update with the desired time to refresh the presentation (in minutes)
	var refreshMinutes = 10/60;
var timer = setInterval(function () {
    refreshFrame()
}, refreshMinutes * 60 * 1000);

function refreshFrame() {
    var iframe = document.getElementById('presentFrame');
    var iframeURL = "https://docs.google.com/presentation/d/1fxsXJw-hBDWb71W44M1j9PNHUntxPmVP-bmITTfI7yg/embed?start=true&loop=true&delayms=4000";
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var container = innerDoc.getElementsByClassName("punch-viewer-nav-v2 punch-viewer-nav-fixed");
    //$('#frame-container').html(container);
}
