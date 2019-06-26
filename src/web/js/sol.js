var sol = null;
var solHost = (window.location.href.indexOf('localhost') > -1) ? 'localhost:80' : 'www.sol.loc';
Phink.DOM.ready(function () {

    sol = Phink.Web.Application.create(solHost, 'sol');
    sol.createView('main');

    var mainCtrl = sol.createController('main', 'main')
    .actions({
        goHome: function () {
            mainCtrl.getSimpleView('master.html', function (data) {
                $(document.body).html(data.view);
                mainCtrl.attachView('home.html', '#homeContent');
            });
        }
    })
    .onload(function () {
        mainCtrl = this;
        mainCtrl.goHome();
        // ladminAccess.bindEvents();
    });
});
