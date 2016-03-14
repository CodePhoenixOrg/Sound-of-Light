var main = TController.create()
.setOrigin(TRegistry.item('/login.html').origin)
.onload(function () {
        //this.origin = TRegistry.item('main').origin + '/';
        var the = this;
        the.getView('master.html', function(data) {
            TRegistry.item('master').view = data.view;
            $(document.body).html(data.view);
            the.getView('home.html', function(data) {
                TRegistry.item('home').view = data.view;
                $('#homeContent').html(data.view);
            })
        });
    }
 
);

