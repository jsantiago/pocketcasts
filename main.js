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
var player = document.getElementById("player");
player.addEventListener('loadstop', function(){
    // Add custom style
    player.insertCSS({
        file: "player.css"
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
