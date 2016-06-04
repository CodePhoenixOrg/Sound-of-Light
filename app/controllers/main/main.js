//sol = TWebApplication.create('www.sol.loc');
//sol.main = sol.createView('main');

sol.createController(sol.main, 'sol.main')
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

