import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import _ from 'lodash';

const screen = Dimensions.get('window');
const DEFAULT_MODAL_WIDTH = screen.width - 60;
const ITEM_HEIGHT = 43;
const ROW_MARGIN = 5;

class ModalPickerListView extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.handleListViewLayout = this.handleListViewLayout.bind(this);
  }

  createOnRowClick(rowData, index) {
    return (() => {
      this.props.onValueChange(rowData.value, index);
      this.props.onTouchOut();
    });
  }

  handleListViewLayout(e) {
    const { height, y } = e.nativeEvent.layout;
    const { options, selectedValue } = this.props;
    // find index of selected value
    const index = _.findIndex(options, item => item.value === selectedValue);
    if (index !== -1) {
      const rowHeight = ITEM_HEIGHT + ROW_MARGIN * 2;
      const offset = (height - rowHeight) / 2;
      const top = y + index * rowHeight - offset;
      this.refs.scrollView.scrollTo({ y: top, animated: false });
    }
  }

  renderOption(rowData, selected) {
    if (typeof rowData.value !== 'undefined') {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={[{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: (selected ? '#009588' : '#777777'),
              alignItems: 'center',
              justifyContent: 'center',
            }]}
          >
            {
              selected ?
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#009588',
                  }}
                />
                : null
            }
          </View>
          <Text style={{ marginLeft: 10 }}>{rowData.label}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 20 }}>CLEAR</Text>
      </View>
    );
  }

  renderRow(rowData, index) {
    const selected = rowData.value === this.props.selectedValue;
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        onPress={this.createOnRowClick(rowData, index)}
        style={[{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginVertical: ROW_MARGIN,
          paddingHorizontal: 30,
          height: ITEM_HEIGHT,
          width: DEFAULT_MODAL_WIDTH,
        }, { backgroundColor: (selected ? '#F5F5F5' : '#FFFFFF') }]}
      >
        {this.renderOption(rowData, selected)}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView
        ref={'scrollView'}
        scrollEnabled
        onLayout={this.handleListViewLayout}
      >
        {this.props.options.map((row, index) => {
          return this.renderRow(row, index);
        })}
      </ScrollView>
    );
  }
}

ModalPickerListView.propTypes = {
  onPress: PropTypes.func,
  onValueChange: PropTypes.func,
  onTouchOut: PropTypes.func,
  options: PropTypes.array,
  selectedValue: PropTypes.any,
};

export default ModalPickerListView;
