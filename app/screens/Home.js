import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Router from '../helpers/Router';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            router: Router.getInstance()
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Home
                </Text>
                <Button title="rout" onPress={() => {
                    this.state.router.goTo(this.props.navigation, "Tabs", "Projectoverview")
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