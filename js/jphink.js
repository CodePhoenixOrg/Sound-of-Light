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
    
    $.jPhink = function() // constructeur obligatoire
    {
    };

    
    $.jPhink.getViewEx = function (pageName, action, attach, postData, callBack) {
        
        var myToken = $.jPhink.getToken();
        
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
                $.jPhink.setToken(data.token);

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
    

    $.jPhink.attachViewP = function (pageName, anchor) {
        var myToken = $.jPhink.getToken();
        $.jPhink.getJSONP('' + pageName, {"action" : 'getViewHtml', "token" : myToken}, function(data) {
            try {
                $.jPhink.setToken(data.token);
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

    $.jPhink.html64 = function(container, html) {
        $(container).html(base64_decode(html));
        //$(container).html(html);
    } 

    $.jPhink.selectedValues = function(selectObjectId) {

        var selectedOptions = $('select#' + selectObjectId + ' option:selected');

        var result = $.map(selectedOptions ,function(option) {
            return option.value;
        });    

        return result;
    }

    $.jPhink.debugLog = function(message) {
            alert(message);
    }

    $.jPhink.phpJsonDecode = function(json)
    {
        if(json === null) return '';
        return json.replace('\"', '', "g").replace("\\u0022", '"', "g").replace("\\u003C", "<", "g").replace("\\u003E", ">", "g").replace("\\/", "/", "g").replace("\\t", '\t', "g").replace("\\r", '\r', "g").replace("\\n", '\n', "g");
    };

    $.jPhink.getScripts = function(data) {
        var l = data.scripts.length;
        for(i = 0; i < l; i++) {
            $.getScript(data.scripts[i]);
        }
    }



    $.jPhink.bindTriStateCheck = function(parentElement) {
        if($(parentElement).length === 0) return;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            checkBox.click(function() {
                $.jPhink.checkNextTriState(checkBox);
            })
       });        
    };
    
    $.jPhink.bindBiStateCheck = function(parentElement) {
        if($(parentElement).length === 0) return;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            checkBox.click(function() {
                $.jPhink.checkNextBiState(checkBox);
            })
       });        
    };

    $.jPhink.checkNextTriState = function (checkBox) {
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


    $.jPhink.checkTriStateByData = function (checkBox, data) {
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
    
    $.jPhink.checkNextBiState = function (checkBox) {
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

    $.jPhink.checkBiStateByData = function (checkBox, data) {
        
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
    
    $.jPhink.checkAllTriState = function(parentElement, effect) {
        if($(parentElement).length === 0) return false;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            $.jPhink.checkTriStateByData(checkBox, effect);
        });
    };
    
    $.jPhink.checkAllBiState = function(parentElement, effect) {
        if($(parentElement).length === 0) return false;
        
        var checkboxes = $(parentElement).find("input:checkbox");
        
        checkboxes.each(function() {
            var checkBox = $(this);
            $.jPhink.checkBiStateByData(checkBox, effect);
        });
    };

    $.jPhink.selectableInput = function (parentElement) {
        $(parentElement).selectable({
            filter:'label',
            stop: function() {        
                $(".ui-selected input", this).each(function() {
                    //this.checked= !this.checked
                    var checkBox = $(this);
                    $.jPhink.checkNextTriState(checkBox);
                });
            }
        });
    };

    $.jPhink.selectAll = function (parentElement, functionName) {
        
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
    
    $.jPhink.keyValueExists = function(key, value, haystack) {
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
    
    $.jPhink.replaceByKeyValue = function(key, value, object, haystack) {
        var result = false;
        
        var index = $.jPhink.keyValueExists(key, value, haystack);
        
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
    $.jPhink.checkAllBiState(parentElement, data);
}

function checkAllTriState(parentElement, data) {
    $.jPhink.checkAllTriState(parentElement, data);
}

function checkNextBiState(checkBox) {
    $.jPhink.checkNextBiState(checkBox);
}

function checkNextTriState(checkBox) {
    $.jPhink.checkNextTriState(checkBox);
}

function checkBiStateByData(checkBox, data) {
    $.jPhink.checkBiStateByData(checkBox, data);
}

function checkTriStateByData(checkBox, data) {
    $.jPhink.checkTriStateByData(checkBox, data);
}

function bindBiStateCheck(parentElement) {
    $.jPhink.bindBiStateCheck(parentElement);
}

function bindTriStateCheck(parentElement) {
    $.jPhink.bindTriStateCheck(parentElement);
}

function selectableInput(parentElement) {
    $.jPhink.selectableInput(parentElement);
}

function selectAll(parentElement, functionName) {
    $.jPhink.selectAll(parentElement, functionName);
}

function getView(pageName) {
    $.jPhink.getView(pageName);
}

function attachView(pageName, anchor) {
    $.jPhink.attachView(pageName, anchor);
}

function attachViewP(pageName, anchor) {
    $.jPhink.attachViewP(pageName, anchor);
}

function attachWindow(pageName, anchor) {
    $.jPhink.attachWindow(pageName, anchor);
}

function attachIframe(id, src, anchor) {
    $.jPhink.attachIframe(id, src, anchor);
}

function debugLog(message) {
    $.jPhink.debugLog(message);
}
function phpJsonDecode(json) {
    return $.jPhink.phpJsonDecode(json);
}

