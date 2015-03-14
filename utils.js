/*
 * css.js
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Jesús Manuel Germade Castiñeiras <jesus@germade.es>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

(function (definition) {
	'use strict';
	
	if ( typeof window === 'undefined' ) {
		if ( typeof module !== 'undefined' ) {
			module.exports = definition();
		}
	} else {
		if ( window.fn ) {
			fn.define('_', definition );
		} else if( !window._ ) {
			window._ = definition();
		}
	}

})(function () {
	'use strict';

	function _extend (source, values) {
		for( var key in values ) {
			source[key] = values[key];
		}
		return source;
	}

	function _isType (type) {
        return function (o) {
            return (typeof o === type);
        };
    }

    function _instanceOf (_constructor) {
        return function (o) {
            return ( o instanceof _constructor );
        };
    }

    function _proccessPipe (pipe, args) {
        var result = pipe[0].apply(null, args);

        for( var i = 1, len = pipe.length; i < len; i++ ) {
            result = pipe[i](result);
        }

        return result;
    }

    function _addToPipe (pipe, args) {
        for( var i = 0, len = args.length; i < len; i++ ) {
            if( !args[i] instanceof Function ) {
                throw 'only Functions are allowed as pipe arguments';
            } else {
                pipe.push(args[i]);
            }
        }
    }

	var _ = {
		isFunction: _isType('function'),
        isString: _isType('string'),
        isNumber: _isType('number'),
        isArray: _instanceOf(Array),
        isDate: _instanceOf(Date),
        isRegExp: _instanceOf(RegExp),
		isObject: function(myVar,type){ if( myVar instanceof Object ) return ( type === 'any' ) ? true : ( typeof myVar === (type || 'object') ); else return false; },
		key: function(o,full_key,value){
    		if(! o instanceof Object) return false;
    		var key, keys = full_key.split('.');
    		if(value !== undefined) {
    			if(keys.length) {
    				key = keys.shift();
    				var next_key = keys.shift();
    				while( next_key ) {
    					if( !o[key] ) o[key] = {};
    					o = o[key];
    					key = next_key;
    					next_key = keys.shift();
    				}
    				o[key] = value;
    				return value;
    			}
    			return false;
    		} else {
    			for(var k=0, len = keys.length, in_keys = o || {}; k < len ; k++ ) {
    			    key = keys[k];
    			    if( key in in_keys ) in_keys = in_keys[keys[k]] || {};
    				else return false;
    			}
    			return in_keys;
    		}
    	},
    	keys: Object.keys,
    	extend: function () {
    		if( arguments.length > 1 ) {
    			var target = [].shift.call(arguments), o = [].shift.call(arguments);

    			while( o ) {
    				_extend(target, o);
    				o = [].shift.call(arguments);
    			}
    		}
    	},
        pipe: function () {
            var pipe = [];

            _addToPipe(pipe, arguments);

            var pipeFn = function () {
                return _proccessPipe(pipe, arguments);
            };

            pipeFn.pipe = function () {
                _addToPipe(pipe, arguments);
                return pipeFn;
            };

            return pipeFn;
        },
        lazy: function (value) {

        }
	};

    function Lazy (value) {
        this.value = value;
    }

    Lazy.prototype.each = function (func) {
        var arg = this.value;

        for( var i = 0, len = arg.length; i < len; i++ ) {
            func.call(null, arg[i]);
        }
        return this;
    };

    Lazy.prototype.indexOf = function (comparator) {
        var arg = this.value;

        if( comparator instanceof Function ) {
            for( var i = 0, len = arg.length; i < len; i++ ) {
                if( comparator(arg[i]) ) {
                    return i;
                }
            }
        } else return arg.indexOf(comparator);

        return -1;
    };

	return _;
});
