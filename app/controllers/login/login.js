var solLogin = sol.extendsController(sol.main, 'sol.login', {
    onload : function() {
        $('#authenticate').on('click', function() {
            solLogin.authenticate();
        })

    }
    , authenticate : function () {
        var pageName = 'login.html';

        //this.origin = TRegistry.item('/login.html').origin + '/';
        solLogin.origin = TRegistry.getOrigin();
        this.origin = TRegistry.getOrigin();
        //(solLogin.origin !== undefined) ? solLogin.origin + '/' + pageName : 
        var the = this;
        console.log(the);

        solLogin.getJSON(pageName, {
            "action" : 'authenticate'
            ,"login" : $("#login").val()
            ,"password" : $("#password").val()
            ,"container" : '#homeContent'
        }
        , function(data) {
            try {
                if(data.return === 200) {

                    the.parseViewResponse(data.master, function(resp) {
                        TUtils.html64(document.body, resp.view);
                        the.parseViewResponse(data.page, function(resp) {
                            TUtils.html64(data.container, resp.view);
//                            solHome.render();
                        });
                    });

                    //$.jPhink.getScripts(data);
                } else if(data.return === 403) {
                    $('#message').html('Login error');
                } else if(data.return === 202) {
                    //the.attachView('master.html', document.body, function(data) {
                    the.getSimpleView('master.html', function(data) {
                        $('body').html(data.view);
                        the.getSimpleView('home.html', function(data) {
                            $('#homeContent').html(data.view);
                            
//                            solHome.render();
                        })
                    });
                }
            }
            catch(e) {
                debugLog(e);
            }
        });       

        return false;
    }
});