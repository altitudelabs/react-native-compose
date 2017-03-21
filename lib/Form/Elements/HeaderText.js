import React, { PropTypes } from 'react';
import {
  Text,
} from 'react-native';

const HeaderText = (props) => {
  const {
    style,
  } = props;
  return (
    <Text
      style={
        Object.assign({
          paddingBottom: 0,
          fontWeight: 'bold',
          fontSize: 16,
        }, style)}
    >
      {props.value}
    </Text>
  );
};
HeaderText.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
};
export default HeaderText;
