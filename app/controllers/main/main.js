//phox = TWebApplication.create('www.phox.loc');
//phox.main = phox.createView('main');

phox.createController(phox.main, 'phox.main')
.onload(function () {
        //this.origin = TRegistry.item('main').origin + '/';
        var the = this;
        the.getView('master.html', function(data) {
            $(document.body).html(data.view);
            the.getView('home.html', function(data) {
                $('#homeContent').html(data.view);
            })
        });
    }
 
);

