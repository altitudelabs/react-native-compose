
import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  TextInput,
  Text,
} from 'react-native';

import HeaderText from './HeaderText';

import constants from '../../../constants';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || null,
      validationResult: {
        valid: true,
      },
    };
  }

  validate() {
    const validationResult = this.props.validate(this.state.value);
    this.setState({ validationResult });
    return validationResult.valid;
  }

  render() {
    const {
      style,
      headerText,
      onChangeText,
      maxLength,
      hideMaxLength,
      ...others,
    } = this.props;

    const availableCharLen = maxLength - (this.state.value ? this.state.value.length : 0);
    let headerTextLabel = headerText;
    if (headerTextLabel && !hideMaxLength) {
      headerTextLabel = maxLength ? `${headerText} (${availableCharLen})` : headerText;
    }

    return (
      <View style={[{ marginTop: 10, marginBottom: 10, backgroundColor: 'transparent' }, style]}>
        {
          headerTextLabel ?
            <HeaderText
              value={headerTextLabel}
              style={this.state.validationResult.valid ?
                null
                :
                this.props.validationHeaderStyle}
            /> :
            null
        }
        <TextInput
          {...others}
          maxLength={maxLength}
          defaultValue={'default!'}
          style={[{
            height: 40,
            color: constants.style.textColor,
            fontSize: 15,
            fontFamily: constants.style.primaryFontFamily,
            borderColor: this.state.validationResult.valid ? '#DEDEDE' : 'red',
            borderWidth: 1,
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }, this.props.textInputStyle]}
          onChangeText={(value) => {
            onChangeText(value);
            this.setState({
              validationResult: this.props.validate(value),
              value,
            });
          }}
          value={this.state.value}
        />
      {
        this.state.validationResult.valid ?
          null
          :
          <Text
            style={this.props.validationMessageStyle}
          >
            {this.state.validationResult.message}
          </Text>
      }
      </View>
    );
  }
}

Input.defaultProps = {
  onChangeText: () => {},
  validate: () => { return { valid: true }; },
  validationMessageStyle: {
    color: 'red',
    fontFamily: constants.style.primaryFontFamily,
  },
  validationHeaderStyle: { color: 'red' },
  hideMaxLength: false,
};

Input.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  hideMaxLength: PropTypes.bool,
  maxLength: PropTypes.number,
  style: View.propTypes.style,
  textInputStyle:  View.propTypes.style,
  validationMessageStyle: PropTypes.object,
  validationHeaderStyle: PropTypes.object,
  headerText: PropTypes.string,
  validate: PropTypes.func,
  validationMessage: PropTypes.func,
  onChangeText: PropTypes.func,
};

export default Input;
