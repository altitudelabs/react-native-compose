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
import Tooltip from '../Tooltip';

const styles = StyleSheet.create({
  base: {
    overflow: 'visible',
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
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
  input: {
    marginLeft: 3,
    paddingLeft: 5,
    flex: 3,
    textAlign: 'right',
    color: constants.style.editableNumberTextColor,
    fontSize: 16,
    fontFamily: constants.style.primaryFontFamily,
  },
  validationMessage: {
    marginTop: 8.5,
  },
  validationMessageText: {
    color: constants.style.validationErrorColor,
  },
});

const addCommas = (v) => {
  return v.replace(/./g, (c, i, a) => {
    return i && c !== '.' && ((a.length - i) % 3 === 0) ? `,${c}` : c;
  });
};

const formatNumber = (string) => {
  if (isNaN(string)) {
    return string;
  }

  const stringArray = string.trim().split('.');
  stringArray[0] = addCommas(stringArray[0]);
  return stringArray.join('.');
};

const trimNumber = (val) => {
  return val.split(',').join('');
};

class EditableNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    };
    this.onTooltipPress = this.onTooltipPress.bind(this);
  }

  onTooltipPress(value) {
    this.setState({
      showTooltip: value,
    });
  }

  render() {
    const {
      value,
      onChangeText,
      error,
      showTooltip,
      editable,
      tooltipMessage,
      ...others,
    } = this.props;
    return (
      <View style={styles.base}>
        <View style={styles.container}>
          <View
            style={styles.left}
          >
            <ThemedText
              type={'heavy'}
              style={[
                { color: error ? constants.style.validationErrorColor : 'black' },
                styles.propertyText,
              ]}
            >
              {this.props.text}
            </ThemedText>
            {showTooltip ?
              <Tooltip
                show={this.state.showTooltip}
                message={tooltipMessage}
                onStatusChange={(show) => {
                  this.onTooltipPress(show);
                }}
              />
            : null}
          </View>
          <View
            style={styles.right}
          >
            {editable ?
              <TouchableOpacity onPress={() => this.refs.input && this.refs.input.focus()}>
                <Image
                  style={styles.pen}
                  source={require('../../../../assets/images/edit-pen.png')}
                />
              </TouchableOpacity>
            :
              <Image
                style={[styles.pen, { opacity: 0 }]}
                source={require('../../../../assets/images/edit-pen.png')}
              />
            }
            <ThemedText
              style={{
                flex: 1,
                fontFamily: constants.style.primaryFontFamily,
                fontSize: 16,
              }}
            >
              {'HK$'}
            </ThemedText>
            <TextInput
              {...others}
              ref={'input'}
              underlineColorAndroid={'transparent'}
              editable={editable}
              keyboardType={'numeric'}
              style={[
                styles.input,
                this.props.textInputStyle,
              ]}
              value={formatNumber(value)}
              onChangeText={(changedValue) => {
                onChangeText(trimNumber(changedValue));
              }}
            />
          </View>
        </View>
        {error ?
          <View
            style={styles.validationMessage}
          >
            <ThemedText
              style={styles.validationMessageText}
            >
              {error}
            </ThemedText>
          </View>
        : null}
      </View>
    );
  }
}
EditableNumber.defaultProps = {
  editable: true,
  onChangeText: () => {},
  error: undefined,
  valid: { status: true },
  hideMaxLength: false,
  showTooltip: false,
  tooltipMessage: 'Hey there, this is a default prop value. Please change it',
  text: '<Missing Prop>',
};

EditableNumber.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  valid: PropTypes.object,
  validationMessageStyle: View.propTypes.style,
  validationHeaderStyle: View.propTypes.style,
  hideMaxLength: PropTypes.bool,
  showTooltip: PropTypes.bool,
  tooltipMessage: PropTypes.string,
  text: PropTypes.string,
  textInputStyle: TextInput.propTypes.style,
  error: PropTypes.string,
};

export default EditableNumber;
