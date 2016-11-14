'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _OVERFLOW, _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _camelizeStyle = require('dom-helpers/util/camelizeStyle');

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

var _configuration = require('./util/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _mountManager = require('./util/mountManager');

var _mountManager2 = _interopRequireDefault(_mountManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transform = (0, _camelizeStyle2.default)(_configuration2.default.animate.transform);

var CLOSING = 0,
    CLOSED = 1,
    OPENING = 2,
    OPEN = 3;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _configuration2.default.animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var OVERFLOW = (_OVERFLOW = {}, _OVERFLOW[CLOSED] = 'hidden', _OVERFLOW[CLOSING] = 'hidden', _OVERFLOW[OPENING] = 'hidden', _OVERFLOW);

var Popup = (_temp = _class = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup() {
    _classCallCheck(this, Popup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.mounted = (0, _mountManager2.default)(_this);
    _this.state = {
      initialRender: true,
      status: _this.props.open ? OPENING : CLOSED
    };
    return _this;
  }

  Popup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    });
  };

  Popup.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var isOpen = this.state.status === OPENING;

    _compat2.default.batchedUpdates(function () {
      _this2.setState({ initialRender: false });
      if (isOpen) {
        _this2.open();
      }
    });
  };

  Popup.prototype.componentDidUpdate = function componentDidUpdate(pvProps) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open,
        open = this.props.open,
        status = this.state.status;

    if (!!pvProps.dropUp !== !!this.props.dropUp) {
      this.cancelNextCallback();
      if (status === OPENING) this.open();
      if (status === CLOSING) this.close();
      return;
    }

    if (opening) this.open();else if (closing) this.close();else if (open) {
      // this.height() returns a floating point number with the desired height
      // for this popup. Because of potential rounding errors in floating point
      // aritmetic we must allow an error margin when comparing to the current
      // state, otherwise we can end up in an infinite loop where the height
      // is never exactly equal to our target value.
      var height = this.height(),
          diff = Math.abs(height - this.state.height);
      if (isNaN(diff) || diff > 0.1) this.setState({ height: height });
    }
  };

  Popup.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props;
    var className = _props.className;
    var dropUp = _props.dropUp;
    var style = _props.style;
    var _state = this.state;
    var status = _state.status;
    var height = _state.height;


    var overflow = OVERFLOW[status] || 'visible',
        display = status === CLOSED ? 'none' : 'block';

    return _react2.default.createElement(
      'div',
      {
        style: _extends({
          display: display,
          overflow: overflow,
          height: height
        }, style),
        ref: function ref(r) {
          return _this3.element = r;
        },
        className: (0, _classnames2.default)(className, 'rw-popup-container', dropUp && 'rw-dropup', this.isTransitioning() && 'rw-popup-animating')
      },
      this.renderChildren()
    );
  };

  Popup.prototype.renderChildren = function renderChildren() {
    var offset = this.getOffsetForStatus(this.state.status),
        child = _react2.default.Children.only(this.props.children);

    return _react2.default.createElement(
      'div',
      {
        className: 'rw-popup-animation-box',
        style: offset
      },
      (0, _react.cloneElement)(child, {
        className: (0, _classnames2.default)(child.props.className, 'rw-popup')
      })
    );
  };

  Popup.prototype.open = function open() {
    var _this4 = this;

    this.cancelNextCallback();
    var el = this.element.firstChild,
        height = this.height();

    this.props.onOpening();

    this.safeSetState({ status: OPENING, height: height }, function () {
      var offset = _this4.getOffsetForStatus(OPEN),
          duration = _this4.props.duration;

      _this4.animate(el, offset, duration, 'ease', function () {
        _this4.safeSetState({ status: OPEN }, function () {
          _this4.props.onOpen();
        });
      });
    });
  };

  Popup.prototype.close = function close() {
    var _this5 = this;

    this.cancelNextCallback();
    var el = this.element.firstChild,
        height = this.height();

    this.props.onClosing();

    this.safeSetState({ status: CLOSING, height: height }, function () {
      var offset = _this5.getOffsetForStatus(CLOSED),
          duration = _this5.props.duration;

      _this5.animate(el, offset, duration, 'ease', function () {
        return _this5.safeSetState({ status: CLOSED }, function () {
          _this5.props.onClose();
        });
      });
    });
  };

  Popup.prototype.getOffsetForStatus = function getOffsetForStatus(status) {
    var _CLOSED$CLOSING$OPENI;

    if (this.state.initialRender) return {};

    var _in = properties('top', this.props.dropUp ? '100%' : '-100%'),
        out = properties('top', 0);
    return (_CLOSED$CLOSING$OPENI = {}, _CLOSED$CLOSING$OPENI[CLOSED] = _in, _CLOSED$CLOSING$OPENI[CLOSING] = out, _CLOSED$CLOSING$OPENI[OPENING] = _in, _CLOSED$CLOSING$OPENI[OPEN] = out, _CLOSED$CLOSING$OPENI)[status] || {};
  };

  Popup.prototype.height = function height() {
    var container = this.element,
        content = container.firstChild,
        margin = parseInt((0, _style2.default)(content, 'margin-top'), 10) + parseInt((0, _style2.default)(content, 'margin-bottom'), 10);

    var old = container.style.display,
        height = void 0;

    container.style.display = 'block';
    height = ((0, _height2.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
    container.style.display = old;
    return height;
  };

  Popup.prototype.isTransitioning = function isTransitioning() {
    return this.state.status === OPENING || this.state.status === CLOSED;
  };

  Popup.prototype.animate = function animate(el, props, dur, easing, cb) {
    this._transition = _configuration2.default.animate(el, props, dur, easing, this.setNextCallback(cb));
  };

  Popup.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this._transition && this._transition.cancel) {
      this._transition.cancel();
      this._transition = null;
    }
    if (this.nextCallback) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Popup.prototype.safeSetState = function safeSetState(nextState, callback) {
    if (this.mounted()) {
      this.setState(nextState, this.setNextCallback(callback));
    }
  };

  Popup.prototype.setNextCallback = function setNextCallback(callback) {
    var _this6 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this6.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      return active = false;
    };
    return this.nextCallback;
  };

  return Popup;
}(_react2.default.Component), _class.propTypes = {
  open: _react2.default.PropTypes.bool,
  dropUp: _react2.default.PropTypes.bool,
  duration: _react2.default.PropTypes.number,

  onClosing: _react2.default.PropTypes.func,
  onOpening: _react2.default.PropTypes.func,
  onClose: _react2.default.PropTypes.func,
  onOpen: _react2.default.PropTypes.func
}, _class.defaultProps = {
  duration: 200,
  open: false,
  onClosing: function onClosing() {},
  onOpening: function onOpening() {},
  onClose: function onClose() {},
  onOpen: function onOpen() {}
}, _temp);
exports.default = Popup;


function childKey(children) {
  var nextChildMapping = _react2.default.Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) {
    return key;
  }
}
module.exports = exports['default'];