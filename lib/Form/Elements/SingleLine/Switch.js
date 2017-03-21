import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Switch,
} from 'react-native';
import constants from '../../../../constants';
import Tooltip from '../Tooltip';
import Text from '../../../../app/themedComponents/Text';
import _ from 'lodash';
const styles = StyleSheet.create({
  base: {
    flex: 1,
    overflow: 'visible',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  propertyText: {
    alignSelf: 'center',
    fontSize: 16,
    marginRight: 8,
  },
  rightStyle: {
    flex: 1,
    maxWidth: 70,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

class SLSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      validationResult: {
        valid: true,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isBoolean(nextProps.value)) { return; }
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    const {
      showTooltip,
      tooltipMessage,
      onValueChange,
      disabled,
      ...others,
    } = this.props;
    let textStyle = { color: 'black' };
    if (!this.state.validationResult.valid) {
      textStyle = { color: constants.style.validationErrorColor };
    }
    if (disabled) {
      textStyle = {
        color: constants.style.disabledTextColor,
        fontStyle: 'italic',
      };
    }
    return (
      <View style={styles.base}>
        <View style={styles.row}>
          <View style={styles.leftStyle}>
            <Text
              type={'heavy'}
              style={[
                textStyle,
                styles.propertyText,
              ]}
            >
              {this.props.text}
            </Text>
            <Tooltip
              show={showTooltip}
              message={tooltipMessage}
            />
          </View>
          <View
            style={styles.rightStyle}
          >
            <Switch
              {...others}
              disabled={disabled}
              onValueChange={(value) => {
                this.setState({
                  value,
                });
                onValueChange(value);
              }}
              value={this.state.value}
            />
          </View>
        </View>
      </View>
    );
  }
}

SLSwitch.defaultProps = {
  validate: () => {
    return {
      valid: true,
      message: 'Property value has to be greater than HK$100,000!',
    };
  },
  onValueChange: () => {},
  validationHeaderStyle: { color: 'red' },
  hideMaxLength: false,
  defaultValue: false,
  showTooltip: false,
  tooltipMessage: 'Hey there, this is a default prop value. Please change it',
  text: '<Missing Property>',
  disabled: false,
};

SLSwitch.propTypes = {
  onValueChange: PropTypes.func,
  text: PropTypes.string,
  tooltipMessage: PropTypes.string,
  showTooltip: PropTypes.bool,
  defaultValue: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SLSwitch;
