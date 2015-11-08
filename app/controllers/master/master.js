function logout() {
    $.jPhoenix.getView('login.html', 'logout', '#core');

    
    
//    $.jPhoenix.getJSON("login.html"
//        , {"action" : 'logout'}
//        , function(data) {
//        try {
//            $.jPhoenix.getView('login.html');
//        }
//        catch(e) {
//            debugLog(e);
//        }
//    });       
    
}
