var list0Pager = Phink.MVC.Controller.create()
.oninit(function (){
    this.index = '1';
    this.count = '0';
    this.index = (parseInt(this.index)) ? parseInt(this.index) : 1;
    this.count = (parseInt(this.count)) ? parseInt(this.count) : 20;
            
})
.actions({
    fastLeft : function() {
        this.index--;
        this.index = (this.index < 1) ? 1 : this.index;
        solPlayer.getData(this.count, this.index, '#pagerpageNum');
    }
    , fastRight : function() {
        this.index++;
        this.index = (this.index > 999) ? 1 : this.index;
        solPlayer.getData(this.count, this.index, '#pagerpageNum');        
    }
    , leftLimit : function() {
        this.index = 1;
        solPlayer.getData(this.count, this.index, '#pagerpageNum');        
    }
    , rightLimit : function() {
        this.index = 999;
        solPlayer.getData(this.count, this.index, '#pagerpageNum');        
    }
});

