/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function domReady(f){/in/.test(document.readyState)?setTimeout('domReady('+f+')',9):f()}

function include(file) {
    var myScript =  document.createElement("script");
    myScript.src = file;
    myScript.type = "text/javascript";
    document.body.appendChild(myScript);
};


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
    
    F.prototype.items = function() {
        return this.registry;
    }

    F.prototype.clear = function() {
        this.registry = {};
    }
    
    F.prototype.setToken = function(value) {
        this.registry['token'] = value;
    
        return this;
    };

    F.prototype.getToken = function() {
        return this.registry['token'];
    };

    F.prototype.setOrigin = function(value) {
        this.registry['origin'] = value;
    
        return this;
    };

    F.prototype.getOrigin = function() {
        return this.registry['origin'];
    };

    return new F();
})();/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TUtils = function() {
    
};

TUtils.find = function(haystack, index, needle) {
    var result = [];

    if(haystack.length === 0) return result;
    var first = JSON.parse(haystack[0]);
    if(first.length < index - 1) return result;

    for( var k = 0; k < haystack.length; ++k ) {
        var row = JSON.parse(haystack[k]);
        if( needle == row[index] ) {
            result = row;
            break;
        }
    }        

    return result;
};

/**
 * 
 * @param {type} haystack
 * @param {type} key
 * @param {type} needle
 * @returns {Array|TUtils.grep.haystack}
 */
TUtils.grep = function(haystack, key, needle) {
    var result = [];

    if(haystack.length === 0) return result;
    var first = JSON.parse(haystack[0]);
    if(!first.hasOwnProperty(key)) return result;

    for( var k = 0; k < haystack.length; ++k ) {
        var row = JSON.parse(haystack[k]);
        if( needle == row[key] ) {
            result = row;
            break;
        }
    }        

    return result;
};

TUtils.resizeIframe = function(ui) {
    ui.style.height = ui.contentWindow.document.body.scrollHeight + 'px';
};

TUtils.html64 = function(container, html) {
    $(container).html(base64_decode(html));
};

function debugLog(message) {
    alert(message);
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TObject = function() {
    this.id = '';
    this.name = '';
    this.parent = null;
    
};

TObject.prototype.setId = function(value) {
    this.id = value;
    
    return this;
};

TObject.prototype.getId = function() {
    return this.id;
};

TObject.prototype.setName = function(value) {
    this.name = value;
    
    return this;
};

TObject.prototype.getName = function() {
    return this.name;
};

//TObject.prototype.setParent = function(value) {
//    this.parent = value;
//    
//    return this;
//};

TObject.prototype.getParent = function() {
    return this.parent;
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TUrl = function (url, domain) {

    this.url = url;
    this.isParsed = false;
    
    this.tmpDomain = domain;

    this.port = '80'
    this.page = window.location.pathname;
    this.domain = this.url;
    this.isRelative = false;
    
    this.parse();
    
}

TUrl.prototype.parse = function () {
        
    var result = [];
    
    this.protocol = '';    
    if(this.tmpDomain !== undefined) {
        this.protocol = (this.tmpDomain.search('://') > -1) ? this.tmpDomain.substring(0, this.tmpDomain.search('://') + 1) : '';
    } else {
        this.protocol = (this.url.search('://') > -1) ? this.url.substring(0, this.url.search('://') + 1) : '';
    }
  
    if(this.protocol === '' && this.tmpDomain === undefined) {
        
        this.page = this.url;

        this.isRelative = true;
        this.protocol = window.location.protocol;
        this.domain = window.location.hostname;
        this.port = window.location.port;
        //this.url = window.location.href.substring(0, window.location.href.search('/'));
    } else {
        if(this.protocol === '' && this.tmpDomain !== undefined) {
            this.domain = this.tmpDomain;
            this.protocol = 'http:';
        
        } else {

            if(this.protocol === '') {
                this.protocol = 'http:';
                //throw new Error('Invalid absolute url. Protocol is missing');
            }

            this.url = this.url.replace(this.protocol + '//', '');
            var domainLimit = this.url.search('/');

            if(domainLimit > 0) {
                this.domain = this.url.substring(0, domainLimit);
                this.url = this.url.replace(this.domain, '');
            } else if (this.tmpDomain !== undefined) {
                this.domain = this.tmpDomain;
            } else {
                this.domain = this.url;
                this.url = '/'
            }

            if(this.domain.search(':') > -1) {
                this.port = this.domain.substring(this.domain.search(':'));
                this.url = this.url.replace(':' + this.port, '');
            }

            if(this.domain.search('localhost') > -1) {
                this.domain = 'localhost';
                this.url = this.url.replace(this.domain, '');
            }

        }
        
        this.page = this.url;
        if(this.page.substring(0,1) === '/') {
            this.page = this.page.substring(1);
        }

        this.port = (this.port === '') ? '80' : this.port;
        this.protocol = (this.domain !== '' && this.protocol === '') ? 'http:' : this.protocol;
    }

    var queryString = '';
    if(this.page.search(/\?/) > -1) {
        queryString = this.page.substring(this.page.search(/\?/));
    }
    
    this.queryString = queryString;

    result.isRelative = this.isRelative;
    result.protocol = this.protocol;
    result.domain = this.domain;
    result.port = this.port;
    result.page = this.page;
    result.queryString = this.queryString;

    this.url = result;

    this.isParsed = true;
    
    return result;
};

TUrl.prototype.toString = function urlToString() {
    if(!this.isParsed) {
        this.parse();
    }
    
    var fqPage = (this.queryString !== '') ? this.page + this.queryString : this.page;
    
    return this.protocol + '//' + this.domain + '/' + fqPage;
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TWebObject = function(domain) {
    TObject.call(this);
    
    this.origin = '';
    this.url = {};
    this.token = '';
    this.domain = domain;
};

TWebObject.prototype = new TObject();
TWebObject.prototype.constructor = TWebObject;

TWebObject.prototype.getDomain = function() {
    return this.domain;
};

TWebObject.prototype.setOrigin = function(value) {
    this.origin = value;
    
    return this;
};

TWebObject.prototype.getOrigin = function() {
    return this.origin;
};


TWebObject.prototype.setToken = function(value) {
    this.token = value;
    
    return this;
};

TWebObject.prototype.getToken = function() {
    return this.token;
};

TWebObject.prototype.getPath = function(url, domain) {
    this.url = new TUrl(url, domain);
    return this.url.toString();
};

TWebObject.prototype.getUrl = function() {
    return this.url;
};

TWebObject.prototype.getJSON = function(
    url, // Url du webService
    postData, // Tableau JSON des donn�es � poster au webserice
    callBack // fonction qui g�re le retour du webservice
) {
    //$("body").toggleClass('onLoad');
//        spinner.spin();
    postData.token = TRegistry.getToken();
    this.origin = TRegistry.getOrigin();
    
    var urls = this.getPath(url, this.domain);
    $.ajax({
        type: 'POST',
        url: urls,
        data: postData,
        dataType: 'json',
        async: true
    }).done(function(data, textStatus, xhr) {
        try 
        {
            TRegistry.setToken(data.token);
            TRegistry.setOrigin(xhr.getResponseHeader('origin'));
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
    postData.token = TRegistry.getToken();
    this.origin = TRegistry.getOrigin();
    var urls = this.getPath(url, this.domain);

    $.ajax({
        type: 'POST',
        url: urls + "&callback=?", // retour en JSONP
        data: postData,
        dataType: 'json',
        async: true
    }).done(function(data, textStatus, xhr) {
        try {
            TRegistry.setToken(data.token);
            TRegistry.setOrigin(xhr.getResponseHeader('origin'));

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

TWebObject.prototype.getScript = function (url, callback) {
    var urls = this.getPath(url, this.domain);

    $.getScript(urls)
    .done(function( script, textStatus ) {
        if(typeof callback === 'function') {
            callback.call(this, script, textStatus);
        }
    })
    .fail(function( jqxhr, settings, exception ) {
        debugLog("Satus : " + jqxhr.status + "\r\n" +
            "Options : " + settings + "\r\n" +
            "Message : " + exception);
    });       
}

TWebObject.getCSS = function(attributes) {
    // setting default attributes
    if(typeof attributes === "string") {
        var href = attributes;
        if(this.origin !== undefined) {
            href = this.origin + '/' + href;
        }
        
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
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TWebApplication = function(domain, name) {
    TWebObject.call(this, domain);
    
    this.id = 'app' + Date.now();
    if(name === undefined) {
        name = this.id;
    }
    
    this.name = name;
    //this.domain = domain;
    this.viewCollection = [];
    this.controllerCollection = [];
  
};

TWebApplication.prototype = new TWebObject();
TWebApplication.prototype.constructor = TWebApplication;

TWebApplication.create = function(domain, name) {
    return new TWebApplication(domain, name);
};

TWebApplication.prototype.includeView = function(name) {
    include('app/controllers/' + name + '/' + name + '.js');
    var newView = TView.create(this, name);
    this.addView(newView);
    
    return newView;
};

TWebApplication.prototype.createView = function(name) {
    var newView = TView.create(this, name);
    this.addView(newView);
    
    return newView;
};


TWebApplication.prototype.createController = function(view, name) {
    var newCtrl = TController.create(view, name);
    this.addController(newCtrl);
    
    return newCtrl;
};

TWebApplication.prototype.getViewByName = function(viewName) {
    var result = null;
    
    for(var name in this.viewCollection) {
        if(this.viewCollection[name] !== undefined) {
            result = this.viewCollection[name];
            break;
        }
    }
    
    return result;
}

TWebApplication.prototype.addView = function(view) {
    if(view === undefined) return null;

    if(!(view instanceof TView)) {
        throw new Error('This is not a view');
    } else {
        this.viewCollection[view.getName()] = view;
    }

};

TWebApplication.prototype.addController = function(controller) {
    if(controller === undefined) return null;

    if(!(controller instanceof TController)) {
        throw new Error('This is not a controller');
    } else {
        this.controllerCollection.push(controller);
    }

};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//
var TView = function(application, name) {
    
    TWebObject.call(this);
    
    this.id = 'view' + Date.now();
    this.domain = (application !== undefined) ? application.getDomain() : '';
    this.token = '';
    this.name = name;
    
    this.parent = application;
    
    TRegistry.item(this.domain).view = this;
    
};

TView.prototype = new TWebObject();
TView.prototype.constructor = TView;

TView.create = function(parent, name) {
    return new TView(parent, name);
};

TView.prototype.requestPage = function (pageName, callback) {
    
    var the = this;
    var token = TRegistry.getToken();
    var urls = this.getPath(pageName, this.domain);

    $.ajax({
        type: 'POST',
        url: urls,
        data: {"action" : 'getViewHtml', "token" : token},
        dataType: 'json',
        async: true,
        headers: {
            "Accept" : "application/json, text/javascript, request/view, */*; q=0.01"
        }
    }).done(function(data, textStatus, xhr) {
        try {
//            var url = TWebObject.parseUrl(pageName);
//            TRegistry.item(the.name).origin = xhr.getResponseHeader('origin');
            TRegistry.setOrigin(xhr.getResponseHeader('origin'));
            TRegistry.setToken(data.token);

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                the.getScript(data.scripts[i]);
            }

            data.view = base64_decode(data.view);
            if(typeof callback === 'function') {
                callback.call(this, data);
            } else {
                $(document.body).html(data.view);

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

TView.prototype.requestPart = function (pageName, action, attach, postData, callback) {

    var the = this;
    var token = TRegistry.getToken();
    var urls = this.getPath(pageName, this.domain);

    postData = postData || {};
    
    postData.action = action;
    postData.token = token;

    var the = this;
    $.ajax({
        type: 'POST',
        url: urls,
        data: postData,
        dataType: 'json',
        async: true,
        headers: {
            "Accept" : "application/json, text/javascript, request/partialview, */*; q=0.01"
        }
    }).done(function(data, textStatus, xhr) {
        try 
        {
            TRegistry.setToken(data.token);
            TRegistry.setOrigin(xhr.getResponseHeader('origin'));

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                the.getScript(data.scripts[i]);
            }

            var html = base64_decode(data.view);
            $(attach).html(html);
            
            if(typeof callback === 'function') {
                callback.call(this, data);
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

TView.prototype.parseResponse = function(response, callback) {
    if(response === '') {
        throw new Error('Response is empty !');
    }
    var the = this;
    
    response = base64_decode(response);
    
    var data = JSON.parse(response);
    if(data['view'] === undefined) {
        throw new Error('Not a view !');
    }

    var l = data.scripts.length;
    for(i = 0; i < l; i++) {
        the.getScript(data.scripts[i]);
    }

    if(typeof callback === 'function') {
        callback.call(this, data);
    }            

};

TView.prototype.attachWindow = function (pageName, anchor) {
    this.requestPage(pageName, function(data) {
        if(anchor !== undefined) {
            $(anchor).html(data.view);
        } else {
            $(document.body).html(data.view);
        }
    });
};

TView.prototype.attachView = function (pageName, anchor) {
    var the = this;
    var myToken = TRegistry.getToken();
    
    this.getJSON(pageName, {"action" : 'getViewHtml', "token" : myToken}, function(data) {
        try {
            TRegistry.setToken(data.token);

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                the.getScript(data.scripts[i]);
            }

            var html = base64_decode(data.view);
            $(anchor).html(html);                
        }
        catch(e) {
            debugLog(e);
        }
    });
};

    
TView.prototype.attachIframe = function(id, src, anchor) {
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

};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TController = function(view, name) {
    TWebObject.call(this);

    this.domain = (view !== undefined) ? view.getDomain() : '';
    this.hasView = true;
    
    if(view instanceof TView) {
        this.parent = view;
    } else if(typeof view === 'Object') {
        throw new Error('Not a valid view');
    } else {
        this.hasView = false;
    }

    this.setName(name);
    
};

TController.prototype = new TWebObject();
TController.prototype.constructor = TController;

TController.create = function(parent, name) {
    if (name === undefined) {
        name = 'ctrl' + Date.now();
    }
    return new TController(parent, name);
};

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
    this.parent.requestPage(pageName, callback);
};

TController.prototype.getPartialView = function (pageName, action, attach, postData, callback) {
    this.parent.requestPart(pageName, action, attach, postData, callback);
};

TController.prototype.parseViewResponse = function (pageName, callback) {
    this.parent.parseResponse(pageName, callback);
};

TController.prototype.attachWindow = function (pageName, anchor) {
    this.parent.attachWindow(pageName, anchor);
};

TController.prototype.attachView = function (pageName, anchor) {
    this.parent.attachView(pageName, anchor);
};
    
TController.prototype.attachIframe = function(id, src, anchor) {
    this.parent.attachIframe(id, src, anchor);
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TPlugin = function() {
    TWebObject.call(this);
    
};

TPlugin.prototype = new TWebObject();
TPlugin.prototype.constructor = TPlugin;

TPlugin.create = function() {
    return new TPlugin();
};

TPlugin.applyTemplate = function(templates, row, i) {
    var html = row[i];
    
    if(templates[i].content !== '' && templates[i].enabled) {
        html = templates[i].content;
        var event = templates[i].event;
        var e = event.split('#');
        if(e[0] === 'href') {
            event = 'javascript:' + e[1];
        } else {
            event = e[0] + '="' + e[1] + '"'; 
        }
        for (var m = 0; m < row.length; m++) {
            html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
            html = html.replace('<% ' + templates[m].name + ':index %>', m);
            event = event.replace(templates[m].name, "'" + row[m] + "'");
            html = html.replace('<% &' + templates[m].name + ' %>', event);
        }   
    }
    
    return html;
};

TPlugin.applyDragHelper = function(templates, row, i) {
    var html = row[i];
    
    if(templates[i].dragHelper !== '' && templates[i].enabled) {
        html = templates[i].dragHelper;
        var event = templates[i].event;
        var e = event.split('#');
        if(e[0] === 'href') {
            event = 'javascript:' + e[1];
        } else {
            event = e[0] + '="' + e[1] + '"'; 
        }
        for (var m = 0; m < row.length; m++) {
            html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
            html = html.replace('<% ' + templates[m].name + ':index %>', m);
            event = event.replace(templates[m].name, "'" + row[m] + "'");
            html = html.replace('<% &' + templates[m].name + ' %>', event);
        }   
    }

    return html;
};

TPlugin.prototype.dataBind = function(tableId, values, templates) {
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
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TAccordion = function() {
    TPlugin.call(this);
    
    
};

TAccordion.prototype = new TPlugin();
TAccordion.prototype.constructor = TAccordion;

TAccordion.create = function() {
    return new TAccordion();
};


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
            //html = this.applyTemplate(templates[j], colNum, row, i);
            //html = row[index];
            html = TPlugin.applyTemplate(templates, row, j);

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
};


    
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TTable = function() {
    TPlugin.call(this);
};

TTable.prototype = new TPlugin();
TTable.prototype.constructor = TTable;

TTable.create = function() {
    return new TTable();
};
    
TTable.prototype.bind = function(tableId, values, templates) {
    var colNum = templates.length;
    var rowNum = values.length;
    for(var j=0; j < rowNum; j++) {
        var row = JSON.parse(values[j]);
        for (var i=0; i < colNum; i++) {
            var template = templates[i];
            var html = TPlugin.applyTemplate(templates, row, i);
            if(template.enabled) {
                $(tableId + 'td' + (i + colNum * j).toString()).html(html);
            }
        }
    }
};

