import React, { Component } from 'react';
import { BackHandler, AppRegistry, StyleSheet,Image, Text, View, TextInput, Button, Alert,FlatList,SectionList, ActivityIndicator, ListView} from 'react-native';


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


async function getSearchResultFromApi() {
    try {
      let response = await fetch('https://api.tomtom.com/search/2/search/zaporowa.json?key=Qz1MbJMrt62cRMZDn5YdwKTSC33rXbV5&typeahead=true&limit=30&lat=51.7772292&lon=19.3861459&radius=2000&language=pl-PL&minFuzzyLevel=2&maxFuzzyLevel=4');
      let responseJson = await response.json();
      return responseJson.results;
    } catch(error) {
      console.error(error);
    }
  }

async function getMoviesFromApi() {
    try {
      let response = await fetch('https://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }


  BackHandler.addEventListener('hardwareBackPress', function() {
     this.goBack();
     return true;
  });
export default class Search extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSearching: true,
      searchingText: '',
    }
  }
  goBack(){
    setState({isLoading:false, isSearching:true, searchingText: ''});
  }
  searchM(text) {
    this.setState({isSearching:false, isLoading: true})
    return fetch('https://api.tomtom.com/search/2/search/'+text+'.json?key=Qz1MbJMrt62cRMZDn5YdwKTSC33rXbV5&typeahead=true&limit=30&lat=51.7772292&lon=19.3861459&radius=10000&language=pl-PL&minFuzzyLevel=2&maxFuzzyLevel=4')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          isSearching: false,
          dataSource: ds.cloneWithRows(responseJson.results),
        }, function() {
          // do somethi ng with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isSearching){
        return (<View style={{flex: 1, paddingTop: 20}}>
        <TextInput style={{height: 40}} placeholder="Type here to search!"
            onChangeText={(text) => this.setState({searchingText:text})}
            onEndEditing={() => this.searchM(this.state.searchingText)}
             />
      </View>);
    } else if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.address.freeformAddress}, {rowData.type}</Text>}
        />
      </View>
    );
  }
}

/**Display list
export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear}</Text>}
        />
      </View>
    );
  }
}
*/
/*
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
         <SectionList
           sections={[
             {title: 'D', data: ['Devin']},
             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
           ]}
           renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
           renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
         />
       </View>
    );
  }
}
*/
/*
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {text: ''};

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello2</Text>
        <TextInput style={{height: 40}} placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})} />
        <Text style={{padding: 10, fontSize:42}}>
          {this.state.text.split(' ').map((word) => '🍕').join(' ') }
        </Text>
        <Button title="Press me" onPress={() => Alert.alert('Dupa 8')} />
       </View>
    );
  }
}
*/
/*
export default class App extends Component {
  render() {
    let pic = {
       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
     }
    return (

        <View style={{flex: 1,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

          <Blink style={styles.red} text='Blink Text'/>
          <Text style={[styles.bigblue,styles.red]}>Style Big Blue</Text>
          <Getting style={styles.red} name='Aga'/>
          <Getting name='Sara2'/>
          <Image source={pic} style={{width: 193, height: 110}}/>
          <View style={{flex: 1}}>
            <View style={{flex: 2, backgroundColor: 'powderblue'}} />
            <View style={{flex: 2, backgroundColor: 'skyblue'}} />
            <View style={{flex: 2, backgroundColor: 'steelblue'}} />
          </View>
        </View>

    );
  }
}
*/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
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
