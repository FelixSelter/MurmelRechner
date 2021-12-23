/*!
  Escapist.js, v1.0.0
  Copyright (c) 2013 Michael Stapp
  MIT License
  https://github.com/mstapp/escapistjs
*/

/*!
==========================
Escapist.js license:
==========================

The MIT License (MIT)

Copyright (c) 2010 Michael Stapp (mstapp@tiggertail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


==========================
Escapist.js includes significant code from the OWASP Reform project's
javascript implementation.


Reform license:
==========================

Copyright (c) 2005-2006 Michael Eddington
Copyright (c) 2004 IOActive Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Authors:
Michael Eddington (meddington@phed.org)
*/


(function(window) {

    // global namespace 'escapist', plus alias 'secure'
    var escapist = window.escapist = {};
    window.secure = window.escapist;


    escapist.html = function(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }

        var out = '',
            len = str.length;

        // Allow: a-z A-Z 0-9 SPACE , .
        // Allow (dec): 97-122 65-90 48-57 32 44 46

        for (var cnt = 0; cnt < len; cnt++) {

            var c = str.charCodeAt(cnt);

            if ( (c >= 97 && c <= 122) ||
                (c >= 65 && c <= 90 ) ||
                (c >= 48 && c <= 57 ) ||
                c == 32 || c == 44 || c == 46 ) {

                out += str.charAt(cnt);
            }
            else {
                out += '&#' + c + ';';
            }
        }

        return out;
    };

    // legacy Reform API
    escapist.HtmlEncode = escapist.html;


    escapist.attr = function(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }

        var out = '',
            len = str.length;

        // Allow: a-z A-Z 0-9
        // Allow (dec): 97-122 65-90 48-57

        for (var cnt = 0; cnt < len; cnt++) {

            var c = str.charCodeAt(cnt);

            if ( (c >= 97 && c <= 122) ||
                (c >= 65 && c <= 90 ) ||
                (c >= 48 && c <= 57 ) ) {

                out += str.charAt(cnt);
            }
            else {
                out += '&#' + c + ';';
            }
        }

        return out;
    };

    // legacy Reform API
    escapist.HtmlAttributeEncode = escapist.attr;

})(window);
