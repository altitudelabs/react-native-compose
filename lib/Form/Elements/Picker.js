import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import constants from '../../../constants';
import ThemedText from '../../../app/themedComponents/Text';

const styles = StyleSheet.create({
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

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getRequiredArrow = this.getRequiredArrow.bind(this);
  }

  getRequiredArrow() {
    if (this.props.arrowDirection === 'right') {
      return require('../../../assets/images/pickerRightArrow.png');
    }
    return require('../../../assets/images/pickerDownArrow.png');
  }

  render() {
    const {
      style,
      title,
      subtext,
      titleTextStyle,
      subtextTextStyle,
      ...others,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.base, style]}
        onPress={() => {
          this.props.onPress();
        }}
        {...others}
      >
        <View
          style={styles.allTextContainer}
        >
          <ThemedText
            type={'heavy'}
            style={[{
            }, titleTextStyle]}
            ellipsizeMode={'tail'}
          >
            {title}
          </ThemedText>
          {subtext.length > 0 ?
            <ThemedText
              style={[{
                color: constants.style.primaryColor,
                fontSize: 12,
              }, subtextTextStyle]}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
             {subtext}
            </ThemedText>
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
    );
  }
}


Picker.defaultProps = {
  arrowDirection: 'right',
  title: 'Missing data',
  subtext: '',
  onPress: () => {},
};

Picker.propTypes = {
  arrowDirection: PropTypes.oneOf(['right', 'down']),
  title: PropTypes.string,
  subtext: PropTypes.string,
  onPress: PropTypes.func,
  style: View.propTypes.style,
  titleTextStyle: Text.propTypes.style,
  subtextTextStyle: Text.propTypes.style,
};

export default Picker;
