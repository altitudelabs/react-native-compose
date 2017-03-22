import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ModalPickerListView from './ModalPickerListView';

const AndroidModalPicker = (props) => {
  const {
    onValueChange,
    selectedValue,
    onTouchOut,
    open,
  } = props;

  const options = props.required ?
                    props.options :
                    [{ label: '', value: undefined }].concat(props.options);
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
          flex: 1,
          paddingHorizontal: 30,
          paddingVertical: 40,
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            opacity: 1,
            paddingVertical: 5,
            borderRadius: 5,
            minHeight: 200,
          }}
        >
          {open ?
            <ModalPickerListView
              options={options}
              selectedValue={selectedValue}
              onValueChange={onValueChange}
              onTouchOut={onTouchOut}
            />
          : null}
        </View>
      </View>
    </Modal>
  );
};


AndroidModalPicker.defaultProps = {
  open: false,
  onPress: () => {},
  onTouchOut: () => {},
  onValueChange: () => {},
  onDismissed: () => {},
  options: [
    { label: 'example option 1', value: 'value' },
    { label: 'example option 2', value: 'value' },
  ],
  required: false,
};

AndroidModalPicker.propTypes = {
  onTouchOut: PropTypes.func,
  onPress: PropTypes.func,
  onValueChange: PropTypes.func,
  onDismissed: PropTypes.func,
  style: View.propTypes.style,
  options: PropTypes.array,
  open: PropTypes.bool,
  selectedValue: PropTypes.any,
  required: PropTypes.bool,
};

export default AndroidModalPicker;
