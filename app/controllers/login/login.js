
function authenticate() {
    $.jPhoenix.getJSON("login.html"
        , {
            "action" : 'authenticate'
            ,"login" : $("#login").val()
            ,"password" : $("#password").val()
            ,"container" : '#core'
        }
        , function(data) {
        try {
            window.console.log(data.return);
            if(data.return === 200) {
                $.jPhoenix.html64('#mainContent', data.master);
                $.jPhoenix.html64(data.container, data.page);
                //$.jPhoenix.getScripts(data);
            } else if(data.return === 403) {
                $('#message').html('Login error');
            }
        }
        catch(e) {
            debugLog(e);
        }
    });       
    
    return false;
}
