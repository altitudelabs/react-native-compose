import { Component, PropTypes } from 'react';

class BaseElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      errorMessage: null,
    };
  }

  onValueChange(value) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  getName() {
    if (typeof this.props.name === 'undefined') {
      throw new Error('Undefined element name');
    }
    return this.props.name;
  }

  setValidationSuccessful(value) {
    return new Promise((resolve) => {
      this.setState({
        errorMessage: null,
        value,
      }, () => {
        resolve();
      });
    });
  }

  setValidationFalied(value, msg, callback) {
    this.setState({
      errorMessage: msg,
      value,
    }, callback);
  }

  getValidator() {
    if (this.props.validator) {
      return this.props.validator;
    }

    return this.defaultValidator();
  }

  _validate(value) {
    const validator = this.getValidator();
    return new Promise((resolve, reject) => {
      if (typeof validator === 'function') {
        const result = validator(value);
        if (result && typeof result.then === 'function') {
          // is a promise
          result.then(() => {
            this.setValidationSuccessful(value).then(resolve, reject);
          }).catch(error => {
            this.setValidationFalied(value, error, () => {
              reject({
                name: this.props.name,
                errorMessage: error,
              });
            });
          });
        } else {
          const error = result;
          if (error) {
            this.setValidationFalied(value, error, () => {
              reject({
                name: this.props.name,
                errorMessage: error,
              });
            });
          } else {
            this.setValidationSuccessful(value).then(resolve, reject);
          }
        }
      } else {
        // probabbly a class or something else
        // it will always be successful
        this.setValidationSuccessful(value).then(resolve, reject);
      }
    });
  }

  validate() {
    return this._validate(this.state.value);
  }

  defaultValidator() {
    return Promise.resolve(true);
  }
}

BaseElement.propTypes = {
  name: PropTypes.string.isRequired,
  validator: PropTypes.object,
  onValueChange: PropTypes.func,
};

export default BaseElement;
