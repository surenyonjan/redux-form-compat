// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Fields, reduxForm as reduxForm6 } from 'redux-form/immutable';

import type { ComponentType } from 'react';

import type { Config, CompatConfig } from './base';
import { FormWrapper, defaultBaseConfig } from './base';

const ReduxFormCompat = (config, WrappedComponent) => {
  const c = props => {
    const fieldNames = props.fields || config.fields;
    return (
      <Fields
        names={fieldNames}
        component={FormWrapper}
        props={{
          extraProps: props,
          fieldNames,
          fieldPropStyle: config.fieldPropStyle,
          WrappedComponent,
        }}
        />
    );
  };
  c.displayName = 'ReduxFormCompat';
  return c;
};

export const defaultConfig: Config = defaultBaseConfig;

export const reduxForm = (
  config: CompatConfig,
  mapStateToProps?: mixed => mixed,
  mapDispatchToProps?: mixed => mixed,
  mergeProps?: mixed => mixed,
  options?: mixed
) => (WrappedComponent: ComponentType<*>) => {
  const mconfig = { ...defaultConfig, ...config };
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(
    reduxForm6(mconfig)(ReduxFormCompat(mconfig, WrappedComponent))
  );
};
