var main = (new TController()).actions({
    onload : function () {
        //this.origin = TRegistry.item('main').origin + '/';
        this.getView('home.html');
    }
});
