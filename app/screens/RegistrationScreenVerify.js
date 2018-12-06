import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button } from "react-native-elements";
import Router from "../helpers/Router";
import CodeInput from "react-native-confirmation-code-input";
import UserApi from '../helpers/UserApi';

export default class RegistrationScreenStart extends Component {
    constructor() {
      super();
      this.state = {
        registerPhoneInfo: {}
      }
    }

    componentDidMount() {
      this.setState({registerPhoneInfo: this.props.navigation.state.params});
    }

    checkCode(code) {
      this.register()
    }

    register() {
      console.log(this.state)
      UserApi.registerUser( this.state.registerPhoneInfo.registerStartInfo.firstName, 
                            this.state.registerPhoneInfo.registerStartInfo.lastName, 
                            this.state.registerPhoneInfo.registerStartInfo.email,
                            this.state.registerPhoneInfo.registerStartInfo.pw,
                            this.state.registerPhoneInfo.phoneNumber).then(result => console.log(result))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: Header.HEIGHT }}>
                    <Toolbar centerElement="Registreren" />
                </View>
                <CodeInput
                  ref="codeInput"
                  keyboardType="numeric"
                  codeLength={6}
                  size={60}
                  className='border-circle'
                  cellBorderWidth={3}
                  autoFocus={true}
                  activeColor='#212121'
                  codeInputStyle={styles.codeInputStyle}
                  containerStyle={styles.containerStyle}
                  onFulfill={(code) => this.checkCode(code)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      height: '100%',       
    },
    containerStyle: {
      flex: 1,
      marginTop: '50%'
    },
    codeInputStyle: {
      borderColor: '#212121',
      color: '#212121'
    }
});
