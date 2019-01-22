"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  FlatList
} from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class ProjectCreateThirdScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],

      thumbnail: this.props.navigation.getParam("thumbnail", ""),
      imgUri: this.props.navigation.getParam("imgUri", ""),
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", ""),
      location: this.props.navigation.getParam("location", ""),
      beginDate: this.props.navigation.getParam("beginDate", ""),
      endDate: this.props.navigation.getParam("endDate", "")
    };
  }

  goToNextPart() {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectCreateFourthScreen",
      {
        documents: this.state.documents,
        thumbnail: this.state.thumbnail,
        imgUri: this.state.imgUri,
        name: this.state.name,
        desc: this.state.desc,
        location: this.state.location,
        beginDate: this.state.beginDate,
        endDate: this.state.endDate
      }
    );
  }

  pickDocument() {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        try {
          let file = {
            uri: res.uri,
            name: res.fileName,
            type: res.type,
            size: res.fileSize
          };
          this.setState({
            documents: [...this.state.documents, file]
          });
        } catch {
          console.log(error);
        }
      }
    );
  }

  deleteItem(data) {
    let allItems = [...this.state.documents];
    let filteredItems = allItems.filter(item => item.index != data.index);
    this.setState({ documents: filteredItems });
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Voeg documenten toe"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <View style={styles.inputFieldContainer}>
          <Icon
            name="file-upload"
            size={120}
            color="#4a6572"
            style={{ alignSelf: "center" }}
            onPress={() => this.pickDocument()}
          />
          <Text style={styles.textStyle}>
            Klik op de knop om bestanden toe te voegen
          </Text>

          <Text style={styles.textStyle}>{"Toegevoegde documenten: "}</Text>
          <View style={styles.documentContainer}>
            <FlatList
              data={this.state.documents}
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: "row" }}>
                  <Text numberOfLines={1} style={styles.documentName}>
                    {++index + " -  " + item.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.documentSize}>
                    {item.size + " kb"}
                  </Text>
                  <Icon
                    name="close-circle"
                    size={24}
                    color="#f44336"
                    onPress={item => {
                      this.deleteItem(item);
                    }}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.goToNextPart()}
        >
          <Text style={styles.buttonTextStyle}>Verder</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  inputFieldContainer: {
    backgroundColor: "red",
    height: "80%",
    flexDirection: "column",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 20,
    color: "#4a6572",
    textAlign: "center"
  },
  buttonTextStyle: {
    padding: "4%",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#00a6ff",
    borderRadius: 25
  },
  documentContainer: {
    height: "45%",
    width: "90%",
    paddingTop: "2%",
    alignSelf: "center"
  },
  documentName: {
    color: "#4a6572",
    width: "60%",
    fontSize: 18
  },
  documentSize: {
    color: "#4a6572",
    width: "30%",
    fontSize: 18
  }
});

export default ProjectCreateThirdScreen;
