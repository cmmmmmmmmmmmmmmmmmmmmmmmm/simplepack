(function(modules){
            function require(filename){
                var fn =modules[filename];
                var module={exports:{}};
                fn(require,module,module.exports);

                return module.exports
            }

            require('D:\myself\simplepack\src\index.js')
        })({'D:\myself\simplepack\src\index.js':function(require,module,exports){"use strict";

var _hahaha = require("./hahaha.js");

document.write((0, _hahaha.hahaha)('hehe'));},'./hahaha.js':function(require,module,exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hahaha = exports.hahaha = function hahaha(str) {
  return 'hahaha' + str;
};},})