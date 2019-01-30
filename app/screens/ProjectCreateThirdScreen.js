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
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform
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

      thumbnailUri: this.props.navigation.getParam("thumbnailUri", ""),
      thumbnailName: this.props.navigation.getParam("thumbnailName", ""),
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", ""),
      location: this.props.navigation.getParam("location", ""),
      beginDate: this.props.navigation.getParam("beginDate", ""),
      endDate: this.props.navigation.getParam("endDate", ""),
      tags: this.props.navigation.getParam("tags", ""),

      totalSize: 0
    };
  }

  goToNextPart() {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectCreateFourthScreen",
      {
        documents: this.state.documents,
        thumbnailUri: this.state.thumbnailUri,
        thumbnailName: this.state.thumbnailName,
        name: this.state.name,
        desc: this.state.desc,
        location: this.state.location,
        beginDate: this.state.beginDate,
        endDate: this.state.endDate,
        tags: this.state.tags
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
          // check if new total size is lower than 100 mb
          if (this.state.totalSize + file.size < 104857600) {
            this.setState({
              documents: [...this.state.documents, file],
              totalSize: this.state.totalSize + file.size
            });
          } else {
            alert("Het totale uploadlimiet voor documenten is 100 mb");
          }
        } catch {
          console.log(error);
        }
      }
    );
  }

  deleteItem(index) {
    let newDocuments = [];
    for (let document of this.state.documents) {
      if (this.state.documents.indexOf(document) != index - 1) {
        console.log("passed");
        newDocuments.push(document);
      }
    }
    this.setState({ documents: newDocuments });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <Toolbar
          centerElement="Project aanmaken 3/3"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <View style={{ height: "80%", width: "100%" }}>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.labelStyle}>BESTANDEN TOEVOEGEN</Text>

            <Icon
              name="file-plus"
              size={120}
              color="#dee5e8"
              style={{ alignSelf: "center" }}
              onPress={() => this.pickDocument()}
            />
            <Text style={styles.textStyle}>
              Voeg een bestand toe aan je project door op bovenstaande knop te
              drukken.
            </Text>

            <View style={styles.documentContainer}>
              <Text style={styles.documentText}>
                {"Toegevoegde documenten: "}
              </Text>
              <FlatList
                data={this.state.documents}
                keyExtractor={(item, index) => item.id}
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
                        this.deleteItem(index);
                      }}
                    />
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "10%"
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.goToNextPart()}
          >
            <Text style={styles.buttonTextStyle}>Maak project</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    width: "100%"
  },
  inputFieldContainer: {
    width: "90%",
    paddingTop: "5%",
    paddingBottom: "5%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center"
  },
  textStyle: {
    fontSize: 14,
    color: "#a8a8a8",
    fontWeight: "100",
    textAlign: "center"
  },
  labelStyle: {
    paddingBottom: "2%",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#a8a8a8",
    borderBottomWidth: 1,
    borderBottomColor: "#4a6572"
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
  documentText: {
    fontSize: 18,
    marginTop: "5%",
    marginBottom: "2%",
    fontWeight: "bold",
    color: "#a8a8a8"
  },
  documentContainer: {
    height: "50%",
    width: "90%",
    paddingTop: "2%",
    alignSelf: "center"
  },
  documentName: {
    color: "#4a6572",
    fontWeight: "200",
    width: "60%",
    fontSize: 18
  },
  documentSize: {
    color: "#4a6572",
    fontWeight: "200",
    width: "30%",
    fontSize: 18
  }
});

export default ProjectCreateThirdScreen;
