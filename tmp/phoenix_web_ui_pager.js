var index = '1';
var count = '20';
index = (parseInt(index)) ? parseInt(index) : 1;
count = (parseInt(count)) ? parseInt(count) : 20;

function fastLeft() {
    index--;
    index = (index < 1) ? 1 : index;
    home.getData(count, index, '#pagerpageNum');
}

function fastRight(){
    index++;
    index = (index > 999) ? 1 : index;
    home.getData(count, index, '#pagerpageNum');        
}

function leftLimit() {
    index = 1;
    home.getData(count, index, '#pagerpageNum');        
}

function rightLimit() {
    index = 999;
    home.getData(count, index, '#pagerpageNum');        
}

