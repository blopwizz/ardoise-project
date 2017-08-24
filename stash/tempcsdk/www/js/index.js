var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        // handler for ui image editor launch button
        document.getElementById('launch-editor').addEventListener('click', this.launchEditor, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // helper function to launch image editor
    launchEditor: function () {
        // prep work for calling .edit()
        function success(newUrl) {
            console.log("Success!", newUrl);
        }

        function error(error) {
            console.log("Error!", error);
        }

        var imageUrl = "https://s-media-cache-ak0.pinimg.com/originals/d5/09/28/d50928c6e731c793b2744d2157627038.jpg";

        var options = {
            outputType: CSDKImageEditor.OutputType.JPEG,
            tools: [
                CSDKImageEditor.ToolType.STICKERS,
                CSDKImageEditor.ToolType.TEXT,
                CSDKImageEditor.ToolType.OVERLAYS
            ],
            quality: 50
        };

        // launch image editor
        CSDKImageEditor.edit(success, error, imageUrl, options);
    }
};
