var APP_NAME = "sol";
var sol = null;
var solMain = null;
var solHost = (window.location.href.indexOf('localhost') > -1) ? 'localhost:80' : 'sol.loc';
Phink.DOM.ready(function () {

    sol = Phink.Web.Application.create(solHost);
    sol.main = sol.createView('main');
    solMain = sol.createController(sol.main, 'sol.main')
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
        //sodminIndex.bindEvents();
    });
});