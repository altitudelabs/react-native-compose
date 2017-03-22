import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { Form, Widget } from 'react-native-compose';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerValue: null
    }
  }

  render() {
    const langOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: 'English',
        value: 'en',
      },
      {
        label: '繁體字',
        value: 'zh-HK',
      },
    ];

    return (
      <View style={styles.container}>
        <Form
          style={{height: 200, justifyContent: 'flex-start'}}
          ref={ref => this.form = ref}
          onSubmit={() => {
            this.form.validate().then(() => {
              Alert.alert(
                '',
                'All validations passed',
                [
                  {
                    text: 'OK',
                    onPress: () => { },
                  },
                ]
              );
            }).catch(result => {
              Alert.alert(
                '',
                JSON.stringify(result),
                [
                  {
                    text: 'OK',
                    onPress: () => {
                    },
                  },
                ]
              );
            });
          }}
      >
        <Widget.Picker
          name='picker'
          options={langOptions.map(x => {
            return {value: x.value, label: x.label};
          })}
          selectedValue={this.state.pickerValue}
          arrowDirection={'down'}
          onValueChange={value => this.setState({pickerValue: value})}
          validator={value => {
            if (value == null || value == '') {
              return 'Picker value is required';
            }

            return null;
          }}
          required
        />
        <Widget.TextInput
          name='text'
          underlineColorAndroid={'transparent'}
          validator={value => {
            if (value == null || value == '') {
              return 'Text is required';
            }

            return null;
          }}
          onValueChange={(value) => {
            console.log('onValueChange');
          }}
          value={'initial text'}
          style={{ flex: 1, height: 36, padding: 2, width: 200 }}
          keyboardType={'default'}
        />
        <Widget.SubmitButton title={'Submit'}/>
      </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});