import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button} from 'react-native-elements'
import Router from '../helpers/Router';

export default class RegistrationScreenStart extends Component {
    constructor() {
        super();
        this.state = {
            firstName: 'a',
            firstNameError: '',

            lastName: 'a',
            lastNameError: '',

            email: 'a',
            emailError: '',

            pw: 'a',
            pwError: '',

            pwRepeat: 'a',
            pwRepeatError: '',
        }
    }

    goToRegisterPhone() {
        if(this.checkInputEmpty()) {
            Router.goTo(this.props.navigation, 'Register', 'RegisterPhone', this.state)
        }
        
    }

    checkInputEmpty() {
        msg = "Vul alstublieft het veld in"
        returnBool = true
        if(this.state.firstName == '') { this.setState({firstNameError: msg}); returnBool = false;}
        if(this.state.lastName == '') { this.setState({lastNameError: msg}); returnBool = false}
        if(this.state.email == '') { this.setState({emailError: msg}); returnBool = false}
        if(this.state.pw == '') { this.setState({pwError: msg}); returnBool = false}
        if(this.state.pwRepeat == '') { this.setState({pwRepeatError: msg}); returnBool = false}
        return returnBool
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{ height: Header.HEIGHT }}>
                <Toolbar  leftElement={"chevron-left"}
                          onLeftElementPress={() =>
                            Router.goBack(this.props.navigation)
                          }
                          centerElement="Registreren" />
            </View>
            <View style={styles.inputFieldContainer}>
                <Input
                    ref="f"
                    placeholder='Voornaam'
                    containerStyle={styles.containerStyle}
                    value={this.state.firstName}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={firstName => this.setState({firstName})}
                    onSubmitEditing={() => console.log(this.state.firstName)}
                    shake={true}
                />
                <Text style={styles.errorStyle}>
                    {this.state.firstNameError}
                </Text>
                <Input
                    placeholder='Achternaam'
                    containerStyle={styles.containerStyle}
                    value={this.state.lastName}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={lastName => this.setState({lastName})}
                    onSubmitEditing={() => console.log("end")}
                />
                <Text style={styles.errorStyle}>
                    {this.state.lastNameError}
                </Text>
                <Input
                    placeholder='E-mail'
                    containerStyle={styles.containerStyle}
                    value={this.state.email}
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({email})}
                    onSubmitEditing={() => console.log("end")}
                />
                <Text style={styles.errorStyle}>
                    {this.state.emailError}
                </Text>
                <Input
                    placeholder='Wachtwoord'
                    containerStyle={styles.containerStyle}
                    value={this.state.pw}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={pw => this.setState({pw})}
                    onSubmitEditing={() => console.log("end")}
                    secureTextEntry={true}
                />
                <Text style={styles.errorStyle}>
                    {this.state.pwError}
                </Text>
                <Input
                    placeholder='Herhaal Wachtwoord'
                    containerStyle={styles.containerStyle}
                    value={this.state.pwRepeat}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={pwRepeat => this.setState({pwRepeat})}
                    onSubmitEditing={() => console.log("end")}
                    secureTextEntry={true}
                />
                <Text style={styles.errorStyle}>
                    {this.state.pwRepeatError}
                </Text>
            </View>
            <View style={styles.actionContainer}>
                <Button
                    title="Registreer"
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    onPress={() => this.goToRegisterPhone()}
                />
                <TouchableOpacity 
                    style={styles.textContainer}    
                    onPress={() => Router.goTo(this.props.navigation, 'LoginScreen', 'LoginScreen', {})}
                >
                    <Text style={styles.goToLoginText}>
                        al account? Log dan hier in.
                    </Text>
                </TouchableOpacity>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: '100%'
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    containerStyle: {
        width: '75%',
        alignSelf: 'center',
        backgroundColor: "#FFFFFF",
    },
    inputFieldContainer: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '10%',
    },

    errorStyle: {
        color: 'red',
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },

    actionContainer: {
        flex:1,
        flexDirection: 'column',
        paddingTop: '10%',
        justifyContent: 'space-between'
    },
    

    buttonContainer: {
        width: '75%',
        alignSelf: 'center',
        height: '60%',
    },
    buttonStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },

    textContainer: {
        width: '75%',
        alignSelf: 'center',
    },
    goToLoginText: {
        fontSize: 20
    },
});
