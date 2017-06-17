/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Phink = function() {}

Phink.DOM = function () {}

Phink.DOM.ready = function (f){/in/.test(document.readyState)?setTimeout('Phink.DOM.ready('+f+')',9):f()}

function include(file) {
    var myScript =  document.createElement("script")
    myScript.src = file
    myScript.type = "text/javascript"
    document.body.appendChild(myScript)
}
var Phink = Phink || {}

Phink.Registry = (function () {
    
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
})();var Phink = Phink || {}

Phink.Utils = function () {
    
};

Phink.Utils.find = function(haystack, index, needle) {
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
Phink.Utils.grep = function(haystack, key, needle) {
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

Phink.Utils.resizeIframe = function(ui) {
    ui.style.height = ui.contentWindow.document.body.scrollHeight + 'px';
};

Phink.Utils.html64 = function(container, html) {
    $(container).html(base64_decode(html));
};

Phink.Utils.secondsToString = function(seconds) {
     var minutes = Math.floor(seconds / 60)
     var seconds = seconds - (minutes * 60)
     
     return minutes + ':' + ('00' + seconds).toString().slice(-2)
}

function debugLog(message) {
    alert(message);
}var Phink = Phink || {}

Phink.Object = function() {
    this.id = '';
    this.name = '';
    this.parent = null;
    
};

Phink.Object.prototype.setId = function(value) {
    this.id = value;
    
    return this;
};

Phink.Object.prototype.getId = function() {
    return this.id;
};

Phink.Object.prototype.setName = function(value) {
    this.name = value;
    
    return this;
};

Phink.Object.prototype.getName = function() {
    return this.name;
};

//Phink.Object.prototype.setParent = function(value) {
//    this.parent = value;
//    
//    return this;
//};

Phink.Object.prototype.getParent = function() {
    return this.parent;
};var Phink = Phink || {}

Phink.Url = function (url, domain, isSSL) {

    this.url = url;
    this.isParsed = false;
    this.isSSL = isSSL;
    
    this.tmpDomain = domain;

    this.port = '80'
    this.page = window.location.pathname;
    this.domain = this.url;
    this.isRelative = false;
    
    this.parse();
    
}

Phink.Url.prototype.parse = function () {
        
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
            this.protocol = (this.isSSL) ? 'https:' : 'http:';
        
        } else {

            if(this.protocol === '') {
                this.protocol = (this.isSSL) ? 'https:' : 'http:';
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
        this.protocol = ((this.domain !== '' && this.protocol === '') ? ((this.isSSL) ? 'https:' : 'http:') : this.protocol);
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

Phink.Url.prototype.toString = function urlToString() {
    if(!this.isParsed) {
        this.parse();
    }
    
    var fqPage = (this.queryString !== '') ? this.page + this.queryString : this.page;
    
    return this.protocol + '//' + this.domain + '/' + fqPage;
};var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Rest = (function() {
    var F = function() {

    }

    /**
     * Performs a HEAD request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream
     */
    F.prototype.head = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    /**
     * Performs a GET request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream
     */
     F.prototype.get = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    /**
     * Performs a POST request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
     F.prototype.post = function(url, data, callback) {

        var xhr = new XMLHttpRequest()

        var params = '';
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + data[key])
            }
        }
        params = params.substring(1);

        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    /**
     * Performs a PATCH request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.patch = function(url, data, callback) {

        var xhr = new XMLHttpRequest()

        var params = '';
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + data[key])
            }
        }
        params = params.substring(1);

        xhr.open('PATCH', url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    /**
     * Performs a PUT request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.put = function(url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        };
        xhr.send(JSON.stringify(data));    
    }

    /**
     * Performs a DELETE request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.delete = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('DELETE', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }
    
    return new F()
})()

var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Object = function(domain, isSSL) {
    Phink.Object.call(this);
    
    this.isSSL = isSSL;
    this.origin = '';
    this.url = {};
    this.token = '';
    this.domain = domain;
};

Phink.Web.Object.prototype = new Phink.Object();
Phink.Web.Object.prototype.constructor = Phink.Web.Object;

Phink.Web.Object.prototype.getDomain = function() {
    return this.domain;
};

Phink.Web.Object.prototype.setOrigin = function(value) {
    this.origin = value;
    
    return this;
};

Phink.Web.Object.prototype.getOrigin = function() {
    return this.origin;
};


Phink.Web.Object.prototype.setToken = function(value) {
    this.token = value;
    
    return this;
};

Phink.Web.Object.prototype.getToken = function() {
    return this.token;
};

Phink.Web.Object.prototype.getPath = function(url, domain) {
    this.url = new Phink.Url(url, domain, this.isSSL);
    return this.url.toString();
};

Phink.Web.Object.prototype.getUrl = function() {
    return this.url;
};

Phink.Web.Object.prototype.getJSON = function(
    url, // Url du webService
    postData, // Tableau JSON des donn�es � poster au webserice
    callback // fonction qui g�re le retour du webservice
) {
    //$("body").toggleClass('onLoad');
//        spinner.spin();
    postData.token = Phink.Registry.getToken();
    this.origin = Phink.Registry.getOrigin();
    
    var urls = this.getPath(url, this.domain);
    var xhr = new XMLHttpRequest()

    var params = '';
    for(var key in postData) {
        if (postData.hasOwnProperty(key)) {
            params += '&' + encodeURI(key + '=' + postData[key]);
        }
    }
    params = params.substring(1);

    xhr.open('POST', urls);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    xhr.onload = function() {
        if(typeof callback === 'function') {
            if (xhr.status === 200 || xhr.status === 202) {
                var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];

                try 
                {
                    if(data.error !== undefined) {
                        debugLog('Error : ' + data.error);
                    } else {
                        Phink.Registry.setToken(data.token);
                        Phink.Registry.setOrigin(xhr.getResponseHeader('origin'));
                        callback.call(this, data, xhr.statusText, xhr);
                    }
                }
                catch(e)
                {
                    debugLog(e);
                }
            }
        }
    }
    xhr.send(params);
};

Phink.Web.Object.prototype.getJSONP = function(url, postData, callBack) {
    postData.token = Phink.Registry.getToken();
    this.origin = Phink.Registry.getOrigin();
    var urls = this.getPath(url, this.domain);

    $.ajax({
        type: 'POST',
        url: urls + "&callback=?", // retour en JSONP
        data: postData,
        dataType: 'json',
        async: true
    }).done(function(data, textStatus, xhr) {
        try {
            Phink.Registry.setToken(data.token);
            Phink.Registry.setOrigin(xhr.getResponseHeader('origin'));

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

Phink.Web.Object.prototype.getScript = function (url, callback) {
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

Phink.Web.Object.getCSS = function(attributes) {
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
};var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Application = function (domain, name, isSSL) {
    Phink.Web.Object.call(this, domain, isSSL);
    
    this.id = 'app' + Date.now();
    if(name === undefined) {
        name = this.id;
    }
    
    this.name = name;
    //this.domain = domain;
    this.viewCollection = [];
    this.controllerCollection = [];
  
};

Phink.Web.Application.prototype = new Phink.Web.Object();
Phink.Web.Application.prototype.constructor = Phink.Web.Application;

Phink.Web.Application.create = function(domain, name, isSSL) {
    return new Phink.Web.Application(domain, name, isSSL);
};

Phink.Web.Application.prototype.includeView = function(name) {
    include('app/controllers/' + name + '/' + name + '.js');
    var newView = Phink.MVC.View.create(this, name);
    this.addView(newView);
    
    return newView;
};

Phink.Web.Application.prototype.createView = function(name) {
    var newView = Phink.MVC.View.create(this, name);
    this.addView(newView);
    
    return newView;
};


Phink.Web.Application.prototype.createController = function(view, name) {
    var newCtrl = Phink.MVC.Controller.create(view, name);
    this.addController(newCtrl);
    
    return newCtrl;
};

Phink.Web.Application.prototype.getViewByName = function(viewName) {
    var result = null;
    
    for(var name in this.viewCollection) {
        if(this.viewCollection[name] !== undefined) {
            result = this.viewCollection[name];
            break;
        }
    }
    
    return result;
}

Phink.Web.Application.prototype.addView = function(view) {
    if(view === undefined) return null;

    if(!(view instanceof Phink.MVC.View)) {
        throw new Error('This is not a view');
    } else {
        this.viewCollection[view.getName()] = view;
    }

};

Phink.Web.Application.prototype.addController = function(controller) {
    if(controller === undefined) return null;

    if(!(controller instanceof Phink.MVC.Controller)) {
        throw new Error('This is not a controller');
    } else {
        this.controllerCollection.push(controller);
    }

};var Phink = Phink || {}

Phink.MVC = Phink.MVC || {}

Phink.MVC.View = function (application, name) {
    
    Phink.Web.Object.call(this);
    
    this.id = 'view' + Date.now();
    this.domain = (application !== undefined) ? application.getDomain() : '';
    this.token = '';
    this.name = name;
    
    this.parent = application;
    
    Phink.Registry.item(this.domain).view = this;
    
};

Phink.MVC.View.prototype = new Phink.Web.Object();
Phink.MVC.View.prototype.constructor = Phink.MVC.View;

Phink.MVC.View.create = function(parent, name) {
    return new Phink.MVC.View(parent, name);
};

Phink.MVC.View.prototype.requestSimpleView = function (view, callback) {
    this.requestView(view, 'getViewHtml', null, callback);
}

Phink.MVC.View.prototype.requestView = function (view, action, args, callback) {
    
    var the = this;
    var token = Phink.Registry.getToken();
    var urls = this.getPath(view, this.domain);
    
    var postData = {"action" : action, "token" : token};
    if(args != null) {
        for(var key in args) {
            postData[key] = args[key];
        }
    }

    var xhr = new XMLHttpRequest()

    var params = '';
    for(var key in postData) {
        if (postData.hasOwnProperty(key)) {
            params += '&' + encodeURI(key + '=' + postData[key]);
        }
    }
    params = params.substring(1);

    xhr.open('POST', urls);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json, text/javascript, request/view, */*; q=0.01");
    xhr.onload = function() {
        if(typeof callback === 'function') {
            if (xhr.status === 200) {
                var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];

    //            var url = Phink.Web.Object.parseUrl(pageName);
    //            Phink.Registry.item(the.name).origin = xhr.getResponseHeader('origin');
                Phink.Registry.setOrigin(xhr.getResponseHeader('origin'));
                Phink.Registry.setToken(data.token);

                if(data.scripts !== undefined) {
                    var l = data.scripts.length;
                    for(var i = 0; i < l; i++) {
                        the.getScript(data.scripts[i]);
                    }
                }

                data.view = base64_decode(data.view);
                if(typeof callback === 'function') {
                    callback.call(this, data);
                } else {
                    $(document.body).html(data.view);

                }
            } else {
                callback.call(this, xhr.status);
                
            }
        }
    }
    xhr.send(params);

};

Phink.MVC.View.prototype.requestPart = function (pageName, action, attach, postData, callback) {

    var the = this;
    var token = Phink.Registry.getToken();
    var urls = this.getPath(pageName, this.domain);

    postData = postData || {};
    
    postData.action = action;
    postData.token = token;

    var the = this;
    var xhr = new XMLHttpRequest()

    var params = '';
    for(var key in postData) {
        if (postData.hasOwnProperty(key)) {
            params += '&' + encodeURI(key + '=' + postData[key]);
        }
    }
    params = params.substring(1);

    xhr.open('POST', urls);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json, text/javascript, request/partialview, */*; q=0.01");
    xhr.onload = function() {
        try {
            if(typeof callback === 'function') {
                var data = [];
                data.status = xhr.status;

                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];
                    Phink.Registry.setToken(data.token);
                    Phink.Registry.setOrigin(xhr.getResponseHeader('origin'));

                    if(data.scripts !== undefined) {
                        var l = data.scripts.length;
                        for(var i = 0; i < l; i++) {
                            the.getScript(data.scripts[i]);
                        }
                    }

                    var html = base64_decode(data.view);
                    $(attach).html(html);

                    if(typeof callback === 'function') {
                        callback.call(this, data);
                    }
                } else {
                    callback.call(this, xhr.status);

                }
            }
        }
        catch(e) {
            debugLog(e);
        }    
    }
    xhr.send(params);
    
};

Phink.MVC.View.prototype.parseResponse = function(response, callback) {
    if(response === '') {
        throw new Error('Response is empty !');
    }
    var the = this;
    
    response = base64_decode(response);
    
    var data = JSON.parse(response);
    if(data['view'] === undefined) {
        throw new Error('Not a view !');
    }

    if(data.scripts !== undefined) {
        var l = data.scripts.length;
        for(var i = 0; i < l; i++) {
            the.getScript(data.scripts[i]);
        }
    }

    if(typeof callback === 'function') {
        callback.call(this, data);
    }            

};

Phink.MVC.View.prototype.attachWindow = function (pageName, anchor) {
    this.requestSimpleView(pageName, function(data) {
        if(anchor !== undefined) {
            $(anchor).html(data.view);
        } else {
            $(document.body).html(data.view);
        }
    });
};

Phink.MVC.View.prototype.attachView = function (pageName, anchor) {
    var the = this;
    var myToken = Phink.Registry.getToken();
    
    this.getJSON(pageName, {"action" : 'getViewHtml', "token" : myToken}, function(data) {
        try {
            Phink.Registry.setToken(data.token);

            if(data.scripts !== undefined) {
                var l = data.scripts.length;
                for(var i = 0; i < l; i++) {
                    the.getScript(data.scripts[i]);
                }
            }

            var html = base64_decode(data.view);
            $(anchor).html(html);                
        }
        catch(e) {
            debugLog(e);
        }
    });
};
    
Phink.MVC.View.prototype.attachIframe = function(id, src, anchor) {
    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.id = id;
    iframe.setAttribute("src", src);
    document.getElementById(anchor).appendChild(iframe);

};
var Phink = Phink || {}

Phink.MVC = Phink.MVC || {}

Phink.MVC.Controller = function(view, name) {
    Phink.Web.Object.call(this);
    context = this;
    this.domain = (view !== undefined) ? view.getDomain() : '';
    this.hasView = true;
    
    if(view instanceof Phink.MVC.View) {
        this.parent = view;
    } else if(typeof view === 'Object') {
        throw new Error('Not a valid view');
    } else {
        this.hasView = false;
    }

    this.setName(name);
    
};

Phink.MVC.Controller.prototype = new Phink.Web.Object();
Phink.MVC.Controller.prototype.constructor = Phink.MVC.Controller;

Phink.MVC.Controller.create = function(parent, name) {
    if (name === undefined) {
        name = 'ctrl' + Date.now();
    }
    return new Phink.MVC.Controller(parent, name);
};

Phink.MVC.Controller.prototype.oninit = function (callback) {

    if(typeof callback === 'function') {
        callback.call(this);
    }
    
    return this;
};

Phink.MVC.Controller.prototype.onload = function (callback) {

    var the = this
    Phink.DOM.ready(function() {
        if(typeof callback === 'function') {
            callback.call(the);
        }
    })
    
    return this;
};

Phink.MVC.Controller.prototype.render = function () {

    if(typeof this.oninit === 'function') {
        this.oninit();
    }   
    if(typeof this.onload === 'function') {
        this.onload();
    }
};

Phink.MVC.Controller.prototype.actions = function (actions) {

    for(var key in actions) {
        this[key] = actions[key];
    }

    this.render();

    return this;
};

Phink.MVC.Controller.prototype.route = function (route, callback) {
    
    var routeMatcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
    this.parent.requestView(view, action, args, callback);
};

Phink.MVC.Controller.prototype.getSimpleView = function (view, callback) {
    this.parent.requestSimpleView(view, callback);
};

Phink.MVC.Controller.prototype.getView = function (view, action, args, callback) {
    this.parent.requestView(view, action, args, callback);
};

Phink.MVC.Controller.prototype.getPartialView = function (pageName, action, attach, postData, callback) {
    this.parent.requestPart(pageName, action, attach, postData, callback);
};

Phink.MVC.Controller.prototype.parseViewResponse = function (pageName, callback) {
    this.parent.parseResponse(pageName, callback);
};

Phink.MVC.Controller.prototype.attachWindow = function (pageName, anchor) {
    this.parent.attachWindow(pageName, anchor);
};

Phink.MVC.Controller.prototype.attachView = function (pageName, anchor) {
    this.parent.attachView(pageName, anchor);
};
    
Phink.MVC.Controller.prototype.attachIframe = function(id, src, anchor) {
    this.parent.attachIframe(id, src, anchor);
};
var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Plugin = function() {
    Phink.Web.Object.call(this);
    
};

Phink.Web.UI.Plugin.prototype = new Phink.Web.Object();
Phink.Web.UI.Plugin.prototype.constructor = Phink.Web.UI.Plugin;

Phink.Web.UI.Plugin.create = function() {
    return new Phink.Web.UI.Plugin();
};

Phink.Web.UI.Plugin.applyTemplate = function(templates, row, i) {
    var html = row[i];
    
//    if(templates[i] === undefined) {
//        return html;
//    }
    
    if(templates[i].content !== '' && templates[i].enabled) {
        html = templates[i].content;
        var event = templates[i].event;
        var e = event.split('#');
        if(e[0] === 'href') {
            event = 'javascript:' + e[1];
        } else {
            event = e[0] + '="' + e[1] + '"'; 
        }
        for (var m = 0; m < templates.length; m++) {
//            if(templates[m] === undefined) continue;
            html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
            html = html.replace('<% ' + templates[m].name + ':index %>', m);
            event = event.replace(templates[m].name, "'" + row[m] + "'");
            html = html.replace('<% &' + templates[m].name + ' %>', event);
        }   
    }
    
    return html;
};

Phink.Web.UI.Plugin.applyDragHelper = function(templates, row, i) {
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

Phink.Web.UI.Plugin.prototype.dataBind = function(tableId, values, templates) {
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
};var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Accordion = function() {
    Phink.Web.UI.Plugin.call(this);
};

Phink.Web.UI.Accordion.prototype = new Phink.Web.UI.Plugin();
Phink.Web.UI.Accordion.prototype.constructor = Phink.Web.UI.Accordion;

Phink.Web.UI.Accordion.create = function() {
    return new Phink.Web.UI.Accordion();
};


Phink.Web.UI.Accordion.prototype.bind = function(container, data, callback) {
    var names = data.names;
    var values = data.values;
    var templates = data.templates;
    var elements = data.elements;    
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
            html = Phink.Web.UI.Plugin.applyTemplate(templates, row, j);

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

    $(container).html("&nbsp;");
    $(container).html(result);
    
    if(typeof callback === 'function') {
        callback.call(this);
    }    
};


    
var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.List = function() {
    Phink.Web.UI.Plugin.call(this);
};

Phink.Web.UI.List.prototype = new Phink.Web.UI.Plugin();
Phink.Web.UI.List.prototype.constructor = Phink.Web.UI.List;

Phink.Web.UI.List.create = function() {
    return new Phink.Web.UI.List();
};


Phink.Web.UI.List.prototype.bind = function(container, data, callback) {
    var names = data.names;
    var values = data.values;
    var templates = data.templates;
    var elements = data.elements;
    var colNum = templates.length;
    var rowNum = values.length;

    var result = '';
    var html = '';
    var row = 0;
    var css = '';

    result = str_replace('%s', css, elements[0].opening) + "\n";
    var oldValue = [];
    
    for(i = 0; i < rowNum; i++) {

        row = (values[i] !== null) ? JSON.parse(values[i]) : Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '&nbsp;');

        result += str_replace('%s', '', elements[1].opening) + "\n";
        for(j = 0; j < colNum; j++) {
            var k = i * colNum + j;
            html = Phink.Web.UI.Plugin.applyTemplate(templates, row, j);
            if(templates[j]['enabled'] == 1 && row[j] != oldValue[j]) {
                result += str_replace('%s', '', elements[2].opening) + html + elements[2].closing + "\n";
            }
            oldValue[j] = row[j];
        }
        result += elements[1].closing + "\n";
    }
    result += elements[0].closing + "\n";

    $(container).html("&nbsp;");
    $(container).html(result);
    
    if(typeof callback === 'function') {
        callback.call(this);
    }
};


    
var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Table = function() {
    Phink.Web.UI.Plugin.call(this);
};

Phink.Web.UI.Table.prototype = new Phink.Web.UI.Plugin();
Phink.Web.UI.Table.prototype.constructor = Phink.Web.UI.Table;

Phink.Web.UI.Table.create = function() {
    return new Phink.Web.UI.Table();
};
    
Phink.Web.UI.Table.prototype.bind = function(tableId, data, callback) {
    var values = data.values;
    var templates = data.templates;
    var colNum = templates.length;
    var rowNum = values.length;
    for(var j=0; j < rowNum; j++) {
        var row = JSON.parse(values[j]);
        for (var i=0; i < colNum; i++) {
            var template = templates[i];
            var html = Phink.Web.UI.Plugin.applyTemplate(templates, row, i);
            if(template.enabled) {
                $(tableId + 'td' + (i + colNum * j).toString()).html(html);
            }
        }
    }
    
    if(typeof callback === 'function') {
        callback.call(this);
    }
};

