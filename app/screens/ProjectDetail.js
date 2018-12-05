import React, {Component} from "react"
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    TouchableHighlight
} from "react-native";

export default class ProjectDetail extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Project"
    });

    render() {
        return (
            <View>
                <Text>
                    "Hallo"
                </Text>
            </View>
        );


    }
}
