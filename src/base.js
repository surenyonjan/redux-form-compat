// @flow
import React from 'react';
import { get, set } from 'lodash';

import type { Config } from 'redux-form/lib/createReduxForm';

type FieldPropStyle =
| 'v5' // active, autoFill, autoFilled?, checked?, dirty, error?, initialValue, etc.
| 'v6' // input, meta
| 'v5v6'; // all of the above

export type CompatConfig = Config & {
    fields: {},
    fieldPropStyle?: FieldPropStyle,
  };

// From https://github.com/erikras/redux-form/blob/v5.3.6/src/isChecked.js
const isChecked = value => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'true') {
      return true;
    }
    if (lower === 'false') {
      return false;
    }
  }
  return undefined;
};

const mapV5FieldProps = ({ input, meta }) => ({
  ...input,
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
  visited: meta.visited,
  //warning: meta.warning,
});

const mapFieldsProps = (fieldPropStyle, fieldNames, props) => {
  const fields = {};
  fieldNames.forEach(n => {
    const fprops = get(props, n, { input: {} });
    const v5props = fieldPropStyle.startsWith('v5')
      ? mapV5FieldProps(fprops)
      : undefined;
    const v6props = fieldPropStyle.endsWith('v6') ? fprops : undefined;
    set(fields, n, { ...v5props, ...v6props });
  });
  return fields;
};

const mapFormProps = props => ({
  // New prop names should be reasonably safe to pass though...
  ...props,
  // Old prop names for compatibility:
  destroyForm: props.destroy,
  initializeForm: props.initialize,
  resetForm: props.reset,
});

export const FormWrapper = ({
  extraProps,
  fieldNames,
  fieldPropStyle,
  WrappedComponent,
  ...fieldsProps
  }) => {
  const fields = mapFieldsProps(fieldPropStyle, fieldNames, fieldsProps);
  const formProps = mapFormProps(extraProps);
  return <WrappedComponent {...formProps} fields={fields} />;
};

// Default config options to more closely match v5.
export const defaultBaseConfig: Config = {
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  fieldPropStyle: 'v5',
};
