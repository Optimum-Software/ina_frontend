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
    render() {
        return (
          <View style={styles.container}>
            <View style={{ height: Header.HEIGHT }}>
                <Toolbar    leftElement={"chevron-left"}
                            onLeftElementPress={() =>
                                Router.goBack(this.props.navigation)
                            }
                            centerElement="Registreren" />
            </View>
            <View style={styles.infoField}>
                <Text style={styles.infoText}>
                    We willen je mobiel nummer om die te verkopen voor alle monnies
                </Text>
            </View>
            <View style={styles.inputFieldContainer}>
                <Input
                    placeholder='Mobiel nummer'
                    containerStyle={styles.inputContainer}
                    leftIcon={{ type: 'font-awesome', name: 'phone' }}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.state.phoneNumberError}
                    onChangeText={phoneNumber => this.setState({phoneNumber})}
                    onEndEditing={() => console.log(this.state.phoneNumber)}
                />
            </View>
            <View style={styles.actionContainer}>
                <Button
                    title="Verificeer telefoonnummer"
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    onPress={() => console.log("rout to registerscreen 3")}
                />
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
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    infoField: {
        width: '75%',
        alignSelf: 'center'
    },
    infoText: {
        fontSize: 20
    }
});
