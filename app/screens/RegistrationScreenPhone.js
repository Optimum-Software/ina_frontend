import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button} from 'react-native-elements'
import Router from '../helpers/Router';
import CodeInput from 'react-native-confirmation-code-input';

export default class RegistrationScreenPhone extends Component {
    constructor() {
        super();
        this.state = {
            registerInfo: {},
            phoneNumber: '',
            phoneNumberError: '',
        }
    }

    componentDidMount() {
        this.setState({registerInfo: this.props.navigation.state.params});
    }

    verifyPhone() {
        if(this.checkInputEmpty() && this.checkInputType() && this.checkInputLength()) {
            alert("code gestuurd naar")
        }
    }

    verifyCode(isValid) {
      if(isValid) {
        this.refs.codeInput.clear();
      } else {
        this.setState({codeError: 'Deze code is niet correct'})
      }
    }

    checkInputEmpty() {
        msg = "Vul alstublieft het veld in"
        returnBool = true
        if(this.state.phoneNumber == '') { this.setState({phoneNumberError: msg}); returnBool = false}
        return returnBool
    }

    checkInputType() {
        msg = "Vul alstublieft alleen nummers in"
        if(!/^\d+$/.test(this.state.phoneNumber)) {this.setState({phoneNumberError: msg}); returnBool = false}
        return returnBool
    }

    checkInputLength() {
        msg = "Vul alstublieft een volledig telefoonnummer in"
        if(this.state.phoneNumber.length < 10) {this.setState({phoneNumberError: msg}); returnBool = false}
        return returnBool
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{ height: Header.HEIGHT }}>
                <Toolbar    leftElement={"chevron-left"}
                            onLeftElementPress={() =>
                                Router.goBack(this.props.navigation)
                            }
                            centerElement="Registreren"/>
            </View>
            <View style={styles.container}>
                <View style={styles.infoField}>
                    <Text style={styles.infoText}>
                        We willen je mobiel nummer om die te verkopen voor alle monnies
                    </Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Input
                        placeholder='Mobiel nummer'
                        containerStyle={styles.inputContainer}
                        value={this.state.phoneNumber}
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                        errorStyle={styles.errorStyle}
                        errorMessage={this.state.phoneNumberError}
                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                        onSubmitEditing={() => this.verifyPhone()}
                        keyboardType='phone-pad'
                        maxLength={10}
                    />
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        title="Verificeer telefoonnummer"
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.buttonContainer}
                        onPress={() => this.verifyPhone()}
                    />
                </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6be1ff",
        height: '100%'
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },

    inputContainer: {
        width: '75%',
        alignSelf: 'center',
    },
    inputFieldContainer: {
        marginTop: '5%',
        flex: 2,
        flexDirection: 'column',
    },
    actionContainer: {
        flex:2
    },

    infoField: {
        flex:2,
        width: '75%',
        alignSelf: 'center',
        marginTop: '10%',
    },
    infoText: {
        fontSize: 20
    },

    buttonContainer: {
        width: '75%',
        alignSelf: 'center',
        height: '30%',
    },
    buttonStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },

    errorStyle: {
        color: 'red',
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '2%',
        fontSize: 15
    },
});
