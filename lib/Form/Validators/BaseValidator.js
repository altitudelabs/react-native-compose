export default class BaseValidator {
  getRule() {
    return () => {
      console.log('Base validator');
    };
  }
}
