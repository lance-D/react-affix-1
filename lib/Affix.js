(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.Affix = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _class, _temp;

  /**
   * @param {*} test
   * @returns {Boolean}
   */
  function isDefined(test) {
    return test !== 'undefined';
  }

  /**
   *
   * @param {Object} state
   * @param {String} className
   * @returns {String}
   */
  function getAffixClassNames(state, className) {
    var affixClassNames = '';
    if (state.affix) {
      affixClassNames = ' affix';
    } else if (state.affixTop) {
      affixClassNames = ' affix-top';
    } else if (state.affixBottom) {
      affixClassNames = ' affix-bottom';
    }

    return '' + className + affixClassNames;
  }

  /**
   * @param document
   * @returns {number}
   */
  function getScrollTop() {
    if (isDefined(document.documentElement.scrollTop)) {
      return document.documentElement.scrollTop;
    }
    return document.body.scrollTop;
  }

  var Affix = (_temp = _class = function (_Component) {
    _inherits(Affix, _Component);

    function Affix(props) {
      _classCallCheck(this, Affix);

      var _this = _possibleConstructorReturn(this, (Affix.__proto__ || Object.getPrototypeOf(Affix)).call(this, props));

      _this.state = {
        affixTop: true,
        affix: false,
        affixBottom: false
      };
      _this.affix = null;


      _this.updateAffix = _this.updateAffix.bind(_this);
      return _this;
    }

    _createClass(Affix, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('scroll', this.updateAffix);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // If affix needs to be disable, disable it here by resetting state
        if (!nextProps.enable()) {
          this.setState({
            affix: false
          });
        } else {
          this.updateAffix();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('scroll', this.updateAffix);
      }
    }, {
      key: 'updateAffix',
      value: function updateAffix() {
        var offsetTop = this.props.offsetTop();
        var offsetBottom = this.props.offsetBottom();
        var scrollTop = getScrollTop();

        if (offsetBottom === offsetTop || !this.props.enable()) {
          this.setState({
            affix: false,
            affixBottom: false,
            affixTop: false
          });
        } else {
          this.setState({
            affix: scrollTop >= offsetTop && scrollTop <= offsetBottom,
            affixTop: scrollTop < offsetTop,
            affixBottom: scrollTop > offsetBottom
          });
        }
      }
    }, {
      key: 'enableAffix',
      value: function enableAffix() {
        this.setState({
          affix: true
        });
      }
    }, {
      key: 'disableAffix',
      value: function disableAffix() {
        this.setState({
          affix: false
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            className = _props.className,
            children = _props.children,
            rest = _objectWithoutProperties(_props, ['className', 'children']);

        return _react2.default.createElement(
          'div',
          _extends({}, rest, {
            ref: function ref(_ref) {
              _this2.affix = _ref;
            },
            className: getAffixClassNames(this.state, className)
          }),
          children
        );
      }
    }]);

    return Affix;
  }(_react.Component), _class.displayName = '@@react-affix/Affix', _class.propTypes = {
    offsetTop: _react.PropTypes.func,
    offsetBottom: _react.PropTypes.func,
    enable: _react.PropTypes.func
  }, _temp);
  exports.default = Affix;
});