// Handle window resize events
var handleResize = function(){
    var innerBounds = chrome.app.window.current().innerBounds;
    document.getElementById("container").style.height = innerBounds.height + 'px';
    document.getElementById("container").style.width = innerBounds.width + 'px';
};

// Listen for window resize events
chrome.app.window.current().onBoundsChanged.addListener(handleResize);

// Set initial size
handleResize();

// Get webview
var player = document.querySelector('webview');
player.addEventListener('loadstop', function(){
    // Add custom style
    player.insertCSS({
        file: "player.css"
    });
});

// Listen for clicked links
player.addEventListener('newwindow', function(e){
    var targetUrl = e.targetUrl;
    chrome.app.window.create('index.html', {
        hidden: true,
        bounds: {
            height: 750,
            width: 1100
        }
    }, function(appWin){
        appWin.contentWindow.addEventListener('DOMContentLoaded', function(e){
            // Set the source of the <webview>
            var webview = appWin.contentWindow.document.querySelector('webview');
            webview.src = targetUrl;

            // Show the window
            appWin.show();
        });
    });
});

// Listen for media keys
chrome.commands.onCommand.addListener(function(command){
    if (command === 'prev') {
        player.executeScript({
            code: "document.querySelector('.skip_back_button').click();"
        });
    }
    if (command === 'play-pause') {
        player.executeScript({
            code: "document.querySelector('.play_pause_button').click();"
        });
    }
    if (command === 'next') {
        player.executeScript({
            code: "document.querySelector('.skip_forward_button').click();"
        });
    }
});
