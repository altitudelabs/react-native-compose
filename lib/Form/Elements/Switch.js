import React, {
  PropTypes,
} from 'react';

import {
  View,
  Switch,
} from 'react-native';

import HeaderText from './HeaderText';

const ThemedSwitch = (props) => {
  const {
    style,
    headerText,
    ...others,
  } = props;

  return (
    <View
      style={[{
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }, style]}
    >
      {headerText ?
        <HeaderText
          value={headerText}
          style={{
            paddingBottom: 0,
          }}
        />
      : null}
      <Switch
        {...others}
      />
    </View>
  );
};

ThemedSwitch.defaultProps = {
  onValueChange: () => {},
};

ThemedSwitch.propTypes = {
  style: View.propTypes.style,
  headerText: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default ThemedSwitch;
