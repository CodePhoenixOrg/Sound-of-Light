//sol = TWebApplication.create('www.sol.loc');
//sol.main = sol.createView('main');
var solMain = sol.createController(sol.main, 'sol.main')
.actions({
    goHome : function () {
        solMain.getSimpleView('home.html', function(data) {
            $(document.body).html(data.view);
        })         
    }
    , goHome2 : function () {
        solMain.getSimpleView('master.html', function(data) {
            $(document.body).html(data.view);
            solMain.getSimpleView('home.html', function(data) {
                $('#homeContent').html(data.view);
            })
        });        
    }
})
.onload(function () {
        //this.origin = TRegistry.item('main').origin + '/';
//        var the = this;
//        the.getSimpleView('master.html', function(data) {
//            $(document.body).html(data.view);
//            the.getSimpleView('home.html', function(data) {
//                $('#homeContent').html(data.view);
//            })
//        });
    solMain = this;
    this.goHome2();
    ladminIndex.bindEvents();
});

