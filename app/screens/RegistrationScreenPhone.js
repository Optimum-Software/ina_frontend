import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button} from 'react-native-elements'
import Router from '../helpers/Router';

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

    goToRegisterVerify() {
        if(this.checkInputEmpty() && this.checkInputType() && this.checkInputLength()) {
            console.log("routing")
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
                        onSubmitEditing={() => console.log(this.state.phoneNumber)}
                        keyboardType='phone-pad'
                        maxLength={10}
                    />
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        title="Verificeer telefoonnummer"
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.buttonContainer}
                        onPress={() => this.goToRegisterVerify()}
                    />
                </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5FCFF",
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
    errorStyle: {
        color: 'red',
        fontSize: 18
    },
    inputFieldContainer: {
        marginTop: '5%',
        flex: 1,
        flexDirection: 'column',
    },
    actionContainer: {
        flex:1
    },

    infoField: {
        flex:1,
        width: '75%',
        alignSelf: 'center',
        marginTop: '10%'
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
