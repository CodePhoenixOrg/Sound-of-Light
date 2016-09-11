var solDummy = sol.createController(sol.main, 'sol.dummy')
.onload(function() {
    
}
).actions({
    goHome : function (letter) {
        this.getSimpleView('home.html', function(data) {
            $('#homeContent').html(data.view);
        })
    }
});