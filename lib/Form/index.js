import React, { Component, PropTypes } from 'react';
import {
  View,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import SubmitButton from './SubmitButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardIsShowing: false,
    };

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  }

  componentWillMount() {
    const willShow = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const willHide = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    this.keyboardWillShowListener = Keyboard.addListener(willShow, this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener(willHide, this.keyboardWillHide);
  }
  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }
  keyboardWillShow() {
    this.setState({ keyboardIsShowing: true });
  }
  keyboardWillHide() {
    this.setState({ keyboardIsShowing: false });
  }
  render() {
    const {
      style,
      disableSubmit,
      children,
      showSubmit,
      onSubmit,
      submitText,
      extraHeight,
      minHeight,
      ...others,
    } = this.props;

    const shouldShowSubmitButton = (showSubmit && !this.state.keyboardIsShowing);

    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={[{ flex: 1 }, style]}
          contentContainerStyle={{ minHeight }}
          extraHeight={extraHeight}
          {...others}
        >
          {children}
        </KeyboardAwareScrollView>
        {shouldShowSubmitButton ?
          <SubmitButton
            disabled={disableSubmit}
            title={submitText}
            onPress={onSubmit}
          />
        : null}
      </View>
    );
  }
}

Form.defaultProps = {
  submitText: 'Submit',
  disableSubmit: false,
  showSubmit: true,
  onSubmit: () => {},
};

Form.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  disableSubmit: PropTypes.bool,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  showSubmit: PropTypes.bool,
  extraHeight: PropTypes.number,
  minHeight: PropTypes.number,
};

export default Form;
