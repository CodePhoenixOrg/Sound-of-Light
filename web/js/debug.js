$(document).ready(function () {
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id', 'debug');
    body.appendChild(div);
    div.innerHTML = '*** DEBUG ***';
});