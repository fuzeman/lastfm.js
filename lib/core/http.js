'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

var _encHex = require('crypto-js/enc-hex');

var _encHex2 = _interopRequireDefault(_encHex);

var _md = require('crypto-js/md5');

var _md2 = _interopRequireDefault(_md);

var _merge = require('lodash-amd/merge');

var _merge2 = _interopRequireDefault(_merge);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpClient = function () {
    function HttpClient(client, baseUrl) {
        _classCallCheck(this, HttpClient);

        this._client = client;
        this._baseUrl = baseUrl || 'https://ws.audioscrobbler.com/2.0/';
    }

    _createClass(HttpClient, [{
        key: 'get',
        value: function get(method, options) {
            options = (0, _merge2.default)({
                params: {},

                authenticated: false,
                sessionKey: this._client.getSessionKey()
            }, options || {});

            options.signed = (0, _helpers.isDefined)(options.signed) ? options.signed : options.authenticated;

            // Set request parameters
            options.params['api_key'] = this._client.key;
            options.params['format'] = 'json';
            options.params['method'] = method;

            if (options.authenticated) {
                // Add session key
                if (!(0, _helpers.isDefined)(options.sessionKey)) {
                    throw new Error('Missing required "sessionKey" parameter');
                }

                options.params['sk'] = options.sessionKey;
            }

            if (options.signed) {
                // Generate signature
                options.params['api_sig'] = this._generateSignature(options.params);
            }

            // Send request
            return fetch(this._baseUrl + '?' + _querystring2.default.encode(options.params)).then(function (response) {
                // TODO check status code
                return response.json();
            });
        }
    }, {
        key: 'post',
        value: function post(method, options) {
            options = (0, _merge2.default)({
                params: {},

                authenticated: false,
                sessionKey: this._client.getSessionKey()
            }, options || {});

            options.signed = (0, _helpers.isDefined)(options.signed) ? options.signed : options.authenticated;

            // Set request parameters
            options.params['api_key'] = this._client.key;
            options.params['format'] = 'json';
            options.params['method'] = method;

            if (options.authenticated) {
                // Add session key
                if (!(0, _helpers.isDefined)(options.sessionKey)) {
                    throw new Error('Missing required "sessionKey" parameter');
                }

                options.params['sk'] = options.sessionKey;
            }

            if (options.signed) {
                // Generate signature
                options.params['api_sig'] = this._generateSignature(options.params);
            }

            // Send request
            return fetch(this._baseUrl, {
                method: 'POST',
                body: _querystring2.default.encode(options.params)
            }).then(function (response) {
                // TODO check status code
                return response.json();
            });
        }
    }, {
        key: '_generateSignature',
        value: function _generateSignature(params) {
            var signature = '';

            // Append parameters
            var value;

            Object.keys(params).sort().forEach(function (key) {
                if (key === 'format') {
                    return;
                }

                // Retrieve value
                value = params[key];

                if (typeof value === 'undefined' || value === null) {
                    value = '';
                }

                // Append parameter
                signature += key + value;
            });

            // Append client secret
            signature += this._client.secret;

            // Generate hash
            return (0, _md2.default)(signature).toString(_encHex2.default);
        }
    }]);

    return HttpClient;
}();

exports.default = HttpClient;
module.exports = exports['default'];
//# sourceMappingURL=http.js.map