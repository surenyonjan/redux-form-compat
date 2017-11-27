'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultBaseConfig = exports.FormWrapper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// From https://github.com/erikras/redux-form/blob/v5.3.6/src/isChecked.js
// all of the above

var isChecked = function isChecked(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    var lower = value.toLowerCase();
    if (lower === 'true') {
      return true;
    }
    if (lower === 'false') {
      return false;
    }
  }
  return undefined;
};

var mapV5FieldProps = function mapV5FieldProps(_ref) {
  var input = _ref.input,
      meta = _ref.meta;
  return _extends({}, input, {
    active: meta.active,
    asyncValidating: meta.asyncValidating,
    autofilled: meta.autofilled,
    // Workaround for https://github.com/erikras/redux-form/issues/2512
    checked: isChecked(input.value),
    dirty: meta.dirty,
    //dispatch: meta.dispatch,
    error: meta.error,
    //form: meta.form,
    initialValue: meta.initial,
    invalid: meta.invalid,
    pristine: meta.pristine,
    //submitFailed: meta.submitFailed,
    //submitting: meta.submitting,
    touched: meta.touched,
    valid: meta.valid,
    visited: meta.visited
    //warning: meta.warning,
  });
};

var mapFieldsProps = function mapFieldsProps(fieldPropStyle, fieldNames, props) {
  var fields = {};
  fieldNames.forEach(function (n) {
    var fprops = (0, _lodash.get)(props, n, { input: {} });
    var v5props = fieldPropStyle.startsWith('v5') ? mapV5FieldProps(fprops) : undefined;
    var v6props = fieldPropStyle.endsWith('v6') ? fprops : undefined;
    (0, _lodash.set)(fields, n, _extends({}, v5props, v6props));
  });
  return fields;
};

var mapFormProps = function mapFormProps(props) {
  return _extends({}, props, {
    // Old prop names for compatibility:
    destroyForm: props.destroy,
    initializeForm: props.initialize,
    resetForm: props.reset
  });
};

var FormWrapper = function FormWrapper(_ref2) {
  var extraProps = _ref2.extraProps,
      fieldNames = _ref2.fieldNames,
      fieldPropStyle = _ref2.fieldPropStyle,
      WrappedComponent = _ref2.WrappedComponent,
      fieldsProps = _objectWithoutProperties(_ref2, ['extraProps', 'fieldNames', 'fieldPropStyle', 'WrappedComponent']);

  var fields = mapFieldsProps(fieldPropStyle, fieldNames, fieldsProps);
  var formProps = mapFormProps(extraProps);
  return _react2.default.createElement(WrappedComponent, _extends({}, formProps, { fields: fields }));
};

// Default config options to more closely match v5.
exports.FormWrapper = FormWrapper;
var defaultBaseConfig = exports.defaultBaseConfig = {
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  fieldPropStyle: 'v5'
};