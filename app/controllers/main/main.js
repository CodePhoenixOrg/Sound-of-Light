var APP_NAME = "sol";
var sol = null;
var solMain = null;
var solHost = (window.location.href.indexOf('localhost') > -1) ? 'localhost:8000' : 'sol.loc';
Phink.DOM.ready(function () {

    sol = TWebApplication.create(solHost);
    sol.main = sol.createView('main');
    solMain = sol.createController(sol.main, 'sol.main')
    .actions({
        goHome: function () {
            solMain.getSimpleView('master.html', function (data) {
                $(document.body).html(data.view);
                solMain.getSimpleView('home.html', function (data) {
                    $('#homeContent').html(data.view);
                });
            });
        }
    })
    .onload(function () {
        solMain = this;
        this.goHome();
        //ladminIndex.bindEvents();
    });
});