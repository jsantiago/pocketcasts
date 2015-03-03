/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(){
    chrome.app.window.create('index.html', {
        id: 'pocketcasts',
        frame: 'none',
        hidden: true,
        bounds: {
            height: 750,
            width: 1100
        }
    }, function(appWin){
        appWin.contentWindow.addEventListener('DOMContentLoaded', function(e){
            // Set source of the <webview>
            var webview = appWin.contentWindow.document.querySelector('webview');
            webview.src = "https://play.pocketcasts.com/web";

            // Show the window
            appWin.show();
        });
    });
});
