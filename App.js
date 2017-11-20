import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Image, Text, View} from 'react-native';


class Getting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name} !</Text>
    )
  }
}
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}


export default class App extends Component {
  render() {
    let pic = {
       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <Blink style={styles.red} text='Blink Text'/>
        <Text style={[styles.bigblue,styles.red]}>Style Big Blue</Text>
        <Getting style={styles.red} name='Aga'/>
        <Getting style={{flex: 1}} name='Sara'/>
        <Image source={pic} style={{width: 193, height: 110}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
       color: 'red',
    },
});

AppRegistry.registerComponent('AwesomeProject2', () => App);
