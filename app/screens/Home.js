import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import Router from '../helpers/Router';
import { Button} from 'react-native-elements';


export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: Header.HEIGHT }}>
          <Toolbar centerElement="Home page" />
        </View>
        <View>
          <Text style={styles.title}>Home</Text>
        </View>
        <Button
                    title="Registreer"
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    onPress={() => Router.goTo(this.props.navigation, 'Register', 'RegisterStart', null)}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});
