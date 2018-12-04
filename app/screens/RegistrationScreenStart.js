import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button} from 'react-native-elements'
import Router from '../helpers/Router';

export default class RegistrationScreenStart extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            firstNameError: '',

            lastName: '',
            lastNameError: '',

            email: '',
            emailError: '',

            pw: '',
            pwError: '',

            pwRepeat: '',
            pwRepeatError: '',
        }
        super()
        this.animatedValue = new Animated.Value(0)
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
    }

    goToRegisterPhone() {
        if(this.checkInputEmpty()) {
            Router.goTo(this.props.navigation, 'Register', 'RegisterPhone', this.state)
        }
        
    }

    checkInputEmpty() {
        msg = "Vul het veld alstublieft in"
        returnBool = true
        if(this.state.firstName == '') { this.setState({firstNameError: msg}); returnBool = false}
        if(this.state.lastName == '') { this.setState({lastNameError: msg}); returnBool = false}
        if(this.state.email == '') { this.setState({emailError: msg}); returnBool = false}
        if(this.state.pw == '') { this.setState({pwError: msg}); returnBool = false}
        if(this.state.pwRepeat == '') { this.setState({pwRepeatError: msg}); returnBool = false}
        return returnBool
    }

    render() {
        const textSize = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [18, 32, 18]
        })
        console.log(textSize)
        return (
          <View style={styles.container}>
            <View style={{ height: Header.HEIGHT }}>
                <Toolbar centerElement="Registreren" />
            </View>
            <View style={styles.inputFieldContainer}>
                <Input
                    placeholder='Voornaam'
                    containerStyle={styles.inputContainer}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    errorStyle={{color: 'red',fontSize: textSize,}}
                    errorMessage={this.state.firstNameError}
                    onChangeText={firstName => this.setState({firstName})}
                    onEndEditing={() => console.log(this.state.firstName)}
                />
                <Input
                    placeholder='Achternaam'
                    containerStyle={styles.inputContainer}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.state.lastNameError}
                    onChangeText={lastName => this.setState({lastName})}
                    onEndEditing={() => console.log("end")}
                />
                <Input
                    placeholder='E-mail'
                    containerStyle={styles.inputContainer}
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.state.emailError}
                    onChangeText={email => this.setState({email})}
                    onEndEditing={() => console.log("end")}
                />
                <Input
                    placeholder='Wachtwoord'
                    containerStyle={styles.inputContainer}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.state.pwError}
                    onChangeText={pw => this.setState({pw})}
                    onEndEditing={() => console.log("end")}
                />
                <Input
                    placeholder='Herhaal Wachtwoord'
                    containerStyle={styles.inputContainer}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.state.pwRepeatError}
                    onChangeText={pwRepeat => this.setState({pwRepeat})}
                    onEndEditing={() => console.log("end")}
                />
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
    inputFieldContainer: {
        marginTop: '5%',
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    errorStyle: {
        color: 'red',
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
