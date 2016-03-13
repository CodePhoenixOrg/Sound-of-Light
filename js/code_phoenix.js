/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function include(file) {
    var myScript =  document.createElement("script");
    myScript.src = file;
    myScript.type = "text/javascript";
    document.body.appendChild(myScript);
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TRegistry = (function() {
    
    var F = function() {
        this.registry = {};
    }

    F.prototype.write = function(item, key, value) {

        if (this.registry[item] === undefined) {
            this.registry[item] = {};
        }
        this.registry[item][key] = value;

    }

    F.prototype.read = function(item, key, defaultValue) {
        var result = null;

        if (this.registry[item] !== undefined) {
            result = (this.registry[item][key] !== undefined) ? this.registry[item][key] : ((defaultValue !== undefined) ? defaultValue : null);
        }

        return result;
    }

    F.prototype.item = function(item) {
        if(item === '' || item === undefined) return null;

        if(this.registry[item] !== undefined) {
            return this.registry[item];
        } else {
            this.registry[item] = {};
            return this.registry[item];
        }
    }

    F.prototype.clear = function() {
        this.registry = {};
    }
    
    return new F();
})();
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TWebApplication = function() {
    
};

TWebApplication.create = function() {

}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TWebObject = function() {
    this.origin = '';
    this.url = {};
    this.token = '';
};

TWebObject.prototype.setOrigin = function(value) {
    this.origin = value;
    
    return this;
}

TWebObject.prototype.getOrigin = function() {
    return this.origin;
}

TWebObject.parseUrl = function (url) {

    console.log('url : ' + url);
    var result = {};

    var protocol = (url.search('http://') > -1) ? 'http' :
        (url.search('https://') > -1) ? 'https' :
        (url.search('ssh://') > -1) ? 'ssh' :
        (url.search('smb://') > -1) ? 'smb' :
        (url.search('ftp://') > -1) ? 'ftp' :
        (url.search('sftp://') > -1) ? 'sftp' :
        (url.search('ftps://') > -1) ? 'ftps' : null;

    var page = window.location.pathname;
    
    if(protocol === null) {
        result.protocol = window.location.protocol;
        result.domain = window.location.hostname;
        result.port = window.location.port;
        //url = window.location.href.substring(0, window.location.href.search('/'));
        page = url;
    }

    var queryString = '';
    if(page.search('/') > -1) {
        queryString = page.substring(page.search('/'));
        url = url.replace(domain, '');
    }
    
    result.page = page; //url.replace('.html', '');
    result.queryString = queryString;

    console.log(result);
    this.url = result;

    return result;
};


TWebObject.prototype.getUrl = function() {
    return this.url;
}

TWebObject.prototype.getJSON = function(
    url, // Url du webService
    postData, // Tableau JSON des données à poster au webserice
    callBack // fonction qui gère le retour du webservice
) {
    //$("body").toggleClass('onLoad');
//        spinner.spin();
    postData.token = this.token;
    
//    var url = TWebObject.parseUrl(url);
//    url = (this.origin !== undefined) ? this.origin + url : url;

    $.ajax({
        type: 'POST',
        url: url,
        data: postData,
        dataType: 'json',
        async: true
    }).done(function(data, textStatus, xhr) {
        try 
        {
            this.token = data.token;
            url = TWebObject.parseUrl(url);
            TRegistry.item(url.page).origin = xhr.getResponseHeader('origin');
            
            if($.isFunction(callBack)) {
                callBack.call(this, data, textStatus, xhr);
            }

        }
        catch(e)
        {
            debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        debugLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + options + "\r\n" +
                "Message : " + message);
    });
};

TWebObject.prototype.getJSONP = function(url, postData, callBack) {
    postData.token = this.token;

    $.ajax({
        type: 'POST',
        url: url + "&callback=?", // retour en JSONP
        data: postData,
        dataType: 'json',
        async: true
    }).done(function(data, textStatus, xhr) {
        try {
            this.token = data.token;
            url = TWebObject.parseUrl(url);
            TRegistry.item(url.page).origin = xhr.getResponseHeader('origin');

            if($.isFunction(callBack)) {
                callBack.call(this, data, textStatus, xhr);
            }
        }
        catch(e) {
            debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        debugLog("Satus : " + xhr.status + "\r\n" +
            "Options : " + options + "\r\n" +
            "Message : " + message);
    });
};


/*
* jQuery getCSS Plugin
* Copyright 2013, intesso
* MIT license.
*
* cross browser function to dynamically load an external css file.
* see: [github page](http://intesso.github.com/jquery-getCSS/)
*
*/

/*
arguments: attributes
attributes can be a string: then it goes directly inside the href attribute.
e.g.: $.getCSS("fresh.css")

attributes can also be an objcet.
e.g.: $.getCSS({href:"cool.css", media:"print"})
or: $.getCSS({href:"/styles/forest.css", media:"screen"})
*/
TWebObject.getCSS = function(attributes) {
    // setting default attributes
    if(typeof attributes === "string") {
        var href = attributes;
        attributes = {
            href: href
        };
    }
    if(!attributes.rel) {
        attributes.rel = "stylesheet"
    }
    // appending the stylesheet
    // no jQuery stuff here, just plain dom manipulations
    var styleSheet = document.createElement("link");
    for(var key in attributes) {
        styleSheet.setAttribute(key, attributes[key]);
    }
    var head = document.getElementsByTagName("head")[0];
        head.appendChild(styleSheet);
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TAlgo = function() {
    TWebObject.call(this);
    
};

TAlgo.prototype = new TWebObject();
TAlgo.prototype.constructor = TAlgo;

TAlgo.create = function() {
    return new TAlgo();
}

TAlgo.prototype.applyTemplate = function(templates, colNum, row, i) {
    var html = row[i];
    var template = templates[i];

    if(template.content !== null && template.enabled) {
        html = template.content;
        var event = template.event;
        var e = event.split('#');
        if(e[0] === 'href') {
            event = 'javascript:' + e[1];
        } else {
            event = e[0] + '="' + e[1] + '"'; 
        }
        for (var m = 0; m < colNum; m++) {
            html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
            event = event.replace(templates[m].name, row[m]);
            html = html.replace('<% &' + templates[m].name + ' %>', event);
        }   
    }

    return html;
}

TAlgo.prototype.dataBind = function(tableId, values, templates) {
    var colNum = templates.length;
    var rowNum = values.length;
    for(var j=0; j < rowNum; j++) {
        var row = JSON.parse(values[j]);
        for (var i=0; i < colNum; i++) {
            var template = templates[i];
            var html = row[i];

            if(template.content !== null && template.enabled) {
                html = template.content;
                var event = template.event;
                var e = event.split('#');
                if(e[0] === 'href') {
                    event = 'javascript:' + e[1];
                } else {
                    event = e[0] + '="' + e[1] + '"'; 
                }
                for (var m = 0; m < colNum; m++) {
                    html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
                    event = event.replace(templates[m].name, row[m]);
                    html = html.replace('<% &' + templates[m].name + ' %>', event);
                }    
            }
            if(template.enabled) {
                $(tableId + 'td' + (i + colNum * j).toString()).html(html);
            }
        }
    }
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TAccordion = function() {
    TAlgo.call(this);
    
    
};

TAccordion.prototype = new TAlgo();
TAccordion.prototype.constructor = TAccordion;

TAccordion.create = function() {
    return new TAccordion();
}


TAccordion.prototype.bind = function(accordionId, names, values, templates, elements) {
    var templateNum = templates.length;
    var colNum = names.length;
    var rowNum = values.length;

    var result = '';
    var html = '';
    var level = 0;
    var row = 0;
    var index = 0;
    var canBind = 0;
    var bound = [false, false, false];

    num = 0;
    var oldValues = Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '!#');

    for(var k = 0; k < templateNum; k++) {
        for(j = 0; j < colNum; j++) {
            if(templates[k].name === names[j]) {
                templates[k].index = j;
            }
        }
    }

    for(var i = 0; i < rowNum; i++) {

        row = (values[i] !== null) ? JSON.parse(values[i]) : Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '&nbsp;');
        for(var j = 0; j < templateNum; j++) {
             if(j === 0) {
                level = 0;
            }
            if(!templates[j].enabled) continue;
            index = templates[j].index;
            canBind = row[index] !== oldValues[j];

            if(!canBind) {
                bound[level] = canBind;
                level++;
                oldValues[j] = row[index];
                continue;
            }
            //html = this.applyTemplate(templates[j], columns, row, names, j);
            //html = this.applyTemplate(templates[j], colNum, row, i);
            html = row[index];

            if(level === 0) {
                if(i > 0) {
                    result += elements[2].closing + elements[0].closing;
                    result += elements[2].closing + elements[0].closing;
                    oldValues = Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '!#');
                }
                result += str_replace('%s', 'blue', elements[0].opening);
                result += elements[1].opening + html + elements[1].closing;
                result += elements[2].opening;
            }
            else if(level === 1) {
                if(i > 0 && !bound[level - 1]) {
                    result += elements[2].closing + elements[0].closing;
                } else {

                }
                result += str_replace('%s', 'odd', elements[0].opening);
                result += elements[1].opening + html + elements[1].closing;
                result += elements[2].opening;
            }
            else if(level === 2) {
                result += str_replace('%s', '', elements[2].opening) + html + elements[2].closing;
            }                
            bound[level] = canBind;
            level++;
            oldValues[j] = row[index];
        }
    }
    result += elements[2].closing;
    result += elements[0].closing;
    result += elements[2].closing;
    result += elements[0].closing;

    $(accordionId).html("&nbsp;");
    $(accordionId).html(result);
}
    
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TTable = function() {
    TAlgo.call(this);
};

TTable.prototype = new TAlgo();
TTable.prototype.constructor = TTable;

TTable.create = function() {
    return new TTable();
}
    
TTable.prototype.bind = function(tableId, values, templates) {
    var colNum = templates.length;
    var rowNum = values.length;
    for(var j=0; j < rowNum; j++) {
        var row = JSON.parse(values[j]);
        for (var i=0; i < colNum; i++) {
            var template = templates[i];
            var html = $.jPhoenix.applyTemplate(templates, colNum, row, i);
            if(template.enabled) {
                $(tableId + 'td' + (i + colNum * j).toString()).html(html);
            }
        }
    }
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TController = function() {
    TWebObject.call(this);
    
    this.view = null;
    this.token = '';
};

TController.prototype = new TWebObject();
TController.prototype.constructor = TController;

TController.create = function() {
    return new TController();
}

TController.prototype.oninit = function (callback) {

    if(typeof callback === 'function') {
        callback.call(this);
    }
    
    return this;
};

TController.prototype.onload = function (callback) {

    if(typeof callback === 'function') {
        callback.call(this);
    }
    
    return this;
};

TController.prototype.render = function () {

    if(typeof this.oninit === 'function') {
        this.oninit();
    }   
    if(typeof this.onload === 'function') {
        this.onload();
    }
};

TController.prototype.actions = function (actions) {

    for(var key in actions) {
        this[key] = actions[key];
    }

    this.render();

    return this;
};

TController.prototype.getView = function (pageName, callback) {

    $.ajax({
        type: 'POST',
        url: (this.origin !== undefined) ? this.origin + pageName : pageName,
        data: {"action" : 'getViewHtml', "token" : this.token},
        dataType: 'json',
        async: true,
        headers: {
            "Accept" : "application/json, text/javascript, request/view, */*; q=0.01"
//            ,   "X-Token:" : myToken
        }
    }).done(function(data, textStatus, xhr) {
        try {
            var url = TWebObject.parseUrl(pageName);
            TRegistry.item(url.page).origin = xhr.getResponseHeader('origin');

            this.token = data.token;

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                $.getScript(data.scripts[i]);
            }

            data.view = base64_decode(data.view);
            if(typeof callback === 'function') {
                callback.call(this, data);
            } else {
                $(document.body).html(data.view);

            }
            
        }
        catch(e) {
            $.jPhoenix.debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        $.jPhoenix.debugLog("Satus : " + xhr.status + "\r\n" +
            "Options : " + options + "\r\n" +
            "Message : " + message);
    });
};

TController.prototype.getPartialView = function (pageName, action, attach, postData, callBack) {

    if(postData === undefined || postData === null) {
        postData = {};
    }

    postData.action = action;
    postData.token = this.token;

    $.ajax({
        type: 'POST',
        url: (this.origin !== undefined) ? this.origin + pageName : pageName,
        data: postData,
        dataType: 'json',
        async: true,
        headers: {
            "Accept" : "application/json, text/javascript, request/partialview, */*; q=0.01"
//            ,   "X-Token:" : myToken
        }
    }).done(function(data, textStatus, xhr) {
        try 
        {
            this.token = data.token;

            var url = TWebObject.parseUrl(pageName);
            TRegistry.item(url.page).origin = xhr.getResponseHeader('origin');

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                $.getScript(data.scripts[i]);
            }

            var html = base64_decode(data.view);
            $(attach).html(html);
            
            if(typeof callBack === 'function') {
                callBack.call(this, data);
            }            
        }
        catch(e)
        {
            $.jPhoenix.debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        $.jPhoenix.debugLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + options + "\r\n" +
                "Message : " + message);
    });
};

TController.prototype.attachWindow = function (pageName, anchor) {
    this.getView(pageName, function(data) {
        if(anchor !== undefined) {
            $(anchor).html(data.view);
        } else {
            $(document.body).html(data.view);
        }
    });
};

TController.prototype.attachView = function (pageName, anchor) {
    var myToken = this.token;
    this.getJSON('' + pageName, {"action" : 'getViewHtml', "token" : myToken}, function(data) {
        try {
            this.token = data.token;

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                $.getScript(data.scripts[i]);
            }

            var html = base64_decode(data.view);
            $(anchor).html(html);                
        }
        catch(e) {
            debugLog(e);
        }
    });           
};


    
TController.prototype.attachIframe = function(id, src, anchor) {
//    var iframe = document.createElement('iframe');
//    iframe.frameBorder = 0;
//    iframe.width = "100%";
//    iframe.height = "100%";
//    iframe.id = id;
//    iframe.setAttribute("src", src);
//    document.getElementById(anchor).appendChild(iframe);

    $(anchor).html('');
    $('<iframe>', {
        src: src,
        id:  id,
        frameborder: 0,
        scrolling: 'no'
    }).appendTo(anchor);

}
var spinnerOptions = {
  lines: 13, // The number of lines to draw
  length: 13, // The length of each line
  width: 4, // The line thickness
  radius: 13, // The radius of the inner circle
  corners: 0, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 2.2, // Rounds per second
  trail: 100, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};

if(!Object.create) {
    Object.create = (function() {
        function F() {}
        
        return function(o) {
            if(arguments.length !== 1) {
                throw new Error('Object.create implementation only accepts one parameter.');
            }
            
            F.prototype = o;
            return new F();
        }
    })()
}





(function($) 
{
    var token;
    
    $.jPhoenix = function() // constructeur obligatoire
    {
    };

    
    $.jPhoenix.getViewEx = function (pageName, action, attach, postData, callBack) {
        
        var myToken = $.jPhoenix.getToken();
        
        if(postData === undefined) {
            postData = {};
        }
        
        postData.action = action;
        postData.token = myToken;

        $.ajax({
            type: 'POST',
            url: pageName,
            data: postData,
            dataType: 'json',
            async: true,
            headers: {
                "Accept" : "application/json, text/javascript, request/view, */*; q=0.01"
//            ,   "Token:" : myToken
            }
        }).done(function(data, textStatus, xhr) {
            try {
                $.jPhoenix.setToken(data.token);

                if($.isFunction(callBack)) {
                    callBack.call(this, data);
                } else {
                    var html = base64_decode(data.view);
                    $(attach).html(html);

                }

            }
            catch(e) {
                debugLog(e);
            }
        }).fail(function(xhr, options, message) {
            debugLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + options + "\r\n" +
                "Message : " + message);
        });
    };
    

    $.jPhoenix.attachViewP = function (pageName, anchor) {
        var myToken = $.jPhoenix.getToken();
        $.jPhoenix.getJSONP('' + pageName, {"action" : 'getViewHtml', "token" : myToken}, function(data) {
            try {
                $.jPhoenix.setToken(data.token);
                var l = data.scripts.length;
                for(i = 0; i < l; i++) {
                    $.getScript(data.scripts[i]);
                }
                
                var html = base64_decode(data.view);
                $(anchor).html(html);
                
            }
            catch(e) {
                debugLog(e);
            }
        });           
    };

    $.jPhoenix.html64 = function(container, html) {
        $(container).html(base64_decode(html));
        //$(container).html(html);
    } 

    $.jPhoenix.selectedValues = function(selectObjectId) {

        var selectedOptions = $('select#' + selectObjectId + ' option:selected');

        var result = $.map(selectedOptions ,function(option) {
            return option.value;
        });    

        return result;
    }

    $.jPhoenix.debugLog = function(message) {
            alert(message);
    }

    $.jPhoenix.phpJsonDecode = function(json)
    {
        if(json === null) return '';
        return json.replace('\"', '', "g").replace("\\u0022", '"', "g").replace("\\u003C", "<", "g").replace("\\u003E", ">", "g").replace("\\/", "/", "g").replace("\\t", '\t', "g").replace("\\r", '\r', "g").replace("\\n", '\n', "g");
    };

    $.jPhoenix.getScripts = function(data) {
        var l = data.scripts.length;
        for(i = 0; i < l; i++) {
            $.getScript(data.scripts[i]);
        }
    }



    $.jPhoenix.bindTriStateCheck = function(parentElement) {
        if($(parentElement).length === 0) return;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            checkBox.click(function() {
                $.jPhoenix.checkNextTriState(checkBox);
            })
       });        
    };
    
    $.jPhoenix.bindBiStateCheck = function(parentElement) {
        if($(parentElement).length === 0) return;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            checkBox.click(function() {
                $.jPhoenix.checkNextBiState(checkBox);
            })
       });        
    };

    $.jPhoenix.checkNextTriState = function (checkBox) {
        var data = checkBox.data('checked');
        switch(data) {
            case 0:
                checkBox.data('checked', 1);
                checkBox.prop('indeterminate', false);
                checkBox.prop('checked', true);                
                break;
            case 1:
                checkBox.data('checked', 2);
                checkBox.prop('indeterminate', true);
                checkBox.prop('checked', true);                
                break;
            case 2:
            default:  
                checkBox.data('checked', 0);
                checkBox.prop('indeterminate', false);
                checkBox.prop('checked', false);
                break;
                // On ne change rien
        }
    }


    $.jPhoenix.checkTriStateByData = function (checkBox, data) {
        switch(data) {
            case 0:
                // unchecked
                checkBox.data('checked', 0);
                checkBox.prop('indeterminate', false);
                checkBox.prop('checked', false);
                break;
            case 1:
                // checked
                checkBox.data('checked', 1);
                checkBox.prop('indeterminate', false);
                checkBox.prop('checked', true);                
                break;
            case 2:
                // indeterminate
                checkBox.data('checked', 2);
                checkBox.prop('indeterminate', true);
                checkBox.prop('checked', true);                
                break;
            case -1:
            default:  
                // On ne change rien
        }
    };
    
    $.jPhoenix.checkNextBiState = function (checkBox) {
        var data = checkBox.data('checked');
        switch(data) {
            case 0:
                // unchecked
                checkBox.data('checked', 1);
                checkBox.prop('indeterminate', true);
                checkBox.prop('checked', true);                
                break;
            case 1:
                checkBox.data('checked', 0);
                checkBox.prop('indeterminate', false);
                checkBox.prop('checked', false);
                // indeterminate
                break;
        }
    }

    $.jPhoenix.checkBiStateByData = function (checkBox, data) {
        
        switch(data) {
            case 1:
                // indeterminate
                checkBox.data('checked', 1);
                checkBox.prop('indeterminate', true);
                checkBox.prop('checked', true);                
                break;
            case 0:
            default:  
                // unchecked
                checkBox.data('checked', 0);
                checkBox.prop('indeterminate', false);
                checkBox.prop('checked', false);
                break;
        }

    };
    
    $.jPhoenix.checkAllTriState = function(parentElement, effect) {
        if($(parentElement).length === 0) return false;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            $.jPhoenix.checkTriStateByData(checkBox, effect);
        });
    };
    
    $.jPhoenix.checkAllBiState = function(parentElement, effect) {
        if($(parentElement).length === 0) return false;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            $.jPhoenix.checkBiStateByData(checkBox, effect);
        });
    };

    $.jPhoenix.selectableInput = function (parentElement) {
        $(parentElement).selectable({
            filter:'label',
            stop: function() {        
                $(".ui-selected input", this).each(function() {
                    //this.checked= !this.checked
                    var checkBox = $(this);
                    $.jPhoenix.checkNextTriState(checkBox);
                });
            }
        });
    };

    $.jPhoenix.selectAll = function (parentElement, functionName) {
        
        if($(parentElement).length === 0) return false;
        alert('parentElement :' + parentElement)        
        
        var callback = window[functionName];
        var checkboxes = $(parentElement).find("input:checkbox");

        alert('checkboxes.length :' + checkboxes.length)        
        
        checkboxes.each(function() {
            var checkBox = $(this);
            checkNextTriState();

            if($.isFunction(callback)) {
                alert('callback :' + functionName)
                callback.call(this, checkBox)
            }

        });
    };
    
    $.jPhoenix.keyValueExists = function(key, value, haystack) {
        var result = -1;
        
        if(haystack.length === 0) return result;
        var first = haystack[0];
        
        if(!first.hasOwnProperty(key)) return result;
        
        for( var k = 0; k < haystack.length; ++k ) {
            if( value === haystack[k][key] ) {
                result = k;
                break;
            }
        }        
        
        return result;
    }
    
    $.jPhoenix.replaceByKeyValue = function(key, value, object, haystack) {
        var result = false;
        
        var index = $.jPhoenix.keyValueExists(key, value, haystack);
        
        if(index > -1) {
            haystack[index] = object ;
            result = true;
        }
        
        return result;
    }
    

})(jQuery);

function escapeDoubleQuotes(phrase) {
    var result = phrase.replace(/\"/g, '&quot;');
    return result;
}

function escapeQuotes(phrase) {
    return phrase.replace(/\'/g, '&apos;');
}

function checkAllBiState(parentElement, data) {
    $.jPhoenix.checkAllBiState(parentElement, data);
}

function checkAllTriState(parentElement, data) {
    $.jPhoenix.checkAllTriState(parentElement, data);
}

function checkNextBiState(checkBox) {
    $.jPhoenix.checkNextBiState(checkBox);
}

function checkNextTriState(checkBox) {
    $.jPhoenix.checkNextTriState(checkBox);
}

function checkBiStateByData(checkBox, data) {
    $.jPhoenix.checkBiStateByData(checkBox, data);
}

function checkTriStateByData(checkBox, data) {
    $.jPhoenix.checkTriStateByData(checkBox, data);
}

function bindBiStateCheck(parentElement) {
    $.jPhoenix.bindBiStateCheck(parentElement);
}

function bindTriStateCheck(parentElement) {
    $.jPhoenix.bindTriStateCheck(parentElement);
}

function selectableInput(parentElement) {
    $.jPhoenix.selectableInput(parentElement);
}

function selectAll(parentElement, functionName) {
    $.jPhoenix.selectAll(parentElement, functionName);
}

function getView(pageName) {
    $.jPhoenix.getView(pageName);
}

function attachView(pageName, anchor) {
    $.jPhoenix.attachView(pageName, anchor);
}

function attachViewP(pageName, anchor) {
    $.jPhoenix.attachViewP(pageName, anchor);
}

function attachWindow(pageName, anchor) {
    $.jPhoenix.attachWindow(pageName, anchor);
}

function attachIframe(id, src, anchor) {
    $.jPhoenix.attachIframe(id, src, anchor);
}

function debugLog(message) {
    $.jPhoenix.debugLog(message);
}
function phpJsonDecode(json) {
    return $.jPhoenix.phpJsonDecode(json);
}

