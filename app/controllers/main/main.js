var main = (new TController()).actions({
    onload : function () {
        //this.origin = TRegistry.item('main').origin + '/';
        var the = this;
        the.getView('master.html', function(data) {
            TRegistry.item('master').view = data.view;
            $('#mainContent').html(data.view);
            the.getView('home.html', function(data) {
                TRegistry.item('home').view = data.view;
                $('#homeContent').html(data.view);
            })
        });
    }
});
