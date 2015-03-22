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

(function (definition, root) {
	'use strict';
	
	if ( typeof root === 'undefined' ) {
		if ( typeof module !== 'undefined' ) {
			module.exports = definition();
		}
	} else {
		if ( root.fn ) {
			fn.define('_', definition );
		} else if( !root._ ) {
			root._ = definition();
		}
	}

})(function () {
	'use strict';

    function _extend () {
        var auxArray = [],
            dest = auxArray.shift.call(arguments),
            src = auxArray.shift.call(arguments),
            key;

        while( src ) {
            for( key in src ) {
                dest[key] = src[key];
            }
            src = auxArray.shift.call(arguments);
        }

        return dest;
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

    function key (o,full_key,value){
        if(! o instanceof Object) return false;
        var oKey, keys = full_key.split('.');
        if(value !== undefined) {
            if(keys.length) {
                oKey = keys.shift();
                var next_key = keys.shift();
                while( next_key ) {
                    if( !o[oKey] ) o[oKey] = {};
                    o = o[oKey];
                    oKey = next_key;
                    next_key = keys.shift();
                }
                o[oKey] = value;
                return value;
            }
            return false;
        } else {
            for(var k=0, len = keys.length, in_keys = o || {}; k < len ; k++ ) {
                oKey = keys[k];
                if( oKey in in_keys ) in_keys = in_keys[keys[k]] || {};
                else return false;
            }
            return in_keys;
        }
    }

    function extend () {
        if( arguments.length > 1 ) {
            var target = [].shift.call(arguments), o = [].shift.call(arguments);

            while( o ) {
                _extend(target, o);
                o = [].shift.call(arguments);
            }
        }
    }


    var RE_$$ = /^\$\$/,
            auxArray = [];

        function _extendByType (orig, sanitize) {
            if( orig instanceof Array ) {
                return _deepExtend([], orig, sanitize);
            } else if( orig instanceof Object ) {
                return _deepExtend({}, orig, sanitize);
            }
            return orig;
        }

        function _deepExtend (dest, orig, sanitize) {

            if( dest === undefined ) {

                return _extendByType(orig);

            }

            if( orig instanceof Array ) {

                if( !dest instanceof Array ) {
                    return _deepExtend([], orig, sanitize);
                }

                for( var i = 0, len = orig.length; i < len; i++ ) {

                    if( dest[i] ) {
                        dest[i] = _deepExtend(dest[i], orig[i], sanitize);
                    } else {
                        dest.push(_extendByType(orig[i]));
                    }
                }

            } else if( orig instanceof Object ) {

                if( !dest instanceof Object ) {
                    return _deepExtend({}, orig, sanitize);
                }

                for( var key in orig ) {
                    if( !sanitize || !RE_$$.test(key) ) {

                        dest[key] = _deepExtend(dest[key], orig[key], sanitize);
                    }
                }
            }

            return dest;
        }

        function deepExtend () {

            if( arguments.length < 2 ) {
                return arguments[0];
            }

            var first = auxArray.shift.apply(arguments),
                next = auxArray.shift.apply(arguments);

            while( next ) {
                _deepExtend(first, next);
                next = auxArray.shift.apply(arguments);
            }

            return first;
        }

        function deepAssign(dest, orig){
            
            if( orig === undefined ) {

                return undefined;

            }

            if( orig instanceof Array ) {

                for( var i = 0, len = orig.length; i < len; i++ ) {
                    if( dest[i] ) {
                        dest[i] = deepAssign(dest[i], orig[i]);
                    } else {
                        dest.push( deepAssign(dest[i], orig[i]) );
                    }
                }

                dest.splice(i);

            } else if( orig instanceof Object ) {

                for( var key in orig ) {
                    dest[key] = deepAssign(dest[key], orig[key]);
                }

                for( var keyD in dest ) {
                    if( orig[keyD] === undefined ){
                        delete dest[keyD];
                    }
                }
            }
            else {
                dest = orig;
            }

            return dest;

        }

        function sanitize (obj) {

            return _deepExtend({}, obj, true);
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

    function _eachInList( list, iteratee, thisArg ) {
        for( var i = 0, len = list.length; i < len ; i++ ) {
            iteratee.apply(thisArg, [ list[i], i ]);
        }
    }

    function _eachInObject( o, iteratee, thisArg ) {
        for( var key in o ) {
            iteratee.call(thisArg, [o[key], key]);
        }
    }

    function each (o, iteratee, thisArg) {
        if( o instanceof Array ) {
            _eachInList(o, iteratee, thisArg);
        } else if( o instanceof Object ) {
            _eachInObject(o, iteratee, thisArg);
        }
    }

    function indexOf (list, comparator) {
        
        if( comparator instanceof Function ) {
            for( var i = 0, len = list.length; i < len; i++ ) {
                if( comparator(list[i]) ) {
                    return i;
                }
            }
        } else return list.indexOf(comparator);

        return -1;
    }

    function remove (list, comparator) {

        var i, len;
        
        if( comparator instanceof Function ) {
            for( i = 0, len = list.length; i < len; i++ ) {
                if( comparator(list[i]) ) {
                    list.splice(i, 1);
                    i--;
                }
            }
        } else {
            for( i = 0, len = list.length; i < len; i++ ) {
                if( list[i] === comparator ) {
                    list.splice(i, 1);
                    i--;
                }
            }
        }
    }

    var _Funcs = {
		isFunction: _isType('function'),
        isString: _isType('string'),
        isNumber: _isType('number'),
        isArray: _instanceOf(Array),
        isDate: _instanceOf(Date),
        isRegExp: _instanceOf(RegExp),
		isObject: function (myVar,type){ if( myVar instanceof Object ) return ( type === 'any' ) ? true : ( typeof myVar === (type || 'object') ); else return false; },

		key: key,
    	keys: Object.keys,

    	extend: extend,

        sanitize: sanitize,
        deepExtend: deepExtend,
        deepAssign: deepAssign,

        each: each,
        indexOf: indexOf,
        remove: remove,

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
        chain: function (value) {
            return new Chain(value);
        }
	};

    function Chain (value) {
        this.value = value;
    }

    _eachInList(['key', 'keys', 'each', 'indexOf', 'remove'], function (nameFn) {
        Chain.prototype[nameFn] = function () {
            [].unshift.call(arguments, this.value);
            _[nameFn].apply(null, arguments);
        };
    });

    function _ (value) {
        return new Chain(value);
    }

    extend(_, _Funcs);

	return _;

}, this);
