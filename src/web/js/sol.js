var APP_NAME = "sol";
var sol = null;
var solHost = 'sol.loc';
//var solHost = (window.location.href.indexOf('localhost') > -1) ? 'localhost:8000' : 'sol.loc';
Phink.DOM.ready(function () {

    sol = Phink.Web.Application.create(solHost);
    sol.main = sol.createView('main');

    var solMain = sol.createController(sol.main, 'sol.main')
    .actions({
        goHome: function () {
            solMain.getSimpleView('master.html', function (data) {
                $(document.body).html(data.view);
                solMain.attachView('home.html', '#homeContent');
            });
        }
    })
    .onload(function () {
        solMain = this;
        this.goHome();
        sodminAccess.bindEvents();
    });
});
