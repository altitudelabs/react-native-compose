import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Dimensions,
  PanResponder,
  View,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ThemedText from '../../../app/themedComponents/Text';
import Constants from '../../../constants';

// const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderContainer: {
    flex: 1,
  },
  leftText: {
  },
  rightText: {
    textAlign: 'right',
  },
});

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: this.props.range,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      sliderValue: value,
    });
    this.props.onChange(value);
  }

  render() {
    const {
      showHeader,
      style,
      length,
      titleStyle,
      valueStyle,
      trackedStyle,
      untrackedStyle,
      title,
      value,
      min,
      max,
      ...others,
    } = this.props;

    return (
      <View style={[styles.base, style]}>
        {showHeader ?
          <View style={styles.textContainer}>
            <ThemedText
              type={'heavy'}
              style={[styles.leftText, titleStyle]}
            >
              {title}
            </ThemedText>
            <ThemedText
              style={[styles.rightText, valueStyle]}
            >
              {value}
            </ThemedText>
          </View>
        : null}
        <View style={styles.sliderContainer}>
          <MultiSlider
            {...others}
            min={min}
            max={max}
            containerStyle={{
              height: null,
              minHeight: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            selectedStyle={[{
              backgroundColor: '#C79162',
            }, trackedStyle]}
            trackStyle={[{
              marginTop: - 3.5, // Half of track style.height
              height: 7,
              backgroundColor: '#D3D3D3',
              borderRadius: 5,
              overflow: 'hidden',
            }, untrackedStyle]}
            markerStyle={{
              height: 30,
              width: 30,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              backgroundColor: '#FFFFFF',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 1,
              shadowOpacity: 0.2,
            }}
            pressedMarkerStyle={{
              height: 30,
              width: 30,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              backgroundColor: '#FFFFFF',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 1,
              shadowOpacity: 0.2,
            }}
            values={this.props.range}
            sliderLength={length}
            {...others}
          />
        </View>
      </View>
    );
  }
}

RangeSlider.defaultProps = {
  showHeader: true,
  onChange: () => {},
  range: [],
  length: phoneWidth - 50,
  titleStyle: {},
  valueStyle: {},
  title: 'Title',
  value: 'Value',
  min: 0,
  max: 100,
  trackedStyle: {},
  untrackedStyle: {},
};

RangeSlider.propTypes = {
  showHeader: PropTypes.bool,
  onChange: PropTypes.func,
  range: PropTypes.arrayOf(PropTypes.number),
  length: PropTypes.number,
  style: View.propTypes.style,
  titleStyle: View.propTypes.style,
  valueStyle: View.propTypes.style,
  trackedStyle: View.propTypes.style,
  untrackedStyle: View.propTypes.style,
  title: PropTypes.string,
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

const getSliderMax = (maxValue, increment) => {
  return Math.floor(maxValue / increment);
};

export default RangeSlider;
export {
  getSliderMax,
};
