import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import router from '../helpers/Router';

export default class Projectoverview extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    All projects are listed here
                </Text>
                <Button title="rout" onPress={() => {
                    router.goBack(this.props.navigation)
                }}/>
            </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});