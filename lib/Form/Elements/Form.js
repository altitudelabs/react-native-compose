import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import SubmitButton from './SubmitButton';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onValidating = this.onValidating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValidating() {
    console.log('onValidating');
  }

  onSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  validate() {
    console.log('form validate');
    return new Promise((resolve, reject) => {
      const childrenArray = React.Children.toArray(this.props.children);
      const inputs = _.filter(childrenArray, x => x.props.name);
      const names = inputs.map(x => x.props.name);
      Promise.all(names.map(name => this.refs[name].validate())).then(() => {
        resolve(true);
      }).catch(reject);
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      console.log('child type', child.type);
      if (child.type === SubmitButton) {
        return React.cloneElement(child, {
          ref: child.props.name,
          onPress: () => { this.onSubmit(); },
        });
      }
      return React.cloneElement(child, {
        ref: child.props.name,
      });
    });
  }

  render() {
    const {
      style,
      ...others,
    } = this.props;

    return (
      <View style={[styles.container, style]} {...others}>
        {this.renderChildren()}
      </View>
    );
  }
}


Form.defaultProps = {
  options: [],
};

Form.propTypes = {
  options: PropTypes.array.isRequired,
  style: View.propTypes.style,
  onSubmit: PropTypes.func,
  children: PropTypes.any,
};

export default Form;
