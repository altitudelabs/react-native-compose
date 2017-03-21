import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  findNodeHandle,
  View,
} from 'react-native';
import NativeModules from 'NativeModules';
import ThemedText from '../../../app/themedComponents/Text';
import Constants from '../../../constants';

const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  base: {
  },
  imageContainer: {
    marginLeft: 5,
  },
  popupContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 10,
    bottom: 7,
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    width: 15,
    height: 15,
  },
  message: {
    flex: 4,
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: Constants.style.tooltipMessageBackgroundColor,
  },
  dismiss: {
    flex: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.style.tooltipDismissBackgroundColor,
  },
  messageText: {
    color: 'white',
  },
  dismissText: {
    color: 'white',
  },
});

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonX: 0,
      triangleLayout: {
        height: 0,
        width: 0,
      },
    };
    this.onTooltipPress = this.onTooltipPress.bind(this);
  }

  onTooltipPress() {
    if (this.refs.toggleButton && !this.state.open) {
      return this.getPageX((v) => {
        this.setState({
          buttonX: v,
          open: true,
        });
      });
    }
    this.setState({
      open: !this.state.open,
    });
  }

  getPageX(cb) {
    const view = this.refs.toggleButton;
    const handle = findNodeHandle(view);
    NativeModules.UIManager.measure(handle, (x, y, width, height, pageX) => {
      cb(pageX);
    });
  }

  render() {
    const {
      show,
      size,
    } = this.props;
    const {
      buttonX,
    } = this.state;

    const trianglePosition = {
      bottom: 0,
      left: (size / 2) - (15 / 2),
    };
    const popupPosition = {
      left: -buttonX,
    };

    if (!show) { return null; }
    return (
      <View>
        {this.state.open ?
          <View style={{ overflow: 'visible' }}>
            <Image
              source={require('../../../assets/images/tooltipTriangle.png')}
              style={[
                styles.triangle,
                trianglePosition,
              ]}
            />
            <View
              style={[
                styles.popupContainer,
                { width: phoneWidth },
                popupPosition,
              ]}
            >
              <View style={styles.message}>
                <ThemedText style={styles.messageText}>
                  {this.props.message}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.dismiss}
                onPress={this.onTooltipPress}
                activeOpacity={0.9}
              >
                <ThemedText style={styles.dismissText} type={'heavy'}>
                  {'Dismiss'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        : null}

        <TouchableOpacity
          ref={'toggleButton'}
          onLayout={(e) => {
            console.log(e.nativeEvent);
          }}
          onPress={this.onTooltipPress}
          style={{
            width: size,
            height: size,
          }}
        >
          <Image
            source={require('../../../assets/images/tooltipMark.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
Tooltip.defaultProps = {
  message: 'This is an example of a tooltip',
  show: true,
  size: 20,
};

Tooltip.propTypes = {
  message: PropTypes.string,
  style: View.propTypes.style,
  show: PropTypes.bool,
  size: PropTypes.number,
};

export default Tooltip;
