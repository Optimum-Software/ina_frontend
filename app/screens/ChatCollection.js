import React, { Component } from "react";
import { TouchableOpacity, Text, View, FlatList, List } from "react-native";
import { ListItem } from "react-native-elements";

import firebaseApi from "../helpers/FirebaseApi";

export default class ChatCollection extends Component {
    constructor() {
        super();
        this.state = {
            chats: [
                {
                    key: 0,
                    title: "Gaauwe",
                    chatUserId: 1
                }
            ]
        };
    }

    componentDidMount() {
        firebaseApi.login("mail@grombouts.nl", "123456");
        firebaseApi.getChats();
    }

    goToChat(uid) {
        console.log(uid);
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.chats}
                    renderItem={({ item, key }) => (
                        <View>
                            <ListItem
                                key={key}
                                title={item.title}
                                chevron
                                onPress={() => this.goToChat(item.title)}
                            />
                        </View>
                    )}
                />
            </View>
        );
    }
}
