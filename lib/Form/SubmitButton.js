import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import constants from '../../constants';

const DEFAULT_CONFIRM_BUTTON_HEIGHT = 48;

const styles = StyleSheet.create({
  container: {
    height: DEFAULT_CONFIRM_BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    // backgroundColor: Constants.style.secondaryColor,
  },
  inactive: {
    // backgroundColor: Constants.style.buttonDisableColor,
  },
  title: {
    // fontFamily: Constants.style.primaryFontFamily,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const SubmitButton = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.container, props.style, {
        backgroundColor: props.disabled ?
                         constants.style.buttonDisableColor :
                         constants.style.secondaryColor,
      }]}
    >
      <Text style={styles.title}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

SubmitButton.DEFAULT_HEIGHT = DEFAULT_CONFIRM_BUTTON_HEIGHT;

SubmitButton.defaultProps = {
  disabled: false,
};

SubmitButton.propTypes = {
  style: View.propTypes.style,
  onPress: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  constants: PropTypes.object,
};

export default SubmitButton;
