var APP_NAME = "sol";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sol = null;

$(document).ready(function() {
    var host = (window.location.href.indexOf('localhost') > -1) ? 'localhost:8000' : 'www.sol.loc';
    sol = TWebApplication.create(host);
    sol.main = sol.includeView('main');
});

