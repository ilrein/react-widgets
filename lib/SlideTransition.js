'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp3;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _width = require('dom-helpers/query/width');

var _width2 = _interopRequireDefault(_width);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _ReplaceTransitionGroup = require('./ReplaceTransitionGroup');

var _ReplaceTransitionGroup2 = _interopRequireDefault(_ReplaceTransitionGroup);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _configuration = require('./util/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _Props = require('./util/Props');

var Props = _interopRequireWildcard(_Props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSFORM_MAP = {
  left: 'translateX', right: 'translateX',
  top: 'translateY', bottom: 'translateY'
};

var getDimension = function getDimension(node, direction) {
  return {
    left: _width2.default,
    right: function right(n) {
      return -(0, _width2.default)(n);
    },
    top: _height2.default,
    bottom: function bottom(n) {
      return -(0, _height2.default)(n);
    }
  }[direction](node);
};

var SlideChildGroup = (_temp = _class = function (_React$Component) {
  _inherits(SlideChildGroup, _React$Component);

  function SlideChildGroup() {
    _classCallCheck(this, SlideChildGroup);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SlideChildGroup.prototype.componentWillEnter = function componentWillEnter(done) {
    var _css,
        _config$animate,
        _this2 = this;

    var _props = this.props,
        duration = _props.duration,
        direction = _props.direction;


    var node = _compat2.default.findDOMNode(this);
    var dimension = getDimension(node, direction);
    var transform = TRANSFORM_MAP[direction];

    this.ORGINAL_POSITION = node.style.position;

    (0, _style2.default)(node, (_css = { position: 'absolute' }, _css[transform] = dimension + 'px', _css));

    _configuration2.default.animate(node, (_config$animate = {}, _config$animate[transform] = 0, _config$animate), duration, function () {
      (0, _style2.default)(node, {
        position: _this2.ORGINAL_POSITION,
        overflow: 'hidden'
      });

      _this2.ORGINAL_POSITION = null;
      done && done();
    });
  };

  SlideChildGroup.prototype.componentWillLeave = function componentWillLeave(done) {
    var _config$animate2,
        _this3 = this;

    var _props2 = this.props,
        duration = _props2.duration,
        direction = _props2.direction;


    var node = _compat2.default.findDOMNode(this);
    var dimension = getDimension(node, direction);
    var transform = TRANSFORM_MAP[direction];

    this.ORGINAL_POSITION = node.style.position;

    (0, _style2.default)(node, { position: 'absolute' });

    _configuration2.default.animate(node, (_config$animate2 = {}, _config$animate2[transform] = -dimension + 'px', _config$animate2), duration, function () {
      (0, _style2.default)(node, {
        position: _this3.ORGINAL_POSITION,
        overflow: 'hidden'
      });

      _this3.ORGINAL_POSITION = null;
      done && done();
    });
  };

  SlideChildGroup.prototype.render = function render() {
    return _react2.default.Children.only(this.props.children);
  };

  return SlideChildGroup;
}(_react2.default.Component), _class.propTypes = {
  direction: _react2.default.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  duration: _react2.default.PropTypes.number
}, _temp);
var SlideTransition = (_temp3 = _class2 = function (_React$Component2) {
  _inherits(SlideTransition, _React$Component2);

  function SlideTransition() {
    var _temp2, _this4, _ret;

    _classCallCheck(this, SlideTransition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp2 = (_this4 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this4), _this4._wrapChild = function (child, ref) {
      return _react2.default.createElement(
        SlideChildGroup,
        { key: child.key, ref: ref,
          direction: _this4.props.direction,
          duration: _this4.props.duration },
        child
      );
    }, _temp2), _possibleConstructorReturn(_this4, _ret);
  }

  SlideTransition.prototype.render = function render() {
    var _props3 = this.props,
        style = _props3.style,
        children = _props3.children;


    style = _extends({}, style, {
      position: 'relative',
      overflow: 'hidden'
    });

    return _react2.default.createElement(
      _ReplaceTransitionGroup2.default,
      _extends({}, Props.omitOwn(this), {
        ref: 'container',
        component: 'div',
        childFactory: this._wrapChild,
        style: style
      }),
      children
    );
  };

  return SlideTransition;
}(_react2.default.Component), _class2.propTypes = {
  direction: _react2.default.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  duration: _react2.default.PropTypes.number
}, _class2.defaultProps = {
  direction: 'left',
  duration: 250
}, _temp3);
exports.default = SlideTransition;
module.exports = exports['default'];