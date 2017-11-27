'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxForm = exports.defaultConfig = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _immutable = require('redux-form/immutable');

var _base = require('./base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReduxFormCompat = function ReduxFormCompat(config, WrappedComponent) {
  var c = function c(props) {
    var fieldNames = props.fields || config.fields;
    return _react2.default.createElement(_immutable.Fields, {
      names: fieldNames,
      component: _base.FormWrapper,
      props: {
        extraProps: props,
        fieldNames: fieldNames,
        fieldPropStyle: config.fieldPropStyle,
        WrappedComponent: WrappedComponent
      }
    });
  };
  c.displayName = 'ReduxFormCompat';
  return c;
};

var defaultConfig = exports.defaultConfig = _base.defaultBaseConfig;

var reduxForm = exports.reduxForm = function reduxForm(config, mapStateToProps, mapDispatchToProps, mergeProps, options) {
  return function (WrappedComponent) {
    var mconfig = _extends({}, defaultConfig, config);
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps, options)((0, _immutable.reduxForm)(mconfig)(ReduxFormCompat(mconfig, WrappedComponent)));
  };
};