"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../core/helpers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Interface = /*#__PURE__*/function () {
  function Interface(client) {
    _classCallCheck(this, Interface);

    this._client = (0, _helpers.isDefined)(client) ? client : null;
  }

  _createClass(Interface, [{
    key: "http",
    get: function get() {
      if (!(0, _helpers.isDefined)(this._client)) {
        return null;
      }

      return this._client.http;
    }
  }]);

  return Interface;
}();

exports.default = Interface;
module.exports = exports["default"];
//# sourceMappingURL=base.js.map
