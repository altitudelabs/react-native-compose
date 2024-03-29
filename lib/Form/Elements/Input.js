import React, {
  PropTypes,
} from 'react';

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

import BaseElement from './BaseElement';

class Input extends BaseElement {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      errorMessage: null,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.handleClearValue = this.handleClearValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this._validate(nextProps.value);
  }

  validate() {
    return this._validate(this.state.value);
  }

  onChangeText(value) {
    this._validate(value).catch(err => {
      console.log(err);
    });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  handleClearValue() {
    this.onChangeText(null);
  }

  renderActions() {
    if (this.state.value) {
      return (
        <TouchableOpacity onPress={this.handleClearValue}>
          <Text>Clear</Text>
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const {
      style,
      headerText,
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
            <Text
              value={headerTextLabel}
              style={!this.state.errorMessage ?
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
            fontSize: 15,
            borderColor: this.state.errorMessage ? 'red' : '#DEDEDE',
            borderWidth: 1,
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }, this.props.textInputStyle]}
          onChangeText={this.onChangeText}
          value={this.state.value}
        />
      {this.renderActions()}
      {
        !this.state.errorMessage ?
          null
          :
          <Text
            style={this.props.validationMessageStyle}
          >
            {this.state.errorMessage}
          </Text>
      }
      </View>
    );
  }
}

Input.defaultProps = {
  onValueChange: () => {},
  validator: () => { return Promise.resolve(true); },
  validationMessageStyle: {
    color: 'red',
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
  validator: PropTypes.func,
  validationMessage: PropTypes.func,
  onValueChange: PropTypes.func,
};

export default Input;
