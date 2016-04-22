/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    
var cssFiles = [
    "css/bootstrap.css"
    , "css/jquery-ui.css"
    , "css/jquery-ui.structure.css"
    , "css/jquery-ui.theme.css"
//    , "css/jquerysctipttop.css"
//    , "css/multiaccordion.jquery.css"
    , "css/docs.css"
//    , "css/prettify.css"
//    , "css/jumbotron.css"
    , "css/full-slider.css"    
];

var jsFiles = [
      "js/widgets.js"
    , "js/jquery.js"
    , "js/jquery-ui.js"
//    , "js/multiaccordion.jquery.js"
    , "js/bootstrap.js"
    , "js/holder.js"
//    , "js/prettify.js"
    , "js/application.js"
//    , "js/spin.min.js"
    , "js/php.default.min.js"
//    , "js/jphoenix.js"
    , "js/code_phoenix.js"
    , "js/configuration.js"
//    , "js/drag-and-drop.js"
    , "app/controllers/main/main.js"
];

//for(var key in cssFiles) {
//    attributes = {
//          href: cssFiles[key]
//        , rel: "stylesheet"
//    };
//    
//    var styleSheet = document.createElement("link");
//    for(var key in attributes) {
//        styleSheet.setAttribute(key, attributes[key]);
//    }
//    var head = document.getElementsByTagName("head")[0];
//    head.appendChild(styleSheet);    
//}

for(var key in jsFiles) {
    var myInclude =  document.createElement("script");
    myInclude.src = jsFiles[key];
    myInclude.type = "text/javascript";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(myInclude);
}

