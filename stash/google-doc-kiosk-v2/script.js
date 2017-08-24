var refreshMinutes = 4*4/60;

var timer=setInterval(function(){refreshFrame()}, refreshMinutes*60*1000);
function refreshFrame()
{
	var iframe = document.getElementById('presentFrame');
	var iframeURL = iframe.src;
	iframe.src = iframeURL;
}