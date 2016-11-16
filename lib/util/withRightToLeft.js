'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactComponentManagers = require('react-component-managers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactComponentManagers.mixin)({

  propTypes: {
    isRtl: _react2.default.PropTypes.bool
  },

  contextTypes: {
    isRtl: _react2.default.PropTypes.bool
  },

  childContextTypes: {
    isRtl: _react2.default.PropTypes.bool
  },

  getChildContext: function getChildContext() {
    return {
      isRtl: this.isRtl()
    };
  },
  isRtl: function isRtl() {
    return !!(this.props.isRtl || this.context && this.context.isRtl);
  }
});
module.exports = exports['default'];