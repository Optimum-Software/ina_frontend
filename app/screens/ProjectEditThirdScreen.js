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
  Platform,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import Api from "../helpers/Api";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";

class ProjectEditThirdScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],

      id: this.props.navigation.getParam("id", ""),
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", ""),
      start_date: this.props.navigation.getParam("start_date", ""),
      end_date: this.props.navigation.getParam("end_date", ""),
      location: this.props.navigation.getParam("location", ""),
      thumbnailUri: this.props.navigation.getParam("thumbnailUri", ""),
      thumbnailName: this.props.navigation.getParam("thumbnailName", ""),
      images: this.props.navigation.getParam("images", ""),
      files: this.props.navigation.getParam("files", ""),
      tags: this.props.navigation.getParam("tags", ""),

      totalSize: 0,
      editing: true
    };
  }

  componentDidMount() {
    // Add images to documents
    console.log(this.state.images);
    console.log(this.state.files);

    try {
      for (let document of this.state.images) {
        let nameWithExtension = document.split("/")[
          document.split("/").length - 1
        ];

        let pathArray = nameWithExtension.split(".");
        let type = pathArray[pathArray.length - 1];
        let file = {
          uri: Api.getFileUrl(document),
          name: nameWithExtension,
          type: type
        };
        console.log(file);
        let list = this.state.documents;
        list.push(file);
        this.setState({ documents: list });

        console.log(this.state.documents);
      }
    } catch (e) {
      console.log(e);
    }
    // Add files to documents
    try {
      for (let document of this.state.files) {
        let nameWithExtension = document.split("/")[
          document.split("/").length - 1
        ];

        let pathArray = nameWithExtension.split(".");
        let type = pathArray[pathArray.length - 1];
        let file = {
          uri: Api.getFileUrl(document),
          name: nameWithExtension,
          type: type
        };
        let list = this.state.documents;
        list.push(file);
        this.setState({ documents: list });

        console.log(this.state.documents);
      }
    } catch (e) {
      console.log(e);
    }
  }

  saveChanges() {
    this.setState({
      editing: true
    });
    User.getUserId().then(id => {
      ProjectApi.editProject(
        this.state.id,
        this.state.name,
        this.state.desc,
        this.state.location,
        this.state.start_date,
        this.state.end_date,
        this.state.thumbnailUri,
        this.state.thumbnailName,
        this.state.documents,
        this.state.tags
      ).then(result => {
        console.log("RESPONSE");
        console.log(result);
        if (result["bool"]) {
          ProjectApi.getProjectById(id, result["id"]).then(result => {
            if (result["bool"]) {
              this.setState({
                editing: false,
                projectEdited: true,
                project: result["project"]
              });
              this.goToProject();
            }
          });
        } else {
          this.setState({
            editing: false,
            projectEdited: false
          });
          alert(result["msg"]);
        }
      });
    });
  }

  goToProject() {
    Router.goTo(this.props.navigation, "ProjectStack", "ProjectDetailScreen", {
      id: this.state.project.id,
      name: this.state.project.name,
      desc: this.state.project.desc,
      start_date: this.state.project.start_date,
      end_date: this.state.project.end_date,
      created_at: this.state.project.created_at,
      like_count: this.state.project.like_count,
      follower_count: this.state.project.follower_count,
      location: this.state.project.location,
      thumbnail: this.state.project.thumbnail,
      creator: this.state.project.creator,
      images: this.state.project.images,
      files: this.state.project.files,
      prevRoute: "ProjectEdit"
    });
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
          centerElement="Project aanpassen"
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
                  <View key={item.id} style={{ flexDirection: "row" }}>
                    <Text numberOfLines={1} style={styles.documentName}>
                      {++index + " -  " + item.name}
                    </Text>

                    <Icon
                      name="close-circle"
                      size={24}
                      color="#f44336"
                      onPress={() => {
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
            onPress={() => this.saveChanges()}
          >
            <Text style={styles.buttonTextStyle}>Opslaan</Text>
          </TouchableOpacity>
        </View>
        {this.state.editing && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
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
    width: "90%",
    fontSize: 18
  },
  documentSize: {
    color: "#4a6572",
    fontWeight: "200",
    width: "30%",
    fontSize: 18
  }
});

export default ProjectEditThirdScreen;
