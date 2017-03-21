import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Picker,
  Modal,
  Platform,
} from 'react-native';
import I18n from 'react-native-i18n';
import Text from '../../../app/themedComponents/Text';
import AndroidModalPicker from './ModalPicker.android';

class ModalPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      options,
      onValueChange,
      selectedValue,
      onTouchOut,
      open,
      ...others,
    } = this.props;

    if (Platform.OS === 'ios') {
      return (
        <Modal
          transparent
          animationType={'fade'}
          visible={open}
          onRequestClose={onTouchOut}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={onTouchOut}
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              opacity: 1,
            }}
          >
            <View
              style={{
                backgroundColor: '#FF3A30',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity style={{ padding: 2 }} onPress={onTouchOut}>
                <Text style={{ color: 'white', fontSize: 20 }}>{I18n.t('DONE')}</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={onValueChange}
              {...others}
            >
              {[{ label: '', value: undefined }].concat(options).map((option, i) => (
                <Picker.Item label={option.label} value={option.value} key={i} />
              ))}
            </Picker>
          </View>
        </Modal>
      );
    }

    if (Platform.OS === 'android') {
      return (
        <AndroidModalPicker {...this.props} />
      );
    }

    return <View />;
  }
}


ModalPicker.defaultProps = {
  open: false,
  onPress: () => {},
  onTouchOut: () => {},
  onValueChange: () => {},
  onDismissed: () => {},
  options: [
    { label: 'example option 1', value: 'value' },
    { label: 'example option 2', value: 'value' },
  ],
};

ModalPicker.propTypes = {
  onTouchOut: PropTypes.func,
  onPress: PropTypes.func,
  onValueChange: PropTypes.func,
  onDismissed: PropTypes.func,
  style: View.propTypes.style,
  options: PropTypes.array,
  open: PropTypes.bool,
  selectedValue: PropTypes.any,
};

export default ModalPicker;
