//SoL = TWebApplication.create('www.SoL.loc');
//SoL.main = SoL.createView('main');

SoL.createController(SoL.main, 'SoL.main')
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

