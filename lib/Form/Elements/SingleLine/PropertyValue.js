import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import constants from '../../../../constants';
import ThemedText from '../../../../app/themedComponents/Text';
import Currency from '../../../../app/themedComponents/Currency';
import Tooltip from '../Tooltip';

const styles = StyleSheet.create({
  base: {
    overflow: 'visible',
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyText: {
    fontSize: 16,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pen: {
    marginRight: 10,
  },
  inputContainer: {
    marginLeft: 3,
    paddingLeft: 5,
    flex: 3,
    justifyContent: 'flex-end',
  },
  input: {
    textAlign: 'right',
    color: constants.style.editableNumberTextColor,
    fontSize: 16,
    fontFamily: constants.style.primaryFontFamily,
  },

});

class PropertyValue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      style,
      showTooltip,
      tooltipMessage,
      propertyTextStyle,
      valueTextStyle,
      value,
      currencyPrefix,
      isCurrency,
      currencyPostfix,
      ...others,
    } = this.props;
    return (
      <View style={[styles.base, style]}>
        <View style={styles.row}>
          <View style={styles.left}>
            <ThemedText
              type={'heavy'}
              style={[
                  propertyTextStyle,
                  styles.propertyText,
                ]}
            >
              {this.props.text}
            </ThemedText>
            {showTooltip ?
              <Tooltip
                show={this.state.showTooltip}
                message={tooltipMessage}
                onStatusChange={(value) => {
                  this.onTooltipPress(value)
                }}
              />
              : null}
          </View>
          <View
            style={styles.rightStyle}
          >
            {isCurrency ?
              <Currency
                style={styles.inputContainer}
                textStyle={[styles.input, valueTextStyle]}
                prefix={currencyPrefix}
                postfix={currencyPostfix}
                value={value}
              />
                :
              <ThemedText
                style={[styles.input, valueTextStyle]}
              >
                {value}
              </ThemedText>
            }
          </View>
        </View>
      </View>
    );
  }
}

PropertyValue.defaultProps = {
  hideMaxLength: false,
  defaultValue: false,
  showTooltip: false,
  tooltipMessage: 'Hey there, this is a default prop value. Please change it',
  text: '<Missing Property>',
  value: '<Missing Value>',
  propertyTextStyle: {},
  valueTextStyle: {},
  isCurrency: false,
};

PropertyValue.propTypes = {
  propertyTextStyle: View.propTypes.style,
  valueTextStyle: View.propTypes.style,
  isCurrency: PropTypes.bool,
};

export default PropertyValue;