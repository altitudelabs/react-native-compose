import BaseValidator from './BaseValidator';

export default class RequiredValidator extends BaseValidator {
  getRule() {
    return (value, options = {}) => {
      if (value == null || value == '') {
        const msg = options.message || 'Value is required';
        return msg;
      }

      return null;
    }
  }
}