 import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Picker,
} from 'react-native';

import HeaderText from './HeaderText';

class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null || this.props.defaultValue,
    };
  }

  render() {
    const props = this.props;
    const {
      headerText,
      style,
      options,
      onValueChange,
      ...others,
    } = props;

    return (
      <View style={style}>
        {
          headerText ?
            <HeaderText
              value={headerText}
            /> :
            null
        }
        <Picker
          {...others}
          selectedValue={this.state.selectedValue}
          onValueChange={(selectedValue) => {
            this.setState({ selectedValue });
            onValueChange(selectedValue);
          }}
          value={this.state.selectedValue}
        >
          {options.map((option, i) => {
            return <Picker.Item key={i} label={option.label} value={option.value} />;
          })}
        </Picker>
      </View>
    );
  }
}


CustomPicker.defaultProps = {
  headerText: '',
  placeholder: '',
  mapOptionToLabel: (option => option),
  onChange: () => {},
  validate: () => { return { valid: true }; },
  options: [
    { label: 'example option 1', value: 'value' },
    { label: 'example option 2', value: 'value' },
  ],
};

CustomPicker.propTypes = {
  defaultValue: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.Date,
  ]),
  type: PropTypes.string,
  style: View.propTypes.style,
  containerStyle: PropTypes.object,
  headerText: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  mapOptionToLabel: PropTypes.func,
  options: PropTypes.array,
};

export default CustomPicker;
