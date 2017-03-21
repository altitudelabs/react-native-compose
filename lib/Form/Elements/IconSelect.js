import React, {
  PropTypes,
  Component,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderText from './HeaderText';
import Constants from '../../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  optionContainer: {
    flex: 1,
    height: 66,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 3,
  },
  optionContentContainer: {
    paddingHorizontal: 14,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {

  },
  optionText: {
    marginLeft: 10,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  invalidOption: {
  },

});

class IconSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      validationResult: {
        valid: true,
      }
    }
  }

  renderHeaderText() {
    return this.props.headerText ? (
      <HeaderText
        value={this.props.headerText}
        style={this.state.validationResult.valid ?
          null
          :
          this.props.validationHeaderStyle}
      />) : null
  }

  onOptionPress(option) {
    let selectedOption;
    if (this.state.selectedOption === option) {
      selectedOption = null;
    } else {
      selectedOption = option;
    }

    const validationResult = this.props.validate(selectedOption);
    this.setState({ validationResult, selectedOption })
    this.props.onPress(selectedOption);
  }

  validate() {
    const validationResult = this.props.validate(this.state.selectedOption);
    this.setState({ validationResult });
    return validationResult.valid;
  }

  render() {
    const {
      options,
      mapOptionToLabel,
      mapOptionToIcon,
      style,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
      {(this.renderHeaderText.bind(this))()}
        <View style={styles.contentContainer} >
          {options.map((option, i) => {
            var linearGradientColors;
            var tintColor;
            var textColor;
            if (this.state.selectedOption === option) {
              linearGradientColors = [Constants.style.linearGradientPrimaryStartColor,Constants.style.linearGradientPrimaryEndColor];
              tintColor = 'white';
            } else {
              linearGradientColors = ['transparent', 'transparent'];
              tintColor = '#ACACAC';
            }

            return (
              <TouchableOpacity
                key={i}
                style={[styles.optionContainer, {marginLeft: i > 0 ? 10 : 0}, this.state.validationResult.valid ? null : styles.invalidOption]}
                onPress={() => { (this.onOptionPress.bind(this))(option); }}
              >
              <LinearGradient
                colors={linearGradientColors}
                style={styles.optionContentContainer}>
                <Image
                  style={[styles.optionIcon,{tintColor:tintColor}]}
                  source={mapOptionToIcon(option)}/>
                <Text style={[styles.optionText,{color:tintColor}]}>
                    {mapOptionToLabel(option)}
                </Text>
              </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
        {
          this.state.validationResult.valid ?
            null
            :
            <Text style={[{marginTop: 7},this.props.validationMessageStyle]}>
              {this.state.validationResult.message}
            </Text>
        }
      </View>
    );
  }
}

IconSelect.defaultProps = {
  onPress: () => {},
  options: [],
  mapOptionToIcon: () => { return null; },
  mapOptionToLabel: (option) => { return option; },
  validate: () => { return { valid: true }; },
  validationMessageStyle: {
    color: 'red',
    fontFamily: Constants.style.primaryFontFamily,
    marginTop: 7,
  },
  validationHeaderStyle: { color: 'red' },
};

IconSelect.propTypes = {
  style: View.propTypes.style,
  headerText: PropTypes.string,
  onPress: PropTypes.func,
  options: PropTypes.array,
  mapOptionToIcon: PropTypes.func,
  mapOptionToLabel: PropTypes.func,
};

export default IconSelect;
