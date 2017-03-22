import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import BaseElement from './BaseElement';
import ModalPicker from './ModalPicker';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  allTextContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrowContainer: {
    flex: 1,
  },
});

class Picker extends BaseElement {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selectedValue,
      open: false,
      errorMessage: null,
    };
    this.getRequiredArrow = this.getRequiredArrow.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  onValueChange(value) {
    this._validate(value).catch(err => {
      console.log(err);
    });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  validate() {
    return this._validate(this.state.value);
  }

  onModalShow() {
    if (this.props.onModalShow) {
      this.props.onModalShow();
    }
  }

  onModalHide() {
    if (this.props.onModalHide) {
      this.props.onModalHide();
    }
  }

  clearSelection() {
    this.onValueChange(null);
  }

  getRequiredArrow() {
    if (this.props.arrowDirection === 'right') {
      return require('../../../assets/images/pickerRightArrow.png');
    }
    return require('../../../assets/images/pickerDownArrow.png');
  }

  getSelectedItem() {
    const { options, selectedValue, valueKey } = this.props;
    const selectedItem = _.find(options, x => `${x[valueKey]}` === `${selectedValue}`);
    return selectedItem || this.getDefaultSelectedItem();
  }

  getDefaultSelectedItem() {
    return { value: null, label: 'Missing data', subtext: null };
  }

  renderActions() {
    const { selectedValue, required } = this.props;
    if (selectedValue && !required) {
      return (<View style={{}}>
        <TouchableOpacity
          onPress={this.clearSelection}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>);
    }

    return null;
  }

  render() {
    const {
      style,
      options,
      selectedValue,
      labelTextStyle,
      subtextTextStyle,
      required,
      ...others,
    } = this.props;

    const selectedItem = this.getSelectedItem();
    console.log('selectedItem', selectedItem.label);
    return (
      <View style={[styles.container, style]} {...others}>
        <TouchableOpacity
          style={styles.base}
          onPress={() => {
            this.setState({
              open: true,
            }, () => {
              this.onModalShow();
            });
          }}
        >
          <View
            style={styles.allTextContainer}
          >
            <Text
              type={'heavy'}
              style={[{
              }, labelTextStyle]}
              ellipsizeMode={'tail'}
            >
              {selectedItem.label}
            </Text>
            {selectedItem.subtext ?
              <Text
                style={[{
                  fontSize: 12,
                }, subtextTextStyle]}
                ellipsizeMode={'tail'}
                numberOfLines={1}
              >
               {selectedItem.subtext}
              </Text>
              :
              null
            }
          </View>
          <View
            style={styles.imageContainer}
          >
            <Image
              source={this.getRequiredArrow()}
            />
          </View>
        </TouchableOpacity>
        {this.renderActions()}
        <ModalPicker
          onTouchOut={() => {
            this.setState({
              open: false,
            }, () => {
              this.onModalHide();
            });
          }}
          open={this.state.open}
          selectedValue={selectedValue}
          onValueChange={this.onValueChange}
          options={options}
          required={required}
        />
      </View>
    );
  }
}

Picker.defaultProps = {
  arrowDirection: 'right',
  options: [],
  valueKey: 'value',
  labelKey: 'label',
  sublabelKey: 'subtext',
  required: false,
};

Picker.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.any,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  sublabelKey: PropTypes.string,
  arrowDirection: PropTypes.oneOf(['right', 'down']),
  style: View.propTypes.style,
  labelTextStyle: Text.propTypes.style,
  subtextTextStyle: Text.propTypes.style,
  required: PropTypes.bool,
  onValueChange: PropTypes.func,
  onModalHide: PropTypes.func,
  onModalShow: PropTypes.func,
};

export default Picker;
